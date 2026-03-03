"use client";

import * as React from "react";
import ProductForm from "@/components/admin/ProductForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

export default function EditProductPage({ params }: Props) {
  const resolvedParams =
    typeof (React as any).use === "function"
      ? (React as any).use(params)
      : params;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);
  

  // fetch product client-side
  useEffect(() => {
    (async () => {
      const id = Number(resolvedParams.id);
      const res = await fetch(`/api/admin/products/${resolvedParams.id}`);
      if (res.ok) {
        const { product } = await res.json();
        setInitialData(product);
      }
      
      setLoaded(true);
    })();
  }, []);

  

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch(`/api/admin/products/${resolvedParams.id}`, {
        method: "PUT",
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

  if (!loaded) {
    return <p>Loading…</p>;
  }

  if (!initialData) {
    return <p>Product not found</p>;
  }

  const isPizza = initialData?.categoryId === 1;
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit product</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <ProductForm onSubmit={handleSubmit} initialData={initialData} isPizza={isPizza} />
    </div>
  );
}
