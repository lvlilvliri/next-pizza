"use client";

import {ProductForm} from "@/components/admin/ProductForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to save");
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create product</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ProductForm onSubmit={handleSubmit} isPizza={false} />
    </div>
  );
}
