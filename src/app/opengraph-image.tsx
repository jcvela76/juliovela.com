import { ImageResponse } from "next/og";
import OgBrandLogo from "@/components/og-brand-logo";
import { brandPalette } from "@/lib/brand";

export const alt = "Julio Vela Tech Solutions brand preview image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: brandPalette.softWhite,
          color: brandPalette.spaceGray,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            justifyContent: "center",
            padding: 72,
            textAlign: "center",
          }}
        >
          <OgBrandLogo scale="hero" />
        </div>
      </div>
    ),
    size,
  );
}
