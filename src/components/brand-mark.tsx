import React from "react";

import { brandIdentity } from "@/lib/brand";

type BrandMarkVariant = "header" | "hero";

type BrandMarkProps = {
  variant?: BrandMarkVariant;
};

export default function BrandMark({ variant = "header" }: BrandMarkProps) {
  const isHero = variant === "hero";

  return (
    <a
      href="#top"
      className={`brand-lockup inline-flex flex-col ${isHero ? "items-center" : "items-start"}`}
      aria-label="Julio Vela home"
    >
      <span className={`flex items-center ${isHero ? "gap-5 sm:gap-7" : "gap-2.5"}`}>
        <span
          className={`brand-mark font-black leading-none text-[color:var(--brand-red)] ${isHero ? "text-5xl sm:text-6xl md:text-7xl" : "text-2xl"}`}
        >
          {brandIdentity.mark}
        </span>
        <span
          className={`font-black uppercase leading-none text-[color:var(--brand-space)] ${isHero ? "text-5xl sm:text-6xl md:text-7xl" : "text-2xl"}`}
        >
          {brandIdentity.wordmark}
        </span>
      </span>
      <span
        className={`brand-subtitle mt-3 font-light uppercase text-[color:var(--brand-interface)] ${isHero ? "text-base sm:text-lg md:text-xl" : "text-[0.65rem]"}`}
      >
        {brandIdentity.subtitle}
      </span>
    </a>
  );
}
