import {
  Container,
  Title,
  TopBar,
  FiltersWrapper,
  Stories,
  ProductReady,
  TopbarSkeleton,
  ProductsGroupListSkeleton,
  SortPopupWrapper,
} from "@/components/shared";
import {} from "@/components/shared/skeletons/topbar-skeleton";
import { GetSearchParams } from "@/lib/find-pizzas";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  return (
    <>
      <Container className="mt-10">
        <Title text="All products" size="lg" className="font-extrabold" />
      </Container>

      <Suspense fallback={<TopbarSkeleton />}>
        <TopBar searchParams={searchParams} />
      </Suspense>

      <Stories />
      <Container className="pb-14 mt-10">
        <div className="md:flex gap-[60px]">
          {/* filtration */}
          <div className="md:w-[250px] md:block flex justify-between w-full md:mb-0 mb-8">
            <FiltersWrapper />
            <SortPopupWrapper className="block md:hidden" />
          </div>
          <Suspense fallback={<ProductsGroupListSkeleton />}>
            <ProductReady searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
