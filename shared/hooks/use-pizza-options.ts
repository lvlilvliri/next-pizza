import { Variant } from "@/components/shared/product-selector";
import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "@/lib";
import { ProductVariant } from "@prisma/client";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    selectedIngredients: Set<number>;
    addIngredient: (id: number) => void;
    availableSizes: Variant[],
    currentItemId?: number
}


/**
 * This hook is used to manage active type, disabled sizes, selected ingredients also choose availablle size(if user choose type but there is no size for that type, then it will choose first available size)
 * @param items Product Modal
 * @returns 
 */
export const usePizzaOptions = ( items: ProductVariant[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
    const availableSizes = getAvailablePizzaSizes(items, type);

    
    const currentItemId = items.find(
      (item) => item.pizzaType === type && item.size === size
    )?.id;

    useEffect(() => {
          const isDisabledSize = availableSizes?.find(
            (item) => Number(item.value) == size && !item.disabled
          );
          const availableSize = availableSizes?.find((item) => !item.disabled);
    
          if (!isDisabledSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
          }
        }, [type])

    return { currentItemId, size, type, setSize, setType, selectedIngredients, addIngredient, availableSizes };
};


