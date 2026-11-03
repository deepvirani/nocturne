import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin-dashboard";
import { isAdmin } from "@/lib/admin-auth";
import { readOrders } from "@/lib/orders";
import { readProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const instant = false;

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [products, orders] = await Promise.all([readProducts(), readOrders()]);

  return <AdminDashboard products={products} orders={orders} />;
}
