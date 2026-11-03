import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import type { Order } from "@/lib/types";

const dataFile = path.join(process.cwd(), "data", "orders.json");

export async function readOrders(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export async function writeOrders(orders: Order[]): Promise<void> {
  const tmpFile = `${dataFile}.tmp`;
  await fs.writeFile(tmpFile, `${JSON.stringify(orders, null, 2)}\n`, "utf8");
  await fs.rename(tmpFile, dataFile);
}
