"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { JSX } from "react";
import { Button } from "../ui";
import { ArrowUpDown } from "lucide-react";

export type ProductDashBoard = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type OrderDashBoard = {
  id: number;
  totalAmount: number;
  status: string;
  email: string;
  createdAt: string;
};

const handleDelete = async (id: number) => {
  await fetch(`/api/admin/products/${id}`, {
    method: "DELETE",
  });
};

export const columns: ColumnDef<ProductDashBoard>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = row.getValue("price");

      return <div className=" font-medium">UAH {amount.toFixed(2)}</div>;
    },
  },
  {
    id: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      return imageUrl ? (
        <img
          src={imageUrl}
          alt="Product Image"
          className="w-16 h-16 object-cover"
        />
      ) : (
        <span>No image</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-5">
          <Link
            href={`/admin/products/${product.id}`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(product.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];

export const orderColumns: ColumnDef<OrderDashBoard>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amt: number = row.getValue("totalAmount");
      return <div className="font-medium">UAH {amt.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      return <div>{new Date(date).toLocaleString()}</div>;
    },
  },
];
