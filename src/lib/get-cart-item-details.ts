import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../../shared/constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
    pizzaType: PizzaType,
    pizzaSize: PizzaSize,
    ingredients: CartStateItem['ingredients']
) => {
    const details = [];
    
      if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize} см`);
      }
    
      if (ingredients) {
        details.push(...ingredients.map((item) => item.name));
      }

      return details.join(", ");
}