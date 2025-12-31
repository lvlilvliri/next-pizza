export const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "name_asc", label: "Alphabetical" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const DEFAULT_SORT: SortValue = "popular";

export const resolveSortValue = (value?: string | null): SortValue => {
  return (
    SORT_OPTIONS.find((option) => option.value === value)?.value || DEFAULT_SORT
  );
};
