import React from "react";
import { useCartStore } from "../store/cart";
import { CartStateItem } from "@/lib/get-cart-details";


type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  loading: boolean
  addCartItem: (values: any) => Promise<void>;
  
};



export const useCart = (): ReturnProps => {
    const fetchCartItems = useCartStore((s) => s.fetchCartItems);
    const totalAmount = useCartStore((s) => s.totalAmount);
    const items = useCartStore((s) => s.items);
    const updateItemQuantity = useCartStore((s) => s.updateItemQuantity);
    const removeCartItem = useCartStore((s) => s.removeCartItem);
    const loading = useCartStore((s) => s.loading);
    const addCartItem = useCartStore((s) => s.addCartItem);

     React.useEffect(() => {
        fetchCartItems();
        
      }, [])

    return { addCartItem, totalAmount, items, updateItemQuantity, removeCartItem, loading };
}