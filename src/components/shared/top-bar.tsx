import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { Container } from "./container";
import { Categories, FilterTopBar, SortPopupWrapper } from "./index";
import { findPizzas } from "@/lib";
import { GetSearchParams } from "@/lib/find-pizzas";

interface Props {
  className?: string;
  searchParams: Promise<GetSearchParams>;
}
export const TopBar: React.FC<Props> = async ({ className, searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const categories = await findPizzas(resolvedSearchParams);
  // of course, in real app we would fetch categories separately without products..
  return (
    <section
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className,
      )}
    >
      <Container className="flex flex-col">
        <div className="flex items-center justify-between">
          <Categories
            items={categories.filter(
              (category) => category.products.length > 0,
            )}
          />

          <SortPopupWrapper className="md:block hidden" />
        </div>
        <div>
          <FilterTopBar />
        </div>
      </Container>
    </section>
  );
};
