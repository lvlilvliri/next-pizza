"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";
import { useMedia } from "react-use";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  const isSmallScreen = useMedia("(max-width: 530px)");

  if (isSmallScreen) {
    return (
      <div
        className={cn(
          "flex justify-between gap-5",
          {
            "opacity-50 pointer-events-none": disabled,
          },
          className,
        )}
      >
        <CartItemDetails.Image src={imageUrl} className="w-fit max-w-[100px] h-fit max-h-[100px]" />
        <div className="flex justify-between gap-5 w-full relative">
          <CartItemDetails.Info name={name} details={details} className=""/>
          <div className="flex items-end ">
            <CartItemDetails.Price price={price} className=" whitespace-nowrap absolute top-[30%] right-5" />
            <CartItemDetails.CountButton
              onClick={onClickCountButton}
              value={quantity}
            />
            
          </div>
          <button type="button" onClick={onClickRemove} className="absolute top-0 right-0">
              <X
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={20}
              />
            </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className,
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price price={price} className="pr-10" />

      <div className="flex items-center gap-5 ">
        <CartItemDetails.CountButton
          onClick={onClickCountButton}
          value={quantity}
        />
        <button type="button" onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
