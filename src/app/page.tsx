import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import ContentSection from "@/components/content-section";
import MobileScrollSettler from "@/components/mobile-scroll-settler";
import { about, expertise, insights, services } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

const contactEmail = "mailto:me@juliovela.com";
const linkedInUrl = "https://www.linkedin.com/in/juliovelanyc/";

export const metadata: Metadata = createPageMetadata({
  title: "Julio Vela Tech Solutions | Practical AI, Automation, and Software Guidance",
  description:
    "Practical technology guidance for AI tools, automation, software strategy, web solutions, and smarter digital decisions.",
  path: "/",
});

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
      <SiteHeader />
      <MobileScrollSettler />
      <main className="home-scroll-container">
        <HeroSection />
        <ContentSection {...about} />
        <ContentSection {...expertise} />
        <ContentSection {...services} />
        <ContentSection {...insights} />

        <section
          id="contact"
          className="scroll-panel bg-[color:var(--brand-white)] text-[color:var(--brand-space)]"
        >
          <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-between pl-8 pr-4 py-10 sm:px-6 md:px-8 md:py-12">
            <div className="flex flex-1 flex-col justify-center py-24 md:py-24">
              <p className="text-sm font-semibold uppercase text-[color:var(--brand-red)]">05 / Contact</p>
              <h2 className="mt-8 max-w-4xl text-4xl font-semibold leading-none text-[color:var(--brand-space)] sm:text-5xl md:text-7xl">
                Have a technology decision that needs a sharper point of view?
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[color:var(--brand-graphite)] sm:text-xl md:mt-8 md:text-2xl">
                For project questions, workflow reviews, or practical software direction, start with a direct note.
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
                <a
                  className="transition-colors hover:text-[color:var(--brand-red)]"
                  href={linkedInUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  LinkedIn
                </a>
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
