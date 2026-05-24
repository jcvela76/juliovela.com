import BrandMark from "@/components/brand-mark";
import React from "react";

export default function HeroSection() {
  return (
    <section
      id="intro"
      className="hero-surface scroll-panel isolate flex min-h-screen items-center justify-center bg-[color:var(--brand-soft)] px-6 py-12"
    >
      <h1 className="sr-only">Julio Vela Tech Solutions: practical technology guidance for modern builders.</h1>
      <div className="brand-entrance flex w-full max-w-5xl items-center justify-center text-center">
        <BrandMark variant="hero" />
      </div>
    </section>
  );
}
