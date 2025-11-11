
import { CartDTO } from "../../shared/services/dto/cart.dto";
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  price: number;
  disabled?: boolean
  imageUrl: string;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ price: number; name: string }>;
};



interface ReturnProps {
    items: CartStateItem[],
    totalAmount: number
}


export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.productVariant.product.name,
      price: calcCartItemTotalAmount(item),
      disabled: false,
      imageUrl: item.productVariant.product.imageUrl,
      pizzaSize: item.productVariant.size,
      pizzaType: item.productVariant.pizzaType,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    })) as CartStateItem[];


    return {
      items: items,
      totalAmount: data.totalAmount,
    };
    
}