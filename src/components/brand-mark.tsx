import React from "react";

import BrandLogoSvg from "@/components/brand-logo-svg";
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
      className={`brand-lockup inline-flex ${isHero ? "items-center justify-center" : "items-start"}`}
      aria-label="Julio Vela home"
    >
      <BrandLogoSvg
        className={isHero ? "h-auto w-[min(78vw,48rem)]" : "h-auto w-44 sm:w-52"}
        title={`${brandIdentity.wordmark} ${brandIdentity.subtitle}`}
      />
    </a>
  );
}
