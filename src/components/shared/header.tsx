"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AuthModal,
  CartButton,
  ProfileButton,
  SearchInput,
  Container,
} from "./index";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMedia } from "react-use";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCartButton?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCartButton = true,
}) => {
  const isMediumScreen = useMedia("(min-width: 768px)");
  const isSmallScreen = useMedia("(min-width: 640px)");

  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Payment was successful! 🎉";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Email verified successfully! ✅";
    }

    if (toastMessage) {
      router.replace("/");
      toast.success(toastMessage, { duration: 5000 });
    }
  }, []);

  return (
    <header className={cn(" border-b", className)}>
      <Container className="flex items-center justify-between  pt-8 md:pt-8 md:pb-8 pb-4">
        {/* Left part */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                it doesn&apos;t get any tastier
              </p>
            </div>
          </div>
        </Link>

        {/* Middle part */}
        {hasSearch && isMediumScreen && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right part */}
        <div className="flex items-center gap-4">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCartButton && isSmallScreen && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
      {hasSearch && !isMediumScreen && (
        <div className="flex-1 px-5 pb-4">
          <SearchInput />
        </div>
      )}
      {hasCartButton && !isSmallScreen && (
        <div>
          <CartButton showTotalCost={false} />
        </div>
      )}
    </header>
  );
};
