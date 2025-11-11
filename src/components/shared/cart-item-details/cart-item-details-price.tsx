import { cn } from '@/lib/utils';

interface Props {
  price: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ price, className }) => {
  return <h2 className={cn("font-bold", className)}>{price} ₴</h2>;
};
