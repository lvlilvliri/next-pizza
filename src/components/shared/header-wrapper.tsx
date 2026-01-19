import { Suspense } from "react";
import { Header } from "./header";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCartButton?: boolean;
}

export const HeaderWrapper: React.FC<Props> = ({
  className,
  hasSearch,
  hasCartButton,
}) => {
  return (
    <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse" />}>
      <Header
        className={className}
        hasSearch={hasSearch}
        hasCartButton={hasCartButton}
      />
    </Suspense>
  );
};
