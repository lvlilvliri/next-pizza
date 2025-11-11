'use client'

import { cn } from "@/lib/utils";
import { Ingredient, ProductVariant } from "@prisma/client";
import React from "react";
import { IngredientList, PizzaImage, Title , ProductSelector} from ".";
import { Button } from "../ui";
import { mapPizzaType, PizzaSize,  PizzaType, pizzaTypes } from "@/../shared/constants/pizza";

import {  totalProductPrice } from "@/lib/index";
import { usePizzaOptions } from "../../../shared/hooks";


interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductVariant[];
  onClickAddCart?: (itemId: number, ingredients: number[]) => void;
  price: number;
  loading?: boolean;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  onClickAddCart,
  items,
  loading,
}) => {
  const {
    size,
    setSize,
    type,
    setType,
    availableSizes,
    selectedIngredients,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);

  const textDetails = `${size} cm , ${mapPizzaType[type]} pizza`;
  const totalPrice = totalProductPrice(
    items,
    type,
    size,
    selectedIngredients,
    ingredients
  );

  const handleClickAdd = () => {
    
    if (currentItemId) {
      onClickAddCart?.(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} alt={name} size={size}></PizzaImage>
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <div className="flex gap-4 flex-col mt-4">
          <ProductSelector
            items={availableSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <ProductSelector
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <Title
            text="Add to taste"
            size="sm"
            className="font-extrabold"
          ></Title>
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientList
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                key={ingredient.id}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
