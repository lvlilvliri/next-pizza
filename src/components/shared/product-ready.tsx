import React from "react";
import { ProductGroupList } from "./product-group-list";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";

interface Props {
  className?: string;
  searchParams: Promise<GetSearchParams>;
}

export const ProductReady: React.FC<Props> = async ({
  className,
  searchParams,
}) => {
  const resolvedSearchParams = await searchParams;
  const categories = await findPizzas(resolvedSearchParams);
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-16">
        {categories.map(
          (category) =>
            category.products.length > 0 && (
              <ProductGroupList
                key={category.id}
                title={category.name}
                categoryId={category.id}
                items={category.products}
              />
            ),
        )}
      </div>
    </div>
  );
};
