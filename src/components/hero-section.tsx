import BrandMark from "@/components/brand-mark";

export default function HeroSection() {
  return (
    <section
      id="intro"
      className="hero-surface scroll-panel isolate flex min-h-screen items-center justify-center bg-[color:var(--brand-soft)] px-6 py-12"
    >
      <div className="brand-entrance flex w-full max-w-5xl items-center justify-center text-center">
        <BrandMark variant="hero" />
      </div>
      <a
        href="#about"
        className="hero-scroll absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 text-xs font-medium uppercase text-[color:var(--brand-interface)] transition-colors hover:text-[color:var(--brand-red)]"
        aria-label="Scroll to about"
      >
        <span>Scroll</span>
      </a>
    </section>
  );
}
