import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";
import { createPageMetadata, defaultOgImage, noIndexRobots, siteMetadata } from "@/lib/seo";

describe("SEO metadata helpers", () => {
  it("defines the production site base URL", () => {
    expect(siteMetadata.baseUrl).toBe("https://juliovela.com");
  });

  it("creates canonical metadata for public routes", () => {
    const metadata = createPageMetadata({
      title: "Blog",
      description: "Practical technology articles.",
      path: "/blog",
    });

    expect(metadata.alternates).toEqual({ canonical: "/blog" });
    expect(metadata.openGraph).toMatchObject({
      images: [defaultOgImage],
      title: "Blog",
      url: "/blog",
      type: "website",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: [defaultOgImage.url],
    });
  });

  it("supports noindex metadata for preview-only routes", () => {
    const metadata = createPageMetadata({
      title: "Drafts Preview",
      description: "Internal review page.",
      path: "/drafts-preview",
      robots: noIndexRobots,
    });

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });

  it("declares favicon and apple icon metadata", () => {
    expect(metadata.icons).toMatchObject({
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: ["/icon.svg"],
      apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    });
  });

  it("declares default Open Graph image metadata", () => {
    expect(defaultOgImage).toEqual({
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Julio Vela Tech Solutions brand preview image",
    });
    expect(metadata.openGraph).toMatchObject({
      images: [defaultOgImage],
    });
    expect(metadata.twitter).toMatchObject({
      images: [defaultOgImage.url],
    });
  });
});
