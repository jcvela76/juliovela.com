import BrandMark from "@/components/brand-mark";
import { navItems } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[color:var(--brand-space)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <BrandMark />
        <nav aria-label="Section navigation">
          <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-[color:var(--brand-soft)]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="transition-colors hover:text-[color:var(--brand-red)]" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
