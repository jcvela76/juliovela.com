/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      "/*": ["./.pnpm-store/**/*"],
      "/blog": ["./.pnpm-store/**/*"],
      "/blog/[slug]": ["./.pnpm-store/**/*"],
      "/drafts-preview": ["./.pnpm-store/**/*"],
      "/sitemap.xml": ["./.pnpm-store/**/*"],
    },
    outputFileTracingIncludes: {
      "/blog": ["./content/approved/blog/**/*"],
      "/blog/[slug]": ["./content/approved/blog/**/*"],
      "/drafts-preview": [
        "./content/assets/prompts/**/*",
        "./content/drafts/blog/**/*",
        "./content/drafts/linkedin/**/*",
      ],
      "/sitemap.xml": ["./content/approved/blog/**/*"],
    },
  },
  reactStrictMode: true,
};

export default nextConfig;
