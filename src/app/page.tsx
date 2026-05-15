import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import ContentSection from "@/components/content-section";
import { about, expertise, insights, services } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

const contactEmail = "mailto:me@juliovela.com";

export const metadata: Metadata = createPageMetadata({
  title: "Julio Vela Tech Solutions | Practical Technology Guidance",
  description:
    "Julio Vela shares clear, practical insights on AI, automation, software strategy, web solutions, and digital tools.",
  path: "/",
});

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
      <SiteHeader />
      <main>
        <HeroSection />
        <ContentSection {...about} />
        <ContentSection {...expertise} />
        <ContentSection {...services} />
        <ContentSection {...insights} />

        <section
          id="contact"
          className="scroll-panel min-h-screen bg-[color:var(--brand-white)] text-[color:var(--brand-space)]"
        >
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-4 py-10 md:px-8 md:py-12">
            <div className="flex flex-1 flex-col justify-center py-20 md:py-24">
              <p className="text-sm font-semibold uppercase text-[color:var(--brand-red)]">05 / Contact</p>
              <h2 className="mt-8 max-w-4xl text-5xl font-semibold leading-none text-[color:var(--brand-space)] md:text-7xl">
                Let&apos;s make the next technology decision clearer.
              </h2>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[color:var(--brand-graphite)] md:text-2xl">
                For collaboration, project questions, or practical technology guidance, start with a direct note.
              </p>
              <a
                href={contactEmail}
                className="mt-10 inline-flex w-fit border-b-2 border-[color:var(--brand-red)] py-1 text-lg font-semibold text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-white)]"
              >
                me@juliovela.com
              </a>
            </div>

            <footer className="flex flex-col gap-5 border-t border-[color:var(--brand-graphite)]/10 pt-6 text-xs uppercase tracking-[0.22em] text-[color:var(--brand-interface)] md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold tracking-[0.26em] text-[color:var(--brand-space)]">:// JULIO VELA</p>
                <p className="mt-2">TECH SOLUTIONS</p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                <span>© 2026</span>
                <Link className="transition-colors hover:text-[color:var(--brand-red)]" href="/privacy">
                  Privacy
                </Link>
                <Link className="transition-colors hover:text-[color:var(--brand-red)]" href="/disclosures">
                  Disclosures
                </Link>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
