import "server-only";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "atelier_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "atelier";
}

export function adminToken(): string {
  return createHash("sha256").update(adminPassword()).digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return token === adminToken();
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Error("Not authorised");
  }
}
