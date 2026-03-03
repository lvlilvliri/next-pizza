"use client";

import { useState, useEffect, FormEvent } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Input } from "../ui";
import Link from "next/link";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  isPizza: boolean;
}

export function ProductForm({ initialData, onSubmit, isPizza }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  // keep prices as strings since they are bound to text inputs
  const [price, setPrice] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [uploading, setUploading] = useState(false);

  // helper to update one price element
  const handlePriceChange = (index: number, value: string) => {
    const arr = [...price];
    arr[index] = value;
    setPrice(arr);
  };



  const handleFile = async (file: File) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    if (res.ok && json.url) {
      setImageUrl(json.url);
    }
    setUploading(false);
  };

  // populate prices when editing or when pizza toggle changes
  useEffect(() => {
    if (initialData) {
      let arr = initialData.variants
        .map((v: any) => String(v.price))
        .sort((a: string, b: string) => Number(a) - Number(b));
      if (isPizza) {
        // ensure there are three slots for small/medium/large
        while (arr.length < 3) arr.push("");
      }
      setPrice(arr);
    } else {
      // new product: default values
      setPrice(isPizza ? ["", "", ""] : [""]);
    }
  }, [initialData, isPizza]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        if (!res.ok) return;
        const json = await res.json();
        setCategories(json.categories || []);
      } catch (err) {
        // ignore
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // prepare payload
    const data: any = { name, categoryId, imageUrl };
    if (isPizza) {
      // keep only filled values, convert to numbers and sort ascending
      const nums = price
        .map((p) => Number(p))
        .filter((p) => !isNaN(p))
        .sort((a, b) => a - b);
      data.price = nums;
    } else {
      data.price = Number(price[0] || 0);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block font-medium">Name</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Price</label>
        {!isPizza && (
          <Input
            type="number"
            value={price[0] || ""}
            onChange={(e) => handlePriceChange(0, e.target.value)}
            className="w-full border px-2 py-1"
            step="0.01"
            required
          />
        )}
        {isPizza && (
          <div className="flex gap-3 mt-2">
            {price.map((p, idx) => (
              <div key={idx} className="flex-1">
              <label  className="block font-medium">Size {idx + 1}</label>
              <Input
                key={idx}
                type="number"
                value={p || ""}
                onChange={(e) => handlePriceChange(idx, e.target.value)}
                className="w-full border px-2 py-1"
                step="0.01"
                required
              />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label className="block font-medium">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border px-2 py-1"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Image</label>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="product"
            className="w-32 h-32 object-cover mb-2"
          />
        )}
        <ImageUpload onFileSelected={handleFile} uploading={uploading} />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
        disabled={uploading}
      >
        Save
      </button>
      <Link
        href="/admin/products"
        className="px-4 py-2 bg-red-600 text-white rounded ml-2"
      >
        Cancel
      </Link>
    </form>
  );
}
