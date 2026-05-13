"use client";

import BrandMark from "@/components/brand-mark";
import { navItems } from "@/lib/site";
import SectionNav from "@/components/section-nav";
import { useEffect, useRef, useState } from "react";

const darkSectionIds = new Set(["expertise", "insights"]);

export default function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined);
  const [isDarkHeader, setIsDarkHeader] = useState(false);

  useEffect(() => {
    const intro = document.getElementById("intro");

    if (!intro) {
      setShowHeaderLogo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntroVisible = entry.isIntersecting;

        setShowHeaderLogo(!isIntroVisible);

        if (isIntroVisible) {
          setActiveHref(undefined);
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(intro);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeaderTheme = () => {
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 72;
      const sampleY = Math.min(
        window.innerHeight - 1,
        Math.max(0, headerBottom + 2),
      );
      const sampleX = Math.min(window.innerWidth - 1, Math.max(0, window.innerWidth / 2));
      const section = document
        .elementsFromPoint(sampleX, sampleY)
        .find((element) => element.matches("section[id]"));

      setIsDarkHeader(Boolean(section?.id && darkSectionIds.has(section.id)));
    };

    updateHeaderTheme();

    window.addEventListener("scroll", updateHeaderTheme, { passive: true });
    window.addEventListener("resize", updateHeaderTheme);

    return () => {
      window.removeEventListener("scroll", updateHeaderTheme);
      window.removeEventListener("resize", updateHeaderTheme);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 top-0 z-20 w-full border-b backdrop-blur transition-colors duration-300 ${
        showHeaderLogo
          ? isDarkHeader
            ? "border-white/10 bg-[color:var(--brand-space)]/88"
            : "border-[color:var(--brand-graphite)]/10 bg-[color:var(--brand-soft)]/90"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div
          className={`transition-opacity duration-300 ${
            showHeaderLogo ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!showHeaderLogo}
        >
          <BrandMark inverted={isDarkHeader} variant="header" />
        </div>
        <SectionNav
          items={navItems}
          activeHref={activeHref}
          className="hidden justify-end gap-1.5 text-[0.66rem] md:flex md:gap-2 md:text-xs"
          inverted={isDarkHeader}
        />
      </div>
    </header>
  );
}
