import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: {
    default: "Atelier Admin",
    template: "%s | Atelier Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink">{children}</div>;
}
