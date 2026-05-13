import React from "react";

import { brandIdentity } from "@/lib/brand";

type BrandMarkVariant = "header" | "hero";

type BrandMarkProps = {
  inverted?: boolean;
  variant?: BrandMarkVariant;
};

export default function BrandMark({ inverted = false, variant = "header" }: BrandMarkProps) {
  const isHero = variant === "hero";
  const wordmarkColor = inverted ? "text-[color:var(--brand-white)]" : "text-[color:var(--brand-space)]";

  return (
    <a
      href="#top"
      className={`brand-lockup inline-flex flex-col ${isHero ? "items-center" : "items-start"}`}
      aria-label="Julio Vela home"
    >
      <span className={`flex items-center ${isHero ? "gap-3 sm:gap-5 md:gap-7" : "gap-2.5"}`}>
        <span
          className={`brand-mark font-black leading-none text-[color:var(--brand-red)] ${isHero ? "text-4xl sm:text-6xl md:text-7xl" : "text-2xl"}`}
        >
          {brandIdentity.mark}
        </span>
        <span
          className={`font-black uppercase leading-none ${wordmarkColor} ${isHero ? "text-4xl sm:text-6xl md:text-7xl" : "text-2xl"}`}
        >
          {brandIdentity.wordmark}
        </span>
      </span>
      <span
        className={`brand-subtitle mt-3 font-light uppercase text-[color:var(--brand-interface)] ${isHero ? "text-xs sm:text-lg md:text-xl" : "text-[0.65rem]"}`}
      >
        {brandIdentity.subtitle}
      </span>
    </a>
  );
}
