import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.14)_0%,transparent_68%)]" />
        <div className="absolute inset-0 grain opacity-[0.07]" />
      </div>

      <div className="relative">
        <p className="eyebrow">404 — Not in the house</p>
        <h1 className="mt-5 font-display text-5xl leading-[1.02] text-bone sm:text-7xl">
          This piece has
          <span className="block italic text-champagne">left the atelier.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
          The page you are looking for may have been moved, retired, or never existed.
          The collection, however, is exactly where you left it.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">
            Return home
          </Link>
          <Link href="/shop" className="btn-outline">
            Explore the collection
          </Link>
        </div>
      </div>
    </div>
  );
}
