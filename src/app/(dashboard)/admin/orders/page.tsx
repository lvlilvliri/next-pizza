import { prisma } from "../../../../../prisma/prisma-client";
import OrdersTable from "@/components/admin/ProductsTable"; // generic
import { orderColumns, OrderDashBoard } from "@/components/admin/columns";
import Link from "next/link";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { id: "desc" } });

  const data: OrderDashBoard[] = orders.map((o) => ({
    id: o.id,
    totalAmount: o.totalAmount,
    status: o.status,
    email: o.email,
    createdAt: o.createdAt.toISOString(),
  }));

  if (!orders) {
    return <div>No orders found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        {/* maybe later add filters */}
      </div>
      <OrdersTable data={data} columns={orderColumns} />
    </div>
  );
}
