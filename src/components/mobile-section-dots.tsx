type MobileSectionDot = {
  label: string;
  href: string;
};

type MobileSectionDotsProps = {
  items: MobileSectionDot[];
  activeHref: string;
  inverted?: boolean;
  hidden?: boolean;
};

export default function MobileSectionDots({
  items,
  activeHref,
  inverted = false,
  hidden = false,
}: MobileSectionDotsProps) {
  const railColor = inverted ? "bg-white/20" : "bg-[color:var(--brand-space)]/15";
  const dotColor = inverted ? "bg-white/45" : "bg-[color:var(--brand-space)]/35";
  const labelColor = inverted ? "text-[color:var(--brand-soft)]" : "text-[color:var(--brand-space)]";

  return (
    <nav
      aria-label="Mobile section navigation"
      className={`fixed left-1 top-1/2 z-30 -translate-y-1/2 transition-opacity duration-300 md:hidden ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <ul className="flex flex-col items-start gap-1.5">
        {items.map((item) => {
          const isActive = activeHref === item.href;

          return (
            <li key={item.href} className="relative flex items-center">
              <a
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`group flex h-7 w-6 items-center justify-start rounded-full pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-red)] focus-visible:ring-offset-2 ${
                  inverted
                    ? "focus-visible:ring-offset-[color:var(--brand-space)]"
                    : "focus-visible:ring-offset-[color:var(--brand-soft)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`block rounded-full transition-all duration-200 ${
                    isActive ? "h-5 w-1 bg-[color:var(--brand-red)]" : `h-1.5 w-1.5 ${dotColor}`
                  }`}
                />
                <span
                  className={`pointer-events-none absolute left-6 whitespace-nowrap rounded-full px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] opacity-0 shadow-sm transition-opacity duration-200 group-focus-visible:opacity-100 ${labelColor} ${railColor}`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
