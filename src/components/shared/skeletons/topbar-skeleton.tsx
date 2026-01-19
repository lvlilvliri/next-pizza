import { Skeleton } from "@/components/ui";
import React from "react";
import { Container } from "../container";

interface Props {
  className?: string;
}

export const TopbarSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={
        "sticky top-0 bg-white py-5 pb-12 shadow-lg shadow-black/5 z-10"
      }
    >
      <Container className="">
        <div className=" flex justify-between">
          <Skeleton className={"w-[500px] h-11 bg-gray-300"} />
          <Skeleton className={"w-40 h-11 bg-gray-300"} />
        </div>
      </Container>
    </div>
  );
};
