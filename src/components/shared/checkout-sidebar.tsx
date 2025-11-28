'use client';

import { Package, Truck, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button, Skeleton } from '../ui';
import { useFormContext } from 'react-hook-form';
import { CheckoutItemDetails } from './checkout-item-details';
import { WhiteBlock } from './white-block';


const DELIVERY_PRICE = 100;

interface Props {
  className?: string;
  totalAmount: number;
  loading?: boolean;
}

export const CheckoutSideBar: React.FC<Props> = ({ className, totalAmount, loading }) => {
  const { formState } = useFormContext();
  const everyPrice = totalAmount + DELIVERY_PRICE;
  
  return (
    <div className={className}>
      <WhiteBlock className="sticky top-4 p-6">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Order total:</span>
          {loading ? (
            <Skeleton className="h-12 w-32" />
          ) : (
            <span className="text-[34px] font-extrabold h-12 ">
              {everyPrice}₴
            </span>
          )}
        </div>

        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package className="mr-2 text-gray-300" size={18} />
              Product price
            </div>
          }
          price={
            loading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              `${String(totalAmount)} ₴`
            )
          }
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck className="mr-2 text-gray-300" size={18} />
              Delivery cost
            </div>
          }
          price={
            loading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              `${String(DELIVERY_PRICE)} ₴`
            )
          }
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
          onClick={() => {
            console.log("react-hook-form errors:", formState?.errors);
          }}
        >
          Proceed to Checkout
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
