"use client";

import { Dialog } from '@/components/ui';
import { DialogContent } from "@/components/ui/dialog"
import React from 'react';
import { cn } from '@/lib/utils';
import { DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import {   ChoosePizzaForm, ChooseProduct, ChooseProductForm } from '../index';
import { ProductWithRelations } from '@/../@types/prisma';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';



interface Props {
  className?: string;
  product: ProductWithRelations;

}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <ChooseProduct product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;