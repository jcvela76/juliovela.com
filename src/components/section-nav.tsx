type SectionNavLink = {
  label: string;
  href: string;
};

type SectionNavProps = {
  items: SectionNavLink[];
  activeHref?: string;
  className?: string;
  inverted?: boolean;
};

export default function SectionNav({ items, activeHref, className = "", inverted = false }: SectionNavProps) {
  const baseTextColor = inverted ? "text-[color:var(--brand-soft)]" : "text-[color:var(--brand-interface)]";
  const activeTextColor = inverted ? "text-[color:var(--brand-white)]" : "text-[color:var(--brand-space)]";
  const focusOffset = inverted ? "focus-visible:ring-offset-[color:var(--brand-space)]" : "focus-visible:ring-offset-[color:var(--brand-soft)]";

  return (
    <nav aria-label="Section navigation">
      <ul className={`flex flex-wrap justify-end gap-2 text-xs font-medium uppercase ${baseTextColor} ${className}`}>
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              className={`nav-link inline-flex px-1 py-1 transition-colors hover:text-[color:var(--brand-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-red)] focus-visible:ring-offset-2 ${focusOffset} ${
                activeHref === item.href ? `nav-link-active ${activeTextColor}` : ""
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
