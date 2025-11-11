import { ProductVariant } from "@prisma/client";
import { PizzaType, pizzaSizes } from "../../shared/constants/pizza";
import { Variant } from "@/components/shared/product-selector";


/**
 * Function to get available pizza sizes
 * @param items - pizza list
 * @param type - type of pizza(thin/thick etc.)
 * @returns  disabled and not disabled sizes
 */
export const getAvailablePizzaSizes = (items: ProductVariant[], type: PizzaType  ): Variant[] => {
    const filteredPizzasByType = items.filter((item) => item.pizzaType == type);
      return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.find(
          (pizza) => Number(pizza.size) == Number(item.value)
        ),
}));
}