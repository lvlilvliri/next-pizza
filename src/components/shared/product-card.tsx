import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
import { useMedia } from "react-use";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients?: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  ingredients,
}) => {
  const isSmall = useMedia("(max-width: 880px)", false);
  const isVerySmall = useMedia("(max-width: 435px)", false);
  return (
    <article
      className={cn(
        "flex flex-col max-h-[425px]  ",

        className,
      )}
    >
      <Link
        href={`/product/${id}`}
        className={cn("flex flex-col h-full", isSmall && "flex-row gap-4")}
      >
        <div
          className={cn(
            "flex justify-center p-6 bg-secondary rounded-lg max-h-[260px]",
            isSmall && "max-w-[150px] w-full p-2",
          )}
        >
          <img
            className={cn("w-[215px] max-h-[215px]")}
            src={imageUrl}
            alt={name}
          />
        </div>
        <div className="flex flex-col w-full h-full">
          <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
          <p className="text-sm text-gray-400 line-clamp-3">
            {ingredients?.map((ing) => ing.name).join(", ")}
          </p>

          <div className="flex justify-between items-center mt-auto pt-4">
            {!isVerySmall && (
              <span className="text-[20px]">
                от <b>{price} ₴</b>
              </span>
            )}

            <Button variant="secondary" className="text-base font-bold">
              {!isVerySmall && <Plus size="20px" className="mr-1" />}

              {isVerySmall ? <span>от {price} ₴</span> : "Add to cart"}
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
};
