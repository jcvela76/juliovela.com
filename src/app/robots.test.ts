import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { siteMetadata } from "@/lib/seo";

describe("robots metadata route", () => {
  it("allows public crawling but excludes draft preview", () => {
    const result = robots();

    expect(result).toMatchObject({
      sitemap: `${siteMetadata.baseUrl}/sitemap.xml`,
      host: siteMetadata.baseUrl,
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/drafts-preview"],
        },
      ],
    });
  });
});
