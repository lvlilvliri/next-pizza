import { Suspense } from "react";
import { Filters } from "./filters";

interface Props {
  className?: string;
}

export const FiltersWrapper: React.FC<Props> = ({ className }) => {
  return (
    <Suspense
      fallback={
        <div className="w-[250px] bg-gray-200 animate-pulse h-96 rounded" />
      }
    >
      <Filters className={className} />
    </Suspense>
  );
};
