type ContentSectionProps = {
  id: string;
  title: string;
  items: string[];
  note?: string;
  draft?: boolean;
};

export default function ContentSection({ id, title, items, note, draft }: ContentSectionProps) {
  return (
    <section id={id} className="rounded-2xl border border-white/15 bg-[color:var(--brand-space)] p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[color:var(--brand-soft)]">{title}</h2>
        {draft && <span className="text-xs uppercase tracking-[0.14em] text-[color:var(--brand-interface)]">Draft</span>}
      </div>
      <p className="mt-2 text-sm text-[color:var(--brand-interface)]">{note}</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-[color:var(--brand-graphite)] px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
