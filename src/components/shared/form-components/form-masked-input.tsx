import React, { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  unmask?: boolean;
  lazy?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormMaskedInput = forwardRef<HTMLInputElement, any>(
  ({ lazy, className, mask, unmask = true, ...props }, ref) => {
    return (
      <IMaskInput
        {...props}
        inputRef={ref}
        ref={ref}
        mask={mask}
        lazy={lazy}
        unmask={unmask}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
      />
    );
  }
);

FormMaskedInput.displayName = "MaskedFormInput";
