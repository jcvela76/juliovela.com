import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import OgBrandLogo from "@/components/og-brand-logo";
import { brandIdentity, brandPalette } from "@/lib/brand";
import { findApprovedBlogPost, readApprovedBlogPosts } from "@/lib/content/blog";

type ArticleOpenGraphImageProps = {
  params: {
    slug: string;
  };
};

export const alt = "Julio Vela Tech Solutions article preview image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return readApprovedBlogPosts().map((post) => ({ slug: post.slug }));
}

export default function ArticleOpenGraphImage({ params }: ArticleOpenGraphImageProps) {
  const post = findApprovedBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const tags = post.tags.slice(0, 3).join(" / ").toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          background: brandPalette.softWhite,
          color: brandPalette.spaceGray,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 82px 62px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 22,
          }}
        >
          <OgBrandLogo />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              color: brandPalette.red,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.22em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Article
          </div>
          <div
            style={{
              color: brandPalette.spaceGray,
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.95,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              color: brandPalette.graphite,
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.28,
              maxWidth: 870,
            }}
          >
            {post.excerpt}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            borderTop: `2px solid ${brandPalette.graphite}18`,
            color: brandPalette.interfaceGray,
            display: "flex",
            fontSize: 20,
            fontWeight: 600,
            justifyContent: "space-between",
            letterSpacing: "0.18em",
            paddingTop: 28,
            textTransform: "uppercase",
          }}
        >
          <span>{tags}</span>
          <span>{brandIdentity.subtitle}</span>
        </div>
      </div>
    ),
    size,
  );
}
