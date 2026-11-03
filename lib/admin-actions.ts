"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");

  if (password !== (process.env.ADMIN_PASSWORD ?? "atelier")) {
    return { error: "That password is not recognised." };
  }

  (await cookies()).set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
