'use client';

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSideBar, Container, Title, } from "@/components/shared";
import { useCart } from "../../../../shared/hooks";
import { useRouter } from "next/navigation";
import { CheckoutCart, CheckoutDeliveryInfo, CheckoutPersonalForm } from "@/components/shared/checkout";
import { checkoutFormSchema, CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { useEffect } from "react";
import Script from "next/script";



export default function CheckoutPage() {
  const { totalAmount, items, loading } = useCart();
  
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver:  zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      note: "",
    },
  })
  
 const onSubmit = (data: CheckoutFormValues) => {
  console.log('data');
    console.log(data);
    
  }

  useEffect(() =>  {
     console.log("totalAmount", totalAmount, "loading", loading);
      if (totalAmount === 0 && !loading) {
         router.push("/");
      }
  }, [totalAmount]);
  
  return (
    <Container className="mt-5">
      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        strategy="afterInteractive"
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
              <CheckoutCart items={items} />

              <CheckoutPersonalForm />

              <CheckoutDeliveryInfo />
            </div>

            {/* Right part */}
            <div className="w-[450px]">
              <CheckoutSideBar totalAmount={totalAmount} items={items} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}