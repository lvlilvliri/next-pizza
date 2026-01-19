import { Skeleton } from "@/components/ui";
import React from "react";

interface Props {
  className?: string;
}

export const ProductsGroupListSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex gap-5">
      <div className="">
        <Skeleton className={"max-w-40 h-9 mb-5 bg-gray-300"} />
        <Skeleton className={"w-[280px] h-[280px] mb-5"} />
        <Skeleton className={"mb-3 w-[200px]  h-8 bg-gray-300"} />
        <Skeleton className={"mb-3 w-[280px]  h-12 bg-gray-300"} />
        <div className="flex justify-between">
          <Skeleton className={"mb-3 w-28 h-8 bg-gray-300"} />
          <Skeleton className={"mb-3 w-32 h-8"} />
        </div>
      </div>
      {/*  */}
      <div className="">
        <Skeleton className={"max-w-40 h-9 mb-5 bg-gray-300"} />
        <Skeleton className={"w-[280px] h-[280px] mb-5"} />
        <Skeleton className={"mb-3 w-[200px]  h-8 bg-gray-300"} />
        <Skeleton className={"mb-3 w-[280px]  h-12 bg-gray-300"} />
        <div className="flex justify-between">
          <Skeleton className={"mb-3 w-28 h-8 bg-gray-300"} />
          <Skeleton className={"mb-3 w-32 h-8"} />
        </div>
      </div>
      {/*  */}
      <div className="">
        <Skeleton className={"max-w-40 h-9 mb-5 bg-gray-300"} />
        <Skeleton className={"w-[280px] h-[280px] mb-5"} />
        <Skeleton className={"mb-3 w-[200px]  h-8 bg-gray-300"} />
        <Skeleton className={"mb-3 w-[280px]  h-12 bg-gray-300"} />
        <div className="flex justify-between">
          <Skeleton className={"mb-3 w-28 h-8 bg-gray-300"} />
          <Skeleton className={"mb-3 w-32 h-8"} />
        </div>
      </div>
    </div>
  );
};
