"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction } from "@/lib/admin-actions";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="w-full max-w-sm">
      <p className="eyebrow">Atelier access</p>
      <h1 className="mt-4 font-display text-4xl leading-[1.05] text-bone">
        The back of house.
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Sign in to manage the collection, review orders, and keep the house in order.
      </p>

      <div className="mt-8">
        <label className="field-label" htmlFor="password">
          Admin passcode
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="field"
        />
      </div>

      {state.error ? (
        <p className="mt-3 border border-red-400/30 bg-red-400/5 px-3 py-2 text-xs text-red-200">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-gold mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Opening the atelier…" : "Enter the atelier"}
      </button>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-bone"
        >
          ← Return to store
        </Link>
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted/60">
          Demo passcode: <span className="text-gold/80">atelier</span>
        </span>
      </div>
    </form>
  );
}
