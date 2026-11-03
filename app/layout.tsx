import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Nocturne — Objects of Quiet Luxury",
    template: "%s | Maison Nocturne",
  },
  description:
    "Maison Nocturne creates considered objects in small batches — watches, leather, fragrance, and jewellery made to be kept for decades, not seasons.",
  keywords: [
    "luxury",
    "watches",
    "leather goods",
    "fragrance",
    "jewellery",
    "quiet luxury",
  ],
  openGraph: {
    title: "Maison Nocturne — Objects of Quiet Luxury",
    description:
      "Considered objects in small batches. Watches, leather, fragrance, and jewellery made to be kept.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone">{children}</body>
    </html>
  );
}
