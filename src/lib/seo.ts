import type { Metadata } from "next";
import { brandIdentity } from "@/lib/brand";

export const siteMetadata = {
  baseUrl: "https://juliovela.com",
  name: "Julio Vela Tech Solutions",
  title: `${brandIdentity.mark} ${brandIdentity.wordmark} | ${brandIdentity.subtitle}`,
  titleTemplate: `%s | Julio Vela Tech Solutions`,
  description:
    "Practical technology guidance on AI, automation, software strategy, web solutions, and digital tools.",
  locale: "en_US",
};

export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Julio Vela Tech Solutions brand preview image",
};

export const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  robots?: Metadata["robots"];
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  robots = indexableRobots,
  type = "website",
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots,
    openGraph: {
      title,
      description,
      images: [defaultOgImage],
      url: path,
      siteName: siteMetadata.name,
      locale: siteMetadata.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      images: [defaultOgImage.url],
      title,
      description,
    },
  };
}
