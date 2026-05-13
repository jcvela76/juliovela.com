import BrandMark from "@/components/brand-mark";

export default function HeroSection() {
  return (
    <section
      id="intro"
      className="hero-surface scroll-panel isolate flex min-h-screen items-center justify-center bg-[color:var(--brand-soft)] px-6 py-12"
    >
      <div className="brand-entrance flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col items-center justify-center text-center">
        <BrandMark variant="hero" />

        <a
          href="#about"
          className="hero-scroll mt-auto inline-flex items-center gap-3 text-xs font-medium uppercase text-[color:var(--brand-interface)]"
          aria-label="Scroll to about"
        >
          <span>Scroll</span>
          <span className="scroll-indicator" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
