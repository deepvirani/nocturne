import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";

import type { Product } from "@/lib/types";

const dataFile = path.join(process.cwd(), "data", "products.json");

export async function readProducts(): Promise<Product[]> {
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as Product[];
}

export async function writeProducts(products: Product[]): Promise<void> {
  const tmpFile = `${dataFile}.tmp`;
  await fs.writeFile(tmpFile, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  await fs.rename(tmpFile, dataFile);
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("max");
  cacheTag("products");

  return readProducts();
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((product) => product.featured);

  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("max");
  cacheTag("products");

  const products = await readProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getRelatedProducts(
  product: Product,
  limit = 3,
): Promise<Product[]> {
  const products = await getProducts();
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const rest = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );

  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  return Array.from(new Set(products.map((product) => product.category))).sort();
}
