import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { siteMetadata } from "@/lib/seo";

describe("sitemap metadata route", () => {
  it("includes public static routes", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${siteMetadata.baseUrl}/`);
    expect(urls).toContain(`${siteMetadata.baseUrl}/blog`);
    expect(urls).toContain(`${siteMetadata.baseUrl}/privacy`);
    expect(urls).toContain(`${siteMetadata.baseUrl}/disclosures`);
  });

  it("excludes internal draft preview routes", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).not.toContain(`${siteMetadata.baseUrl}/drafts-preview`);
  });

  it("includes published articles in the production sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${siteMetadata.baseUrl}/blog/choosing-the-right-ai-tool`);
    expect(urls).toContain(`${siteMetadata.baseUrl}/es/blog/como-elegir-la-herramienta-ia-adecuada`);
  });
});
