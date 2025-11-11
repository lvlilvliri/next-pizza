import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories, FilterTopBar, SortPopup } from "./index";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}
export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex flex-col">
        <div className="flex items-center justify-between">
          <Categories items={categories} />
          <SortPopup />
        </div>
        <div>
          <FilterTopBar />
        </div>
      </Container>
    </div>
  );
};
