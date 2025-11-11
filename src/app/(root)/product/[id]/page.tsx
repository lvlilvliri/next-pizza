import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma-client";
import {
  ChooseProduct,
  ChooseProductModal,
  Container,
} from "@/components/shared";

export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ChooseProduct product={product} />
    </Container>
  );
}
