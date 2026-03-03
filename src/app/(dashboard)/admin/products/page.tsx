import Link from "next/link";
import { prisma } from "../../../../../prisma/prisma-client";
import ProductsTable from "@/components/admin/ProductsTable";
import { columns, ProductDashBoard } from "@/components/admin/columns";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" }, include: { variants: { select: { price: true } } } });

  const data: ProductDashBoard[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.variants[0]?.price || 0
  }));

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          New product
        </Link>
      </div>
      <ProductsTable data={data} columns={columns} />
    </div>
  );
}
