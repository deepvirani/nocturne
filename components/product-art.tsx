import type { ReactNode } from "react";

type ProductArtProps = {
  art: string;
  className?: string;
  tone?: "dark" | "warm";
};

const gold = "currentColor";

function artPaths(art: string): ReactNode {
  switch (art) {
    case "watch":
      return (
        <>
          <rect x="132" y="38" width="56" height="88" rx="14" opacity="0.45" />
          <rect x="132" y="274" width="56" height="88" rx="14" opacity="0.45" />
          <rect x="112" y="108" width="96" height="170" rx="38" />
          <rect x="208" y="180" width="10" height="26" rx="4" opacity="0.7" />
          <circle cx="160" cy="193" r="49" opacity="0.8" />
          <circle cx="160" cy="193" r="40" opacity="0.3" />
          <path d="M160 193V160" />
          <path d="M160 193L186 203" opacity="0.8" />
          <path d="M160 150v7M203 193h-7M160 236v-7M117 193h7" opacity="0.5" />
          <circle cx="160" cy="193" r="3" fill={gold} stroke="none" />
        </>
      );
    case "bag":
      return (
        <>
          <path d="M112 168C112 90 208 90 208 168" opacity="0.7" />
          <path d="M76 168h168l14 144q2 18-16 18H78q-18 0-16-18L76 168Z" />
          <path d="M76 208h168" opacity="0.5" />
          <rect x="148" y="196" width="24" height="20" rx="3" opacity="0.8" />
          <path d="M100 168l4 162M220 168l-4 162" opacity="0.25" />
          <path d="M92 150h136" opacity="0.2" />
        </>
      );
    case "fragrance":
      return (
        <>
          <rect x="132" y="62" width="56" height="46" rx="8" opacity="0.8" />
          <rect x="144" y="108" width="32" height="32" opacity="0.6" />
          <rect x="104" y="140" width="112" height="180" rx="18" />
          <rect x="128" y="196" width="64" height="64" rx="2" opacity="0.5" />
          <path d="M140 214h40M140 226h28M140 238h34" opacity="0.35" />
          <path d="M122 164v130" opacity="0.25" />
          <path d="M160 62V50" opacity="0.5" />
        </>
      );
    case "headphones":
      return (
        <>
          <path d="M76 226C76 118 244 118 244 226" />
          <path d="M94 226C94 136 226 136 226 226" opacity="0.3" />
          <rect x="56" y="216" width="48" height="94" rx="22" />
          <rect x="216" y="216" width="48" height="94" rx="22" />
          <rect x="68" y="232" width="24" height="62" rx="12" opacity="0.45" />
          <rect x="228" y="232" width="24" height="62" rx="12" opacity="0.45" />
          <path d="M104 246h-6M222 246h-6" opacity="0.4" />
        </>
      );
    case "lamp":
      return (
        <>
          <path d="M92 190C104 92 216 92 228 190Z" />
          <path d="M92 190h136" opacity="0.7" />
          <path d="M110 178C120 112 200 112 210 178" opacity="0.3" />
          <path d="M160 190v130" />
          <ellipse cx="160" cy="330" rx="66" ry="12" />
          <ellipse cx="160" cy="326" rx="52" ry="8" opacity="0.25" />
          <circle cx="160" cy="268" r="6" opacity="0.6" />
          <path d="M80 220l-14 10M240 220l14 10M104 250l-10 14M216 250l10 14" opacity="0.2" />
        </>
      );
    case "chair":
      return (
        <>
          <rect x="100" y="62" width="120" height="150" rx="42" />
          <rect x="96" y="74" width="108" height="126" rx="34" opacity="0.3" />
          <rect x="84" y="208" width="152" height="40" rx="20" />
          <path d="M104 248l-12 92M216 248l12 92" />
          <path d="M96 300h128" opacity="0.3" />
          <path d="M120 92v90M200 92v90" opacity="0.2" />
        </>
      );
    case "eyewear":
      return (
        <>
          <rect x="52" y="168" width="92" height="60" rx="22" />
          <rect x="176" y="168" width="92" height="60" rx="22" />
          <path d="M144 188q16-12 32 0" />
          <path d="M52 178L26 168M268 178l26-10" opacity="0.7" />
          <path d="M72 186l30 24" opacity="0.25" />
          <circle cx="144" cy="182" r="2" fill={gold} stroke="none" opacity="0.6" />
          <circle cx="176" cy="182" r="2" fill={gold} stroke="none" opacity="0.6" />
        </>
      );
    case "sneaker":
      return (
        <>
          <path d="M36 316q-8 28 22 32h204q24 0 22-18l-8-18Z" />
          <path d="M52 312v-36q36-32 78-24l66 28 56 16 26 14v20Z" />
          <path d="M52 312q72 20 224 8" opacity="0.4" />
          <path d="M118 268l32 18M132 258l32 18M146 248l32 18" opacity="0.5" />
          <path d="M84 300q70 16 148 6" opacity="0.3" />
          <path d="M196 280q-24-30 2-48" opacity="0.25" />
        </>
      );
    case "ring":
      return (
        <>
          <circle cx="160" cy="250" r="64" strokeWidth="6" />
          <circle cx="160" cy="250" r="54" opacity="0.25" />
          <path d="M160 128l30 30-30 30-30-30Z" />
          <path d="M160 128v60M130 158h60" opacity="0.4" />
          <path d="M140 178l-8 22M180 178l8 22" opacity="0.6" />
          <path d="M148 140l12-12 12 12" opacity="0.3" />
        </>
      );
    case "candle":
      return (
        <>
          <rect x="104" y="208" width="112" height="124" rx="14" />
          <path d="M104 224q56 12 112 0" opacity="0.5" />
          <path d="M160 208v-18" />
          <path
            d="M160 138c18 28 12 52 0 52s-18-24 0-52Z"
            fill={gold}
            fillOpacity="0.35"
          />
          <rect x="128" y="248" width="64" height="44" rx="2" opacity="0.45" />
          <path d="M142 264h36M142 274h24" opacity="0.35" />
        </>
      );
    case "necklace":
      return (
        <>
          <path d="M70 74c16 166 164 166 180 0" />
          <path d="M78 74c14 152 150 152 164 0" opacity="0.25" />
          <circle cx="160" cy="258" r="7" opacity="0.7" />
          <circle cx="160" cy="296" r="30" />
          <path d="M146 284q8-10 20-6" opacity="0.4" />
          <circle cx="70" cy="74" r="4" opacity="0.6" />
          <circle cx="250" cy="74" r="4" opacity="0.6" />
        </>
      );
    default:
      return (
        <>
          <circle cx="160" cy="190" r="80" />
          <path d="M160 110v160M80 190h160" opacity="0.4" />
          <circle cx="160" cy="190" r="34" opacity="0.5" />
        </>
      );
  }
}

export function ProductArt({ art, className = "", tone = "dark" }: ProductArtProps) {
  return (
    <div
      className={`relative isolate overflow-hidden ${
        tone === "warm"
          ? "bg-[radial-gradient(130%_110%_at_50%_0%,#2b2418_0%,#141210_50%,#0a0908_100%)]"
          : "bg-[radial-gradient(130%_110%_at_50%_0%,#23211c_0%,#131313_52%,#080808_100%)]"
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.13]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a86a]/12" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a86a]/8" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center p-[13%]">
        <svg
          viewBox="0 0 320 400"
          fill="none"
          className="h-full w-full text-[#d8bd85]"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {artPaths(art)}
        </svg>
      </div>
    </div>
  );
}
