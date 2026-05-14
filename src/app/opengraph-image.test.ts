import { describe, expect, it } from "vitest";
import { alt, contentType, size } from "@/app/opengraph-image";

describe("default Open Graph image", () => {
  it("uses the expected social preview dimensions", () => {
    expect(size).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("declares accessible image metadata", () => {
    expect(alt).toContain("Julio Vela Tech Solutions");
    expect(contentType).toBe("image/png");
  });
});
