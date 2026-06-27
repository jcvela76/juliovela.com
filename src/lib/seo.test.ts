import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";
import {
  createArticleOgImage,
  createBlogPostingJsonLd,
  createPageMetadata,
  defaultOgImage,
  noIndexRobots,
  serializeJsonLd,
  siteMetadata,
} from "@/lib/seo";

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

  it("creates article-specific Open Graph image metadata", () => {
    expect(createArticleOgImage("example-article", "Example Article")).toEqual({
      url: "/blog/example-article/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Example Article | Julio Vela Tech Solutions article preview image",
    });
  });

  it("creates BlogPosting structured data for published articles", () => {
    const jsonLd = createBlogPostingJsonLd({
      alternateLanguageUrl: "",
      author: "Julio Vela",
      body: "# Example",
      canonicalUrl: "",
      date: "2026-05-15",
      description: "A practical article description.",
      excerpt: "A practical article excerpt.",
      filePath: "content/approved/blog/example.mdx",
      language: "en",
      ogDescription: "Social description.",
      ogTitle: "Social title",
      routePath: "/blog/example-article",
      seoTitle: "Example SEO Title",
      slug: "example-article",
      source: "approved",
      status: "published",
      tags: ["AI tools", "workflows"],
      title: "Example Article",
      translationOf: "",
    });

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      author: {
        "@type": "Person",
        name: "Julio Vela",
      },
      dateModified: "2026-05-15",
      datePublished: "2026-05-15",
      description: "A practical article description.",
      headline: "Example SEO Title",
      image: [`${siteMetadata.baseUrl}/blog/example-article/opengraph-image`],
      keywords: ["AI tools", "workflows"],
      mainEntityOfPage: {
        "@id": `${siteMetadata.baseUrl}/blog/example-article`,
        "@type": "WebPage",
      },
      publisher: {
        "@type": "Organization",
        logo: {
          "@type": "ImageObject",
          url: `${siteMetadata.baseUrl}/icon.svg`,
        },
        name: siteMetadata.name,
      },
    });
  });

  it("serializes structured data safely for inline script rendering", () => {
    const jsonLd = createBlogPostingJsonLd({
      alternateLanguageUrl: "",
      author: "Julio Vela",
      body: "",
      canonicalUrl: "https://juliovela.com/blog/custom",
      date: "2026-05-15",
      description: "Description with <tag> text.",
      excerpt: "",
      filePath: "content/approved/blog/custom.mdx",
      language: "en",
      ogDescription: "",
      ogTitle: "",
      routePath: "/blog/custom",
      seoTitle: "",
      slug: "custom",
      source: "approved",
      status: "published",
      tags: [],
      title: "Custom Title",
      translationOf: "",
    });

    expect(serializeJsonLd(jsonLd)).toContain("\\u003ctag>");
    expect(serializeJsonLd(jsonLd)).not.toContain("<tag>");
  });
});
