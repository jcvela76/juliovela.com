import { ImageResponse } from "next/og";
import { brandIdentity, brandPalette } from "@/lib/brand";

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
            gap: 34,
            justifyContent: "center",
            letterSpacing: "-0.03em",
            padding: 72,
            textAlign: "center",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: 44,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: brandPalette.red,
                fontSize: 104,
                fontWeight: 800,
                letterSpacing: "-0.08em",
                lineHeight: 1,
              }}
            >
              {brandIdentity.mark}
            </span>
            <span
              style={{
                color: brandPalette.spaceGray,
                fontSize: 92,
                fontWeight: 800,
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              {brandIdentity.wordmark}
            </span>
          </div>
          <div
            style={{
              color: brandPalette.interfaceGray,
              fontSize: 34,
              fontWeight: 400,
              letterSpacing: "0.34em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            {brandIdentity.subtitle}
          </div>
          <div
            style={{
              background: brandPalette.red,
              height: 4,
              marginTop: 10,
              width: 96,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
