import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/drafts-preview"],
      },
    ],
    sitemap: `${siteMetadata.baseUrl}/sitemap.xml`,
    host: siteMetadata.baseUrl,
  };
}
