import { cn } from "@/lib/utils";
import React from "react";
import { Title } from ".";
import { Button } from "../ui";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  onClickAddCart: () => void;
  price: number;
  loading?: boolean;
}

export const ChooseProductForm: React.FC<Props> = ({
  loading,
  price,
  className,
  imageUrl,
  name,
  onClickAddCart,
}) => {
  const textDetails = "some description";

  const handleClickAdd = () => {
    onClickAddCart?.();
  };

  return (
    <div className={cn("flex  xl:flex-row flex-col", className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 max-w-[350px] max-h-[350px]"
        />
      </div>
      <div className="xl:w-[490px] w-full bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
          loading={loading}
        >
          Add to cart for {price} $
        </Button>
      </div>
    </div>
  );
};
