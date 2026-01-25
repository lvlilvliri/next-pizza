import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  alt: string;
  className?: string;
  size: number;
}

export const PizzaImage: React.FC<Props> = ({
  size,
  imageUrl,
  alt,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full",
        className,
      )}
    >
      <img
        src={imageUrl}
        alt={alt}
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "xl:w-[300px] xl:h-[300px] w-[200px] h-[200px]": size == 20,
            "xl:w-[400px] xl:h-[400px] w-[300px] h-[300px]": size == 30,
            "xl:w-[500px] xl:h-[500px] w-[400px] h-[400px]": size == 40,
          },
        )}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 xl:w-[450px] xl:h-[450px] w-[350px] h-[350px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 xl:w-[370px] xl:h-[370px] w-[270px] h-[270px]" />
    </div>
  );
};
