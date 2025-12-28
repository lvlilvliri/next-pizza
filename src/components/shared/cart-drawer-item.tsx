import { cn } from "@/lib/utils";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { X } from "lucide-react";
import { useCartStore } from "../../../shared/store/cart";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemoveButton?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  className,
  onClickCountButton,
  imageUrl,
  onClickRemoveButton,
  name,
  price,
  quantity,
  details,
  disabled,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col bg-white p-5 gap-2 relative",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      <div className="flex gap-5">
        <CartItem.Image src={imageUrl} />

        <CartItem.Info name={name} details={details} />
      </div>

      <div className="flex-1">
        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CartItem.Price price={price} />
          </div>

          <CountButton value={quantity} onClick={onClickCountButton} />
        </div>
      </div>

      <X
        className={cn("absolute top-5 right-5 cursor-pointer", className)}
        size={16}
        onClick={onClickRemoveButton}
      />
    </div>
  );
};
