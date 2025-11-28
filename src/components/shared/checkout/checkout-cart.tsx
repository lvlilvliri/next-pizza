"use client";

import React from 'react';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '..';
import { getCartItemDetails } from '@/lib';
import { CartStateItem } from '@/lib/get-cart-details';
import { PizzaType, PizzaSize } from '../../../../shared/constants/pizza';
import router from 'next/router';
import { useCart } from '../../../../shared/hooks';


interface Props {
  className?: string;
  items: CartStateItem[];
  loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({ className, items, loading }) => {
    const {updateItemQuantity, removeCartItem} = useCart();
   
    const onClickCountButton = (
      id: number,
      quantity: number,
      type: "plus" | "minus"
    ) => {
      const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
    };
  
    const onLastRemove = async (id: number) => {
      if (items.length === 1) {
         router.push("/");
      }
      removeCartItem(id);
    }

    
  
    return (
      <WhiteBlock title="1. Cart">
        <div className="gap-5 flex flex-col">
          {loading &&
            items.length === 0 &&
            [...Array(3)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))}
          {
            items.map((item) => (
              <CheckoutItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize,
                        item.ingredients
                      )
                    : ""
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                key={item.id}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => onLastRemove(item.id)}
                disabled={item.disabled}
              />
            ))}
        </div>
      </WhiteBlock>
    );
};
