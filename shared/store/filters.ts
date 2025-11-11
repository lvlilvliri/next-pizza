import { useSearchParams } from "next/navigation";
import { create } from "zustand";

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

interface FiltersState {
  pizzaTypes: Set<string>;
  sizes: Set<string>;
  prices: PriceRange;
  selectedValues: Set<string>;

  togglePizzaType: (value: string) => void;
  toggleSize: (value: string) => void;
  setPrice: (name: keyof PriceRange, value: number) => void;
  addSelectedValue: (value: string) => void;
  removeSelectedValue: (value: string) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  pizzaTypes: new Set(),
  sizes: new Set(),
  prices: {},
  selectedValues: new Set(),

  togglePizzaType: (value) =>
    set((state) => {
      const updated = new Set(state.pizzaTypes);
      updated.has(value) ? updated.delete(value) : updated.add(value);
      return { pizzaTypes: updated };
    }),

  toggleSize: (value) =>
    set((state) => {
      const updated = new Set(state.sizes);
      updated.has(value) ? updated.delete(value) : updated.add(value);
      return { sizes: updated };
    }),

  setPrice: (name, value) =>
    set((state) => ({
      prices: { ...state.prices, [name]: value },
    })),

  addSelectedValue: (value) =>
    set((state) => {
      const updated = new Set(state.selectedValues);
      updated.add(value);
      return { selectedValues: updated };
    }),

  removeSelectedValue: (value) =>
    set((state) => {
      const updated = new Set(state.selectedValues);
      updated.delete(value);
      return { selectedValues: updated };
    }),
}));
