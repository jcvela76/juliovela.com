import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownBody from "@/components/markdown-body";
import { findApprovedBlogPost, readApprovedBlogPosts } from "@/lib/content/blog";
import { createPageMetadata, indexableRobots, noIndexRobots } from "@/lib/seo";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return readApprovedBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = findApprovedBlogPost(params.slug);

  if (!post) {
    return {
      title: "Article not found",
      robots: noIndexRobots,
    };
  }

  const isPublished = post.status === "published";
  const metadata = createPageMetadata({
    title: post.seoTitle || post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    robots: isPublished ? indexableRobots : noIndexRobots,
    type: "article",
  });

  metadata.openGraph = {
    ...metadata.openGraph,
    title: post.ogTitle || post.seoTitle || post.title,
    description: post.ogDescription || post.description,
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
      canonical: post.canonicalUrl || `/blog/${post.slug}`,
    };
  } else {
    delete metadata.alternates;
  }

  return metadata;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = findApprovedBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[color:var(--brand-white)] text-[color:var(--brand-space)]">
      <article className="mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <Link
          href="/blog"
          className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)]"
        >
          Back to blog
        </Link>

        <header className="mt-16 border-b border-[color:var(--brand-graphite)]/10 pb-10">
          <p className="text-sm font-semibold uppercase text-[color:var(--brand-red)]">{post.date}</p>
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
