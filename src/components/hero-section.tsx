"use client";

import { brandIdentity, heroCopy } from "@/lib/brand";

export default function HeroSection() {
  return (
    <section className="rounded-2xl border border-white/15 bg-[color:var(--brand-space)] p-8 md:p-14">
      <div
        className="max-w-3xl"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--brand-interface)]">
          {brandIdentity.subtitle}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[color:var(--brand-soft)] md:text-5xl">
          {heroCopy.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--brand-soft)]">
          {heroCopy.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#featured-guides"
            className="rounded-full bg-[color:var(--brand-red)] px-5 py-3 font-semibold text-white transition-colors hover:brightness-110"
          >
            Explore the guides
          </a>
          <a
            href="#contact"
            className="rounded-full border border-[color:var(--brand-red)] px-5 py-3 font-semibold text-[color:var(--brand-red)] transition-colors hover:bg-[color:var(--brand-red)] hover:text-white"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
}
