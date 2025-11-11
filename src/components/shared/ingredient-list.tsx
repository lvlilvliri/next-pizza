import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  onClick?: () => void;
  price: number;
  active?: boolean;
}

export const IngredientList: React.FC<Props> = ({ className, imageUrl, name, onClick, price, active }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-1 rounded-md w-32 text-center relative cursor-pointer shadow-sm bg-white transition-colors border-2 border-primary/0",
        { "border-2 border-primary transition-colors duration-500": active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck
          size={20}
          className="absolute top-2 right-2 text-primary"
        />
      )}
      <img src={imageUrl} alt={name} width={110} height={110} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price}</span>
    </div>
  );
};

