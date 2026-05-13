import BrandMark from "@/components/brand-mark";
import { navItems } from "@/lib/site";
import SectionNav from "@/components/section-nav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--brand-graphite)]/10 bg-[color:var(--brand-soft)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <BrandMark variant="header" />
        <SectionNav
          items={navItems}
          className="justify-end gap-1.5 text-[0.66rem] md:gap-2 md:text-xs"
        />
      </div>
    </header>
  );
}
