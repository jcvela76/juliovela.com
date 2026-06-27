import type { Metadata } from "next";
import Link from "next/link";
import { readApprovedBlogPostsByLanguage, readVisibleBlogPostsByLanguage } from "@/lib/content/blog";
import { createPageMetadata, indexableRobots, noIndexRobots } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const hasPublishedSpanishPosts = readApprovedBlogPostsByLanguage("es", "production", "main").some(
    (post) => post.status === "published",
  );

  return createPageMetadata({
    title: "Artículos en español",
    description:
      "Guías prácticas en español sobre IA, automatización, estrategia de software y mejores decisiones tecnológicas.",
    path: "/es/blog",
    robots: hasPublishedSpanishPosts ? indexableRobots : noIndexRobots,
  });
}

export default function SpanishBlogIndexPage() {
  const posts = readVisibleBlogPostsByLanguage("es");
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
          <p className="text-sm font-semibold uppercase text-[color:var(--brand-red)]">Español</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-none md:text-7xl">
            Guías prácticas para tomar mejores decisiones de tecnología.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[color:var(--brand-graphite)]">
            Contenido en español sobre IA, automatización, estrategia de software y herramientas digitales, con enfoque
            práctico y sin hype.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-l-2 border-[color:var(--brand-red)] bg-[color:var(--brand-white)] p-6 md:p-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-red)]">
                      {post.date}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                      <Link className="transition-colors hover:text-[color:var(--brand-red)]" href={post.routePath}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[color:var(--brand-graphite)]">
                      {post.excerpt}
                    </p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-red)]">
              No hay artículos públicos en español todavía
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--brand-graphite)]">
              Las versiones en español aparecerán aquí después de revisión, aprobación y publicación explícita.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
