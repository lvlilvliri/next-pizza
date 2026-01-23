"use client";

import { ShoppingCart, ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "../../../shared/store/cart";

interface Props {
  className?: string;
  showTotalCost?: boolean;
}

export const CartButton: React.FC<Props> = ({
  className,
  showTotalCost = true,
}) => {
  const totalAmount = useCartStore((s) => s.totalAmount);
  const itemAmount = useCartStore((s) => s.items.length);
  const loading = useCartStore((s) => s.loading);

  return (
    <CartDrawer>
      <Button
        className={cn(
          "group ",
          { "w-[105px]": loading },
          className,
          showTotalCost ? "relative" : "rounded-full w-[65px] h-[65px] border-2 border-primary/50 bg-orange-500 fixed bottom-5 right-5 z-40",
        )}
        loading={loading}
        
      >
        {showTotalCost && (
          <>
            <b>{totalAmount}₴</b>

            <span className="h-full w-[1px] bg-white/30 mx-3" />
          </>
        )}
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart
            size={showTotalCost ? 16 : 25}
            className="relative"
            strokeWidth={2}
          />
          {showTotalCost && <b>{itemAmount}</b>}
          {!showTotalCost && <b className={itemAmount === 0 ? "hidden" : "absolute -right-2 -bottom-3 bg-red-500 rounded-full px-3 py-1"}>{itemAmount !== 0 && totalAmount + "₴"}</b>}
        </div>
        <ArrowRight className="w-5  absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};
