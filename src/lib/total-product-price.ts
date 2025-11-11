import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaType, PizzaSize } from "../../shared/constants/pizza";


/**
 * Function to calculate the total price of the product
 * @param items - list of products
 * @param type - type of pizza
 * @param size - size of pizza
 * @param selectedIngredients - list of selected ingredients
 * @param ingredients - list of ingredients
 * @returns 
 */
export const totalProductPrice = (items: ProductVariant[], type: PizzaType, size: PizzaSize, selectedIngredients: Set<number>, ingredients: Ingredient[]) => {
    const totalIngredientsPrice = ingredients
      .filter((item) => selectedIngredients.has(item.id))
      .reduce((acc, item) => acc + item.price, 0);
    const pizzaPrice = items.find(
      (item) => item.pizzaType == type && item.size == size
    )?.price;
    return totalIngredientsPrice + (pizzaPrice ?? 0);
}