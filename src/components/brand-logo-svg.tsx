import React from "react";

import { brandPalette } from "@/lib/brand";
import { brandLogoViewBox } from "@/lib/brand-logo";

type BrandLogoSvgProps = {
  className?: string;
  height?: number | string;
  title?: string;
  width?: number | string;
};

export default function BrandLogoSvg({
  className,
  height,
  title = "Julio Vela Tech Solutions",
  width,
}: BrandLogoSvgProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      height={height}
      role="img"
      viewBox={`0 0 ${brandLogoViewBox.width} ${brandLogoViewBox.height}`}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <rect fill="none" height={brandLogoViewBox.height} width={brandLogoViewBox.width} />
      <g fill={brandPalette.red}>
        <circle cx="51" cy="35" r="6" />
        <circle cx="51" cy="67" r="6" />
        <path d="M73 20H83L69 85H59Z" />
        <path d="M100 20H110L96 85H86Z" />
      </g>
      <text
        fill={brandPalette.spaceGray}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="74"
        fontWeight="800"
        letterSpacing="5"
        x="146"
        y="73"
      >
        JULIO VELA
      </text>
      <text
        fill={brandPalette.interfaceGray}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="31"
        fontWeight="300"
        letterSpacing="9"
        x="193"
        y="138"
      >
        TECH SOLUTIONS
      </text>
    </svg>
  );
}
