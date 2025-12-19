import React from "react";
import { Form, FormProvider, useForm, useFormContext } from "react-hook-form";
import { formLoginSchema, FormLoginSchemaType } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import { Title, FormInput } from "@/components/shared/";
import { ca } from "zod/v4/locales";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  className?: string;
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ className, onClose }) => {
  const form = useForm<FormLoginSchemaType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormLoginSchemaType) => {
    try {
      const resp = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (!resp?.ok) {
        throw Error();
      }

      onClose?.();
      toast.success("Logged in successfully!", { icon: "✅" });
    } catch (error) {
      console.error("Error [LOGIN-FORM]", error);
      toast.error("An error occurred while logging in. Please try again.", {
        icon: "⚠️",
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Login" size="md" className="font-bold" />
            <p className="text-gray-400">
              Enter your email and password to access your account.
            </p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Password" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
