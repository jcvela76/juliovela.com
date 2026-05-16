import React from "react";

import BrandLogoSvg from "@/components/brand-logo-svg";
import { brandIdentity } from "@/lib/brand";

type BrandMarkVariant = "header" | "hero";

type BrandMarkProps = {
  tone?: "default" | "inverted";
  variant?: BrandMarkVariant;
};

export default function BrandMark({ tone = "default", variant = "header" }: BrandMarkProps) {
  const isHero = variant === "hero";

  return (
    <a
      href="#top"
      className={`brand-lockup inline-flex ${isHero ? "items-center justify-center" : "items-center"}`}
      aria-label="Julio Vela home"
    >
      <BrandLogoSvg
        className={isHero ? "block h-auto w-[min(78vw,48rem)]" : "block h-auto w-44 translate-y-[3px] sm:w-52"}
        lockup={isHero ? "full" : "compact"}
        title={`${brandIdentity.wordmark} ${brandIdentity.subtitle}`}
        tone={tone}
      />
    </a>
  );
}
