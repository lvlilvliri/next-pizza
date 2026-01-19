import { Suspense } from "react";
import { SortPopup } from "./sort-popup";

interface Props {
  className?: string;
}

export const SortPopupWrapper: React.FC<Props> = ({ className }) => {
  return (
    <Suspense
      fallback={
        <div className="h-[52px] bg-gray-200 animate-pulse rounded-2xl" />
      }
    >
      <SortPopup className={className} />
    </Suspense>
  );
};
