import { FormInput } from "@/components/shared/form-components";
import React, { useState } from "react";
import { WhiteBlock } from "../white-block";
import { useSession } from "next-auth/react";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  const { data: session } = useSession();

  return (
    <WhiteBlock title="2. Personal details" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput placeholder="Name" className="text-base" name="firstName" />
        <FormInput
          placeholder="Last name"
          className="text-base"
          name="lastName"
        />
        <FormInput placeholder="E-Mail" className="text-base" name="email" />
        <FormInput
          placeholder="Phone"
          className="text-base"
          name="phone"
          mask="+{38} (000) 000 00 00"
        />
      </div>
    </WhiteBlock>
  );
};
