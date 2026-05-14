import Link from "next/link";
import { notFound } from "next/navigation";
import { readDraftPreviewItems } from "@/lib/content/drafts";

export const metadata = {
  title: "Drafts Preview | :// JULIO VELA",
  description: "Internal draft review page for Julio Vela Tech Solutions content examples.",
  robots: {
    index: false,
    follow: false,
  },
};

function isDraftPreviewAllowed() {
  return process.env.VERCEL_ENV !== "production";
}

function frontmatterValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return value || "—";
}

function bodyPreview(body: string) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export default function DraftsPreviewPage() {
  if (!isDraftPreviewAllowed()) {
    notFound();
  }

  const items = readDraftPreviewItems();

  return (
    <main className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-8 border-b border-[color:var(--brand-graphite)]/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)]"
            >
              :// JULIO VELA
            </Link>
            <p className="mt-14 text-sm font-semibold uppercase text-[color:var(--brand-red)]">Internal preview</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-none md:text-7xl">Drafts Preview</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[color:var(--brand-graphite)]">
              Review repo-based content examples before public blog rendering exists. These drafts are not published and
              are blocked from production indexing.
            </p>
          </div>
          <div className="rounded-full border border-[color:var(--brand-graphite)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-interface)]">
            {items.length} drafts
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          {items.map((item) => (
            <article
              key={item.filePath}
              className="border-l-2 border-[color:var(--brand-red)] bg-[color:var(--brand-white)] p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-red)]">
                    {item.kind}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{item.title}</h2>
                  <p className="mt-3 font-mono text-xs text-[color:var(--brand-interface)]">{item.filePath}</p>
                </div>
                <span className="w-fit border border-[color:var(--brand-graphite)]/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--brand-interface)]">
                  {frontmatterValue(item.frontmatter.status)}
                </span>
              </div>

              <dl className="mt-8 grid gap-4 text-sm md:grid-cols-3">
                <div>
                  <dt className="font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">Slug</dt>
                  <dd className="mt-2 text-[color:var(--brand-graphite)]">{frontmatterValue(item.frontmatter.slug)}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">Date</dt>
                  <dd className="mt-2 text-[color:var(--brand-graphite)]">{frontmatterValue(item.frontmatter.date)}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">Tags</dt>
                  <dd className="mt-2 text-[color:var(--brand-graphite)]">{frontmatterValue(item.frontmatter.tags)}</dd>
                </div>
              </dl>

              {item.kind === "Blog draft" ? (
                <dl className="mt-8 grid gap-4 border-t border-[color:var(--brand-graphite)]/10 pt-6 text-sm md:grid-cols-2">
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">
                      SEO title
                    </dt>
                    <dd className="mt-2 text-[color:var(--brand-graphite)]">
                      {frontmatterValue(item.frontmatter.seo_title)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">
                      Meta description
                    </dt>
                    <dd className="mt-2 text-[color:var(--brand-graphite)]">
                      {frontmatterValue(item.frontmatter.description)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">
                      OG title
                    </dt>
                    <dd className="mt-2 text-[color:var(--brand-graphite)]">
                      {frontmatterValue(item.frontmatter.og_title)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-interface)]">
                      OG description
                    </dt>
                    <dd className="mt-2 text-[color:var(--brand-graphite)]">
                      {frontmatterValue(item.frontmatter.og_description)}
                    </dd>
                  </div>
                </dl>
              ) : null}

              <div className="mt-8 space-y-3 border-t border-[color:var(--brand-graphite)]/10 pt-6 text-base leading-relaxed text-[color:var(--brand-graphite)]">
                {bodyPreview(item.body).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
