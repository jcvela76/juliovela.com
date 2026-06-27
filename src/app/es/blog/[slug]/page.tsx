import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownBody from "@/components/markdown-body";
import { findVisibleBlogPostByLanguage, readVisibleBlogPostsByLanguage } from "@/lib/content/blog";
import {
  createBlogPostingJsonLd,
  createPageMetadata,
  indexableRobots,
  noIndexRobots,
  serializeJsonLd,
} from "@/lib/seo";

type SpanishBlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return readVisibleBlogPostsByLanguage("es").map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: SpanishBlogPostPageProps): Metadata {
  const post = findVisibleBlogPostByLanguage(params.slug, "es");

  if (!post) {
    return {
      title: "Artículo no encontrado",
      robots: noIndexRobots,
    };
  }

  const isPublished = post.status === "published";
  const metadata = createPageMetadata({
    title: post.seoTitle || post.title,
    description: post.description,
    path: post.routePath as `/${string}`,
    robots: isPublished ? indexableRobots : noIndexRobots,
    type: "article",
  });

  metadata.openGraph = {
    ...metadata.openGraph,
    title: post.ogTitle || post.seoTitle || post.title,
    description: post.ogDescription || post.description,
    locale: "es_ES",
    type: "article",
    publishedTime: isPublished ? post.date : undefined,
    authors: [post.author],
    tags: post.tags,
  };

  metadata.twitter = {
    ...metadata.twitter,
    title: post.ogTitle || post.seoTitle || post.title,
    description: post.ogDescription || post.description,
  };

  if (isPublished) {
    metadata.alternates = {
      canonical: post.canonicalUrl || post.routePath,
      languages: {
        es: post.canonicalUrl || post.routePath,
        ...(post.alternateLanguageUrl ? { en: post.alternateLanguageUrl } : {}),
      },
    };
  } else {
    delete metadata.alternates;
  }

  return metadata;
}

export default function SpanishBlogPostPage({ params }: SpanishBlogPostPageProps) {
  const post = findVisibleBlogPostByLanguage(params.slug, "es");

  if (!post) {
    notFound();
  }

  const isPublished = post.status === "published";
  const blogPostingJsonLd = isPublished ? createBlogPostingJsonLd(post) : null;

  return (
    <main className="min-h-screen bg-[color:var(--brand-white)] text-[color:var(--brand-space)]">
      {blogPostingJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingJsonLd) }}
        />
      ) : null}
      <article className="mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/es/blog"
            className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)]"
          >
            Volver a artículos
          </Link>
          <Link
            href="/blog/choosing-the-right-ai-tool"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-interface)] transition-colors hover:text-[color:var(--brand-red)]"
          >
            English version
          </Link>
        </div>

        <header className="mt-16 border-b border-[color:var(--brand-graphite)]/10 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase text-[color:var(--brand-red)]">{post.date}</p>
            {post.status !== "published" ? (
              <span className="border border-[color:var(--brand-graphite)]/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--brand-interface)]">
                {post.status}
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 text-5xl font-semibold leading-none md:text-7xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-[color:var(--brand-graphite)]">{post.excerpt}</p>
          <ul className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        </header>

        <div className="mt-10">
          <MarkdownBody body={post.body} />
        </div>
      </article>
    </main>
  );
}
