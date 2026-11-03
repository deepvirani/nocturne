"use client";

import { useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <div
        className={`flex items-center gap-3 border border-gold/30 bg-gold/5 px-4 py-3 ${
          compact ? "text-xs" : "text-sm"
        } text-champagne`}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>You are on the list. Welcome to Nocturne.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <div className="flex w-full items-stretch border border-white/15 bg-white/[0.02] focus-within:border-gold/60">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-bone outline-none placeholder:text-muted/70"
        />
        <button
          type="submit"
          className="shrink-0 bg-gold px-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-champagne"
        >
          Join
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
      {!error ? (
        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted/70">
          Occasional letters. No noise.
        </p>
      ) : null}
    </form>
  );
}
