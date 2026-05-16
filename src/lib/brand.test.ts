import { describe, expect, it } from "vitest";
import { brandIdentity, brandPalette } from "./brand";
import { createBrandLogoDataUri, createBrandLogoSvg } from "./brand-logo";

describe("brand data contract", () => {
  it("exposes brand identity", () => {
    expect(brandIdentity.mark).toBe("://");
    expect(brandIdentity.wordmark).toBe("JULIO VELA");
    expect(brandIdentity.subtitle).toBe("TECH SOLUTIONS");
  });

  it("exposes core brand colors", () => {
    expect(brandPalette.red).toBe("#E11D2E");
    expect(brandPalette.spaceGray).toBe("#1F2329");
    expect(brandPalette.graphite).toBe("#2B2F36");
    expect(brandPalette.interfaceGray).toBe("#9AA0A6");
    expect(brandPalette.softWhite).toBe("#F5F6F7");
    expect(brandPalette.white).toBe("#FFFFFF");
  });

  it("has no auto-publish behavior in defaults", () => {
    expect((brandIdentity as Record<string, unknown>).publishAutomatically).toBeUndefined();
  });

  it("uses an SVG logo source of truth", () => {
    const svg = createBrandLogoSvg();

    expect(svg).toContain("<circle");
    expect(svg).toContain("<path");
    expect(svg).toContain("JULIO VELA");
    expect(svg).toContain("TECH SOLUTIONS");
    expect(svg).toContain(brandPalette.red);
    expect(createBrandLogoDataUri()).toMatch(/^data:image\/svg\+xml/);
  });
});
