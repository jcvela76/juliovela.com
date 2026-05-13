import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import ContentSection from "@/components/content-section";
import { about, expertise, insights, services } from "@/lib/site";

const contactEmail = "mailto:me@juliovela.com";

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]">
      <SiteHeader />
      <main className="scroll-story">
        <HeroSection />
        <ContentSection {...about} />
        <ContentSection {...expertise} />
        <ContentSection {...services} />
        <ContentSection {...insights} />

        <section
          id="contact"
          className="scroll-panel flex min-h-screen items-center bg-[color:var(--brand-white)] text-[color:var(--brand-space)]"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
            <p className="text-sm font-semibold uppercase text-[color:var(--brand-red)]">05 / Contact</p>
            <h2 className="mt-8 max-w-4xl text-5xl font-semibold leading-none text-[color:var(--brand-space)] md:text-7xl">
              Let&apos;s make the next technology decision clearer.
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[color:var(--brand-graphite)] md:text-2xl">
              For collaboration, feedback, or project questions, start with a direct note.
            </p>
            <a
              href={contactEmail}
              className="mt-10 inline-flex border-b-2 border-[color:var(--brand-red)] py-1 text-lg font-semibold text-[color:var(--brand-red)] transition-colors hover:text-[color:var(--brand-space)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-white)]"
            >
              me@juliovela.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
