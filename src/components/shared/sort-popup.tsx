"use client";

import { cn } from "@/lib/utils";
import { ArrowUpDown, Check } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_SORT, resolveSortValue, SORT_OPTIONS } from "@/lib/sort";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeValue = resolveSortValue(searchParams.get("sortBy"));
  const activeOption =
    SORT_OPTIONS.find((option) => option.value === activeValue) ||
    SORT_OPTIONS[0];

  const onSelectSort = (value: typeof activeValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === DEFAULT_SORT) {
      params.delete("sortBy");
    } else {
      params.set("sortBy", value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
            className
          )}
        >
          <ArrowUpDown size={16} />
          <b>Sort by:</b>
          <b className="text-primary">{activeOption.label}</b>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[220px] p-2">
        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectSort(option.value)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-gray-50",
                option.value === activeOption.value &&
                  "bg-gray-100 text-primary"
              )}
            >
              <span>{option.label}</span>
              {option.value === activeOption.value && <Check size={16} />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
