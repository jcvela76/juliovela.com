import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import ContentSection from "@/components/content-section";
import { featuredGuides, projects, whatICover } from "@/lib/site";

const contactEmail = "mailto:me@juliovela.com";

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-[color:var(--brand-space)] text-[color:var(--brand-soft)]">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:px-8 lg:py-14">
        <HeroSection />

        <div id="what-i-cover" className="scroll-mt-24">
          <ContentSection {...whatICover} />
        </div>

        <div id="featured-guides" className="scroll-mt-24">
          <ContentSection {...featuredGuides} />
        </div>

        <div id="projects-experiments" className="scroll-mt-24">
          <ContentSection {...projects} />
        </div>

        <section id="contact" className="rounded-2xl border border-white/15 bg-[color:var(--brand-space)] p-6 md:p-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[color:var(--brand-soft)]">Contact</h2>
          <p className="mt-2 text-sm text-[color:var(--brand-interface)]">
            For initial collaboration, feedback, or project questions:
          </p>
          <a
            href={contactEmail}
            className="mt-4 inline-flex rounded-full border border-[color:var(--brand-red)] px-5 py-3 font-semibold text-[color:var(--brand-red)] transition-colors hover:bg-[color:var(--brand-red)] hover:text-white"
          >
            me@juliovela.com
          </a>
        </section>
      </main>
    </div>
  );
}
