type SectionNavLink = {
  id: string;
  label: string;
};

type SectionNavProps = {
  items: SectionNavLink[];
};

export default function SectionNav({ items }: SectionNavProps) {
  return (
    <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="block rounded-lg border border-white/15 bg-[color:var(--brand-graphite)] p-3 transition-colors hover:border-[color:var(--brand-red)] hover:text-[color:var(--brand-red)]"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
