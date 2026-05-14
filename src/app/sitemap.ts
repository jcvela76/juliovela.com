import type { MetadataRoute } from "next";
import { readApprovedBlogPosts } from "@/lib/content/blog";
import { siteMetadata } from "@/lib/seo";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/blog", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/disclosures", priority: 0.2 },
] as const;

function urlFor(path: string) {
  return new URL(path, siteMetadata.baseUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: urlFor(route.path),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const articleEntries = readApprovedBlogPosts("production").map((post) => ({
    url: urlFor(`/blog/${post.slug}`),
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
