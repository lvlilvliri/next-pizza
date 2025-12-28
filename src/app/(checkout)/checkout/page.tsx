"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSideBar, Container, Title } from "@/components/shared";
import { useCart } from "../../../../shared/hooks";
import { useRouter } from "next/navigation";
import {
  CheckoutCart,
  CheckoutDeliveryInfo,
  CheckoutPersonalForm,
} from "@/components/shared/checkout";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/checkout/checkout-form-schema";
import { useEffect } from "react";
import Script from "next/script";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { openPaymentWidget } from "@/lib/pay";
import { useSession } from "next-auth/react";
import { Api } from "../../../../shared/services/api-client";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, items, loading } = useCart();
  const { data: session } = useSession();

  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  const { setValue } = form;

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session?.user) {
      fetchUserInfo();
    }
  }, [session, setValue]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const paymentData = await createOrder(data);

      await openPaymentWidget(paymentData);

      console.log("Order paid successfully");

      toast.success("Order paid successfully!", {
        icon: "✅",
      });
    } catch (error) {
      console.log("Error creating order:", error);
      setSubmitting(false);
      toast.error("Failed to place order. Please try again.", {
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    console.log("totalAmount", totalAmount, "loading", loading);
    if (totalAmount === 0 && !loading) {
      router.push("/");
    }
  }, [totalAmount, loading, router]);

  return (
    <Container className="mt-5">
      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        strategy="afterInteractive"
      />
      <Script
        id="wayforpay-widget"
        src="https://secure.wayforpay.com/server/pay-widget.js"
        strategy="lazyOnload"
      />
      <Title
        text="Placing an order"
        className="font-extrabold mt-10 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-40">
            {/* Left part */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart items={items} loading={loading} />

              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ``}
              />

              <CheckoutDeliveryInfo
                className={loading ? "opacity-40 pointer-events-none" : ``}
              />
            </div>

            {/* Right part */}
            <div className="w-[450px]">
              <CheckoutSideBar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
