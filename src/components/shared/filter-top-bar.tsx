"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useFiltersStore } from "@/../shared/store/filters";
import { useFilterIngredients } from "@/../shared/hooks/use-filter-ingredients";
import { X } from "lucide-react";

interface Props {
  className?: string;
}

export const FilterTopBar: React.FC<Props> = ({ className }) => {
  const {
    prices,
    pizzaTypes,
    sizes,
    selectedValues,
    togglePizzaType,
    toggleSize,
    setPrice,
    removeSelectedValue,
  } = useFiltersStore();

  const filters: { label: string; onRemove: () => void }[] = [];

  const { ingredients } = useFilterIngredients();

  const items = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  // Цена
  if ((prices.priceFrom ?? 0) > 0 || (prices.priceTo ?? 500) < 500) {
    filters.push({
      label: `Price: ${prices.priceFrom} – ${prices.priceTo} uah`,
      onRemove: () => {
        (setPrice("priceFrom", 0), setPrice("priceTo", 500));
      },
    });
  }

  // Типы пиццы
  pizzaTypes.forEach((type) => {
    filters.push({
      label: `Dough: ${type === "1" ? "Thin" : "Traditional"}`,
      onRemove: () => togglePizzaType(type),
    });
  });

  // Размеры
  sizes.forEach((size) => {
    filters.push({
      label: `Size: ${size} cm`,
      onRemove: () => toggleSize(size),
    });
  });

  // Ингредиенты
  selectedValues.forEach((id) => {
    const ingredient = items.find((item) => item.value === id);
    filters.push({
      label: ` ${ingredient?.text || id}`,
      onRemove: () => removeSelectedValue(id),
    });
  });

  return (
    <div className={cn("mt-4 inline-flex items-center gap-1", className)}>
      {filters.length > 0 && (
        <div className="flex gap-2 flex-wrap items-center">
          <span className="font-bold text-ml">Selected filters:</span>
          {filters.map((filter, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 border-gray-100 border-[1px] rounded-full px-3 py-1 bg-gray-50 text-sm"
            >
              <span>{filter.label}</span>
              <X
                size={20}
                onClick={filter.onRemove}
                className="text-red-500 cursor-pointer"
              />
            </div>
          ))}
          <button
            onClick={() => {
              setPrice("priceFrom", 0);
              setPrice("priceTo", 500);
              [...pizzaTypes].forEach((t) => togglePizzaType(t));
              [...sizes].forEach((s) => toggleSize(s));
              [...selectedValues].forEach((id) => removeSelectedValue(id));
            }}
            className="ml-3     text-sm text-primary font-bold flex "
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};
