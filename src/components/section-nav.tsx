type SectionNavLink = {
  label: string;
  href: string;
};

type SectionNavProps = {
  items: SectionNavLink[];
  className?: string;
};

export default function SectionNav({ items, className = "" }: SectionNavProps) {
  return (
    <nav aria-label="Section navigation">
      <ul className={`flex flex-wrap justify-end gap-2 text-xs font-medium uppercase text-[color:var(--brand-interface)] ${className}`}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="inline-flex border-b border-transparent px-1 py-1 transition-colors hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-soft)]"
          >
            {item.label}
          </a>
        </li>
      ))}
      </ul>
    </nav>
  );
}
