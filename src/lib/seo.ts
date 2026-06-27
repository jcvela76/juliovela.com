import type { Metadata } from "next";
import { brandIdentity } from "@/lib/brand";
import type { BlogPost } from "@/lib/content/blog";

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

export function createArticleOgImage(slug: string, title: string) {
  return {
    url: `/blog/${slug}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${title} | Julio Vela Tech Solutions article preview image`,
  };
}

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

type BlogPostingJsonLd = {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  author: {
    "@type": "Person";
    name: string;
  };
  dateModified: string;
  datePublished: string;
  description: string;
  headline: string;
  image: string[];
  keywords: string[];
  mainEntityOfPage: {
    "@id": string;
    "@type": "WebPage";
  };
  publisher: {
    "@type": "Organization";
    logo: {
      "@type": "ImageObject";
      url: string;
    };
    name: string;
  };
};

function absoluteSiteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, siteMetadata.baseUrl).toString();
}

export function createBlogPostingJsonLd(post: BlogPost): BlogPostingJsonLd {
  const articleUrl = absoluteSiteUrl(post.canonicalUrl || post.routePath);
  const imageUrl = absoluteSiteUrl(createArticleOgImage(post.slug, post.title).url);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: {
      "@type": "Person",
      name: post.author,
    },
    dateModified: post.date,
    datePublished: post.date,
    description: post.description,
    headline: post.seoTitle || post.title,
    image: [imageUrl],
    keywords: post.tags,
    mainEntityOfPage: {
      "@id": articleUrl,
      "@type": "WebPage",
    },
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: absoluteSiteUrl("/icon.svg"),
      },
      name: siteMetadata.name,
    },
  };
}

export function serializeJsonLd(data: BlogPostingJsonLd) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
