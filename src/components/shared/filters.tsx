"use client";

import React, { useEffect } from "react";
import { FilterCheckbox, CheckboxFiltersGroup, Title } from "./index";
import { Input, RangeSlider } from "../ui";
import { useDebounce } from "react-use";
import { useFiltersStore } from "@/../shared/store/filters";
import { useFilterIngredients } from "@/../shared/hooks/use-filter-ingredients";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const {
    prices,
    pizzaTypes,
    sizes,
    selectedValues,
    togglePizzaType,
    toggleSize,
    setPrice,
    addSelectedValue,
    removeSelectedValue,
  } = useFiltersStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const isMounted = React.useRef(false);

  const { ingredients, loading } = useFilterIngredients();

  const items = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  useEffect(() => {
    const pizzaTypesParam = searchParams.get("pizzaTypes");
    pizzaTypesParam?.split(",").forEach(togglePizzaType);

    const pizzaSizesParam = searchParams.get("sizes");
    pizzaSizesParam?.split(",").forEach(toggleSize);

    const priceFromParam = Number(searchParams.get("priceFrom"));
    const priceToParam = Number(searchParams.get("priceTo"));

    if (priceFromParam !== 0 || (priceToParam !== 500 && priceToParam !== 0)) {
      setPrice("priceFrom", priceFromParam);
      setPrice("priceTo", priceToParam);
    }

    const selectedValuesParam = searchParams.get("selectedValues");
    selectedValuesParam?.split(",").forEach(addSelectedValue);
  }, []);

  useDebounce(
    () => {
      if (isMounted.current) {
        const sortBy = searchParams.get("sortBy");
        const query = qs.stringify(
          {
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            priceFrom: prices.priceFrom,
            priceTo: prices.priceTo,
            selectedValues: Array.from(selectedValues),
            ...(sortBy ? { sortBy } : {}),
          },
          { arrayFormat: "comma" },
        );

        router.push(`?${query}`, { scroll: false });
      }

      isMounted.current = true;
    },
    100,
    [pizzaTypes, sizes, prices, selectedValues],
  );

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="font-bold mb-5" />

      <CheckboxFiltersGroup
        title="Pizza Types"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={togglePizzaType}
        selectedValues={pizzaTypes}
        items={[
          { text: "Thin", value: "1" },
          { text: "Thick", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Sizes"
        className="mb-5"
        onClickCheckbox={toggleSize}
        name="sizes"
        selectedValues={sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from and to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={500}
            value={String(prices.priceFrom || 0)}
            onChange={(e) => setPrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={500}
            placeholder="500"
            value={String(prices.priceTo || 500)}
            onChange={(e) => setPrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={500}
          step={10}
          value={[prices.priceFrom || 0, prices.priceTo || 500]}
          onValueChange={([priceFrom, priceTo]) => {
            (setPrice("priceFrom", priceFrom), setPrice("priceTo", priceTo));
          }}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={(id) =>
          selectedValues.has(id)
            ? removeSelectedValue(id)
            : addSelectedValue(id)
        }
        selectedValues={selectedValues}
        name="ingredients"
      />
    </div>
  );
};
