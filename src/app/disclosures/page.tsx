import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Disclosures",
  description: "Disclosure notes for Julio Vela Tech Solutions content and recommendations.",
  path: "/disclosures",
});

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-white)] text-[color:var(--brand-space)]">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 py-16 md:px-8">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)]"
        >
          :// JULIO VELA
        </Link>

        <p className="mt-16 text-sm font-semibold uppercase text-[color:var(--brand-red)]">Disclosures</p>
        <h1 className="mt-6 text-5xl font-semibold leading-none md:text-7xl">Disclosures</h1>
        <p className="mt-6 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-interface)]">
          Last updated: May 13, 2026
        </p>

        <div className="mt-12 space-y-8 text-lg leading-relaxed text-[color:var(--brand-graphite)]">
          <p>
            Content on this site is intended for practical technology education, commentary, and recommendations. It
            should not be treated as legal, financial, or security advice.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[color:var(--brand-space)]">Recommendations</h2>
            <p className="mt-3">
              Recommendations should be independent unless a sponsorship, affiliate relationship, or other material
              connection is clearly disclosed near the relevant content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[color:var(--brand-space)]">Draft-first publishing</h2>
            <p className="mt-3">
              Articles, LinkedIn posts, and recommendations remain drafts until explicitly reviewed and approved by
              Julio before publication.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
