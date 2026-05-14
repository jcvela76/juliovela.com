import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";
import { createPageMetadata, noIndexRobots, siteMetadata } from "@/lib/seo";

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
      title: "Blog",
      url: "/blog",
      type: "website",
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
});
