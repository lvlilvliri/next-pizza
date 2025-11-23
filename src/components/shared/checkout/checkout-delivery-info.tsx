import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form-components/form-textarea";
import { AddressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";




interface Props {
  className?: string;
}


export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
 
  return (
    <WhiteBlock title="3. Delivery details">
      <div className="flex flex-col ">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
                
              )}
            </>
          )}
        />

        <FormTextarea
          rows={5}
          className="text-base"
          placeholder="Notes"
          name="note"
        />
      </div>
    </WhiteBlock>
  );
};
