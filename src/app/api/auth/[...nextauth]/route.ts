import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const findUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          return null;
        }
        if (!findUser.verified) {
          return null;
        }

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // @ts-ignore
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider as string | undefined,
                providerId: account?.providerId as string | undefined,
              },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {
              provider: account?.provider as string | undefined,
              providerId: account?.providerId as string | undefined,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            fullName: user.name || "User #" + user.id,
            email: user.email,
            // Generate a dummy password since it's required, but won't be used, NOT SAFE FOR PRODUCTION
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider as string | undefined,
            providerId: account?.providerAccountId as string | undefined,
          },
        });

        return true;
      } catch (error) {
        console.error("Error [NEXT-AUTH-SIGNIN]", error);
        return false;
      }
    },
    // @ts-ignore
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.role = findUser.role;
        token.fullName = findUser.fullName;
        token.email = findUser.email;
      }
      return token;
    },
    // @ts-ignore
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
