import type { Metadata } from "next";
import Link from "next/link";
import { readApprovedBlogPosts } from "@/lib/content/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Clear writing on AI tools, automation, software strategy, and web decisions focused on what is useful, reliable, and worth adopting.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = readApprovedBlogPosts();
  const isProduction = process.env.VERCEL_ENV === "production";

  return (
    <main className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)]"
        >
          :// JULIO VELA
        </Link>

        <div className="mt-16 border-b border-[color:var(--brand-graphite)]/10 pb-10">
          <p className="text-sm font-semibold uppercase text-[color:var(--brand-red)]">Blog</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-none md:text-7xl">
            Practical guides for better technology decisions.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[color:var(--brand-graphite)]">
            Clear writing on AI tools, automation, software strategy, and web decisions - focused on what is useful,
            reliable, and worth adopting.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="border-l-2 border-[color:var(--brand-red)] bg-[color:var(--brand-white)] p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-red)]">
                      {post.date}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                      <Link className="transition-colors hover:text-[color:var(--brand-red)]" href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[color:var(--brand-graphite)]">{post.excerpt}</p>
                  </div>
                  {!isProduction ? (
                    <span className="w-fit border border-[color:var(--brand-graphite)]/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--brand-interface)]">
                      {post.status}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">
                  {post.tags.map((tag) => (
                    <li key={tag}>#{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 border-l-2 border-[color:var(--brand-red)] bg-[color:var(--brand-white)] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-red)]">No public articles yet</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--brand-graphite)]">
              Approved articles will appear here after Julio reviews them. Drafts remain private to the internal preview workflow.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
