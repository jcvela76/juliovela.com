import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { brandPalette } from "@/lib/brand";
import { findApprovedBlogPost, readApprovedBlogPosts } from "@/lib/content/blog";

type ArticleImageLabPageProps = {
  params: {
    slug: string;
  };
};

const imageSize = {
  width: 1200,
  height: 630,
};

const supportText = "Workflow fit over hype.";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Article Image Lab | Julio Vela",
};

export function generateStaticParams() {
  return readApprovedBlogPosts().map((post) => ({ slug: post.slug }));
}

function readArticleIllustrationDataUri(slug: string) {
  const approvedTextlessPath = path.join(
    process.cwd(),
    "content/assets/images",
    slug,
    "editorial-illustration-textless.png",
  );
  const directionPath = path.join(
    process.cwd(),
    "content/assets/images",
    slug,
    "editorial-illustration-direction.png",
  );
  const illustrationPath = existsSync(approvedTextlessPath) ? approvedTextlessPath : directionPath;

  if (!existsSync(illustrationPath)) {
    return null;
  }

  return `data:image/png;base64,${readFileSync(illustrationPath).toString("base64")}`;
}

function BrandMark({ x = 78, y = 330, scale = 0.72 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g fill={brandPalette.red} transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="51" cy="35" r="6" />
      <circle cx="51" cy="67" r="6" />
      <path d="M73 20H83L69 85H59Z" />
      <path d="M100 20H110L96 85H86Z" />
    </g>
  );
}

function BaseIllustration({ illustrationDataUri }: { illustrationDataUri: string | null }) {
  return (
    <>
      <rect width={imageSize.width} height={imageSize.height} fill={brandPalette.softWhite} />
      {illustrationDataUri ? (
        <image
          href={illustrationDataUri}
          width={imageSize.width}
          height={imageSize.height}
          preserveAspectRatio="xMidYMid slice"
          x="0"
          y="0"
        />
      ) : null}
    </>
  );
}

function VariantFrame({
  children,
  description,
  label,
}: {
  children: ReactNode;
  description: string;
  label: string;
}) {
  return (
    <article className="grid gap-4 rounded-[28px] border border-[rgba(31,35,41,0.14)] bg-white p-4 shadow-[0_28px_80px_rgba(31,35,41,0.08)]">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-1">
        <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-red)]">
          {label}
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-[var(--brand-graphite)]">{description}</p>
      </div>
      <div className="overflow-hidden rounded-[18px] border border-[rgba(31,35,41,0.08)] bg-[var(--brand-soft)]">
        {children}
      </div>
    </article>
  );
}

function PathTitleVariant({
  illustrationDataUri,
  title,
}: {
  illustrationDataUri: string | null;
  title: string;
}) {
  const titlePath = "M142 403 H350 C515 403 520 322 700 322 H815";

  return (
    <svg
      aria-label="Variant A article image"
      className="block h-auto w-full"
      role="img"
      viewBox={`0 0 ${imageSize.width} ${imageSize.height}`}
    >
      <BaseIllustration illustrationDataUri={illustrationDataUri} />
      <defs>
        <path id="variant-a-title-path" d={titlePath} />
      </defs>
      <BrandMark x={50} y={328} />
      <text
        dominantBaseline="alphabetic"
        dy="-32"
        fill={brandPalette.spaceGray}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="45"
        fontWeight="800"
        letterSpacing="0.2"
        wordSpacing="8"
      >
        <textPath href="#variant-a-title-path" startOffset="0">
          {title}
        </textPath>
      </text>
      <text
        fill={brandPalette.graphite}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="36"
        fontWeight="500"
        letterSpacing="-0.3"
        x="78"
        y="498"
      >
        {supportText}
      </text>
    </svg>
  );
}

function HorizontalTitleVariant({
  illustrationDataUri,
  title,
}: {
  illustrationDataUri: string | null;
  title: string;
}) {
  return (
    <svg
      aria-label="Variant B article image"
      className="block h-auto w-full"
      role="img"
      viewBox={`0 0 ${imageSize.width} ${imageSize.height}`}
    >
      <BaseIllustration illustrationDataUri={illustrationDataUri} />
      <BrandMark x={50} y={330} />
      <text
        fill={brandPalette.spaceGray}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="52"
        fontWeight="800"
        letterSpacing="-0.8"
        x="145"
        y="386"
      >
        {title}
      </text>
      <text
        fill={brandPalette.graphite}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="34"
        fontWeight="500"
        letterSpacing="-0.2"
        x="78"
        y="500"
      >
        {supportText}
      </text>
    </svg>
  );
}

function HybridTitleVariant({
  illustrationDataUri,
  title,
}: {
  illustrationDataUri: string | null;
  title: string;
}) {
  return (
    <svg
      aria-label="Variant C article image"
      className="block h-auto w-full"
      role="img"
      viewBox={`0 0 ${imageSize.width} ${imageSize.height}`}
    >
      <BaseIllustration illustrationDataUri={illustrationDataUri} />
      <BrandMark x={50} y={330} />
      <text
        fill={brandPalette.spaceGray}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="50"
        fontWeight="800"
        letterSpacing="-0.6"
        x="145"
        y="386"
      >
        Choosing the Right
      </text>
      <text
        fill={brandPalette.spaceGray}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="48"
        fontWeight="800"
        letterSpacing="0"
        x="574"
        y="290"
      >
        AI Tool
      </text>
      <text
        fill={brandPalette.graphite}
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="36"
        fontWeight="500"
        letterSpacing="-0.3"
        x="78"
        y="500"
      >
        {supportText}
      </text>
    </svg>
  );
}

export default function ArticleImageLabPage({ params }: ArticleImageLabPageProps) {
  const post = findApprovedBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const title = post.ogTitle || post.title;
  const illustrationDataUri = readArticleIllustrationDataUri(post.slug);

  return (
    <main className="min-h-screen bg-[var(--brand-soft)] px-5 py-8 text-[var(--brand-space)] md:px-8 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-8">
        <header className="grid gap-3">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-red)]">
            Article image lab
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Compare typography directions before approving the final OG image.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--brand-graphite)] md:text-lg">
            Temporary noindex route for visual review only. The final Open Graph route should stay
            unchanged until one direction is approved.
          </p>
        </header>

        <VariantFrame
          description="Keeps the original idea: the title follows the red path. Best conceptual connection, but highest risk of letter distortion."
          label="Variant A / Path title"
        >
          <PathTitleVariant illustrationDataUri={illustrationDataUri} title={title} />
        </VariantFrame>

        <VariantFrame
          description="Keeps typography fully controlled and readable. The red path becomes an editorial underline instead of controlling the letters."
          label="Variant B / Controlled title"
        >
          <HorizontalTitleVariant illustrationDataUri={illustrationDataUri} title={title} />
        </VariantFrame>

        <VariantFrame
          description="Hybrid editorial composition: most of the title stays controlled while AI Tool sits near the target decision point."
          label="Variant C / Hybrid editorial"
        >
          <HybridTitleVariant illustrationDataUri={illustrationDataUri} title={title} />
        </VariantFrame>
      </div>
    </main>
  );
}
