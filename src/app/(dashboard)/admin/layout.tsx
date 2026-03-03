import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/get-user-session";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getUserSession();
  if (!session || session.role !== "ADMIN") {
    // not an admin, redirect to root or not-auth page
    redirect("/");
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin panel</h2>
        <nav className="space-y-2">
          <Link href="/admin/products" className="block hover:underline">
            Products
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
