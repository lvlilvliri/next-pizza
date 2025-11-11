"use client";

import React, { use } from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/../shared/store/category";
import { ProductWithRelations } from "../../../@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId?: number;
}

export const ProductGroupList: React.FC<Props> = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  // @ts-expect-error
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId || 0);
    }
  }, [intersection?.isIntersecting, categoryId, title]);
  return (
    <div className={cn("", className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.variants[0].price}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
