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
            gap: 28,
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
              gap: 38,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: brandPalette.red,
                fontSize: 94,
                fontWeight: 800,
                letterSpacing: "-0.1em",
                lineHeight: 1,
              }}
            >
              {brandIdentity.mark}
            </span>
            <span
              style={{
                color: brandPalette.spaceGray,
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              {brandIdentity.wordmark}
            </span>
          </div>
          <div
            style={{
              color: brandPalette.interfaceGray,
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: "0.42em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            {"T E C H   S O L U T I O N S"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
