export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string; // Ingredients and pizza size/type
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
