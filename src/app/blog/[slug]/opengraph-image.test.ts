import { describe, expect, it } from "vitest";
import { alt, contentType, generateStaticParams, size } from "@/app/blog/[slug]/opengraph-image";

describe("article Open Graph image", () => {
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

  it("generates image params for approved blog posts", () => {
    expect(generateStaticParams()).toContainEqual({
      slug: "choosing-the-right-ai-tool",
    });
  });
});
