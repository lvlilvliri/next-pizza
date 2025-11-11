'use client';

import { ShoppingCart, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '../ui';
import { cn } from '@/lib/utils';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '../../../shared/store/cart';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore((s) => s.totalAmount);
  const itemAmount = useCartStore((s) => s.items.length);
  const loading = useCartStore((s) => s.loading);

  return (
    <CartDrawer>
      <Button className={cn("group relative",{ 'w-[105px]': loading}, className)} loading={loading}>
        <b>{totalAmount}₴</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{itemAmount}</b>
        </div>
        <ArrowRight className="w-5  absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};

