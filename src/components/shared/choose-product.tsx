'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../../shared/store/cart';
import { ProductWithRelations } from '../../../@types/prisma';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProduct: React.FC<Props> = ({ className, product }) => {
     const router = useRouter();
     const addCartItem = useCartStore((s) => s.addCartItem);
     const loading = useCartStore((s) => s.loading);


    const firstItem = product.variants[0];
    const isPizzaForm = Boolean(product.variants[0].pizzaType);

    const onSubmit = async (
      productVariantId?: number,
      ingredients?: number[]
    ) => {
      try {
        const itemdId = productVariantId ?? firstItem.id;

        await addCartItem({ productVariantId: itemdId, ingredients });

        toast.success(`${isPizzaForm ? "Pizza" : "Product"} added to cart`);
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      } catch (error) {
        toast.error("Cant add product to cart, try again later");
        console.error(error);
      }
    };
   
       
  if( isPizzaForm){
    return (
        <ChoosePizzaForm
                          imageUrl={product.imageUrl}
                          name={product.name}
                          ingredients={product.ingredients}
                          items={product.variants}
                          price={product.variants[0].price}
                          onClickAddCart={onSubmit}
                          loading={loading}
                        />
    )
  }
  return (
    <ChooseProductForm
                      imageUrl={product.imageUrl}
                      name={product.name}
                      price={product.variants[0].price}
                      onClickAddCart={onSubmit}
                      loading={loading}
                    />
  )
};
