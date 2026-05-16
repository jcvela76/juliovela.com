/* eslint-disable @next/next/no-img-element */
import React from "react";

import { brandLogoPngDataUri } from "@/lib/brand-logo-png";

type OgBrandLogoProps = {
  scale?: "compact" | "hero";
};

export default function OgBrandLogo({ scale = "compact" }: OgBrandLogoProps) {
  const isHero = scale === "hero";
  const width = isHero ? 760 : 360;
  const height = isHero ? 157 : 75;

  return (
    <img
      alt="Julio Vela Tech Solutions"
      height={height}
      src={brandLogoPngDataUri}
      width={width}
    />
  );
}
