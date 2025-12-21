"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Container, FormInput, Title } from "../";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { formProfileSchema, TFormProfileValues } from "./profile-form-schema";
import { Button } from "@/components/ui";
import { updateUserInfo } from "@/app/actions";

interface Props {
  className?: string;
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ className, data }) => {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormProfileValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("Data updated 📝", {
        icon: "✅",
      });
    } catch (error) {
      return toast.error("Error updating data", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Personal info | #${data.id}`}
        size="md"
        className="font-bold"
      />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full Name" required />

          <FormInput
            type="password"
            name="password"
            label="New password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Sign Out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
