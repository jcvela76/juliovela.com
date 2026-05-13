type ContentSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  items?: string[];
  note?: string;
  draft?: boolean;
  theme: "white" | "soft" | "dark" | "graphite";
};

const themeStyles = {
  white: {
    section: "bg-[color:var(--brand-white)] text-[color:var(--brand-space)]",
    eyebrow: "text-[color:var(--brand-red)]",
    title: "text-[color:var(--brand-space)]",
    summary: "text-[color:var(--brand-graphite)]",
    item: "border-[color:var(--brand-red)] bg-[color:var(--brand-soft)] text-[color:var(--brand-graphite)]",
    badge: "border-[color:var(--brand-graphite)]/15 text-[color:var(--brand-interface)]",
    note: "text-[color:var(--brand-interface)]",
  },
  soft: {
    section: "bg-[color:var(--brand-soft)] text-[color:var(--brand-space)]",
    eyebrow: "text-[color:var(--brand-red)]",
    title: "text-[color:var(--brand-space)]",
    summary: "text-[color:var(--brand-graphite)]",
    item: "border-[color:var(--brand-red)] bg-[color:var(--brand-white)] text-[color:var(--brand-graphite)]",
    badge: "border-[color:var(--brand-graphite)]/15 text-[color:var(--brand-interface)]",
    note: "text-[color:var(--brand-interface)]",
  },
  dark: {
    section: "bg-[color:var(--brand-space)] text-[color:var(--brand-soft)]",
    eyebrow: "text-[color:var(--brand-red)]",
    title: "text-[color:var(--brand-white)]",
    summary: "text-[color:var(--brand-soft)]",
    item: "border-[color:var(--brand-red)] bg-white/5 text-[color:var(--brand-soft)]",
    badge: "border-white/20 text-[color:var(--brand-interface)]",
    note: "text-[color:var(--brand-interface)]",
  },
  graphite: {
    section: "bg-[color:var(--brand-graphite)] text-[color:var(--brand-soft)]",
    eyebrow: "text-[color:var(--brand-red)]",
    title: "text-[color:var(--brand-white)]",
    summary: "text-[color:var(--brand-soft)]",
    item: "border-[color:var(--brand-red)] bg-white/5 text-[color:var(--brand-soft)]",
    badge: "border-white/20 text-[color:var(--brand-interface)]",
    note: "text-[color:var(--brand-interface)]",
  },
};

export default function ContentSection({
  id,
  eyebrow,
  title,
  summary,
  items,
  note,
  draft,
  theme,
}: ContentSectionProps) {
  const styles = themeStyles[theme];

  return (
    <section
      id={id}
      className={`scroll-panel flex min-h-screen items-center ${styles.section}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="flex items-start justify-between gap-4">
          <p className={`text-sm font-semibold uppercase ${styles.eyebrow}`}>{eyebrow}</p>
          {draft && (
            <span className={`border px-2 py-1 text-xs uppercase ${styles.badge}`}>
              Draft
            </span>
          )}
        </div>
        <h2 className={`mt-8 max-w-4xl text-5xl font-semibold leading-none md:text-7xl ${styles.title}`}>
          {title}
        </h2>
        <p className={`mt-8 max-w-3xl text-xl leading-relaxed md:text-2xl ${styles.summary}`}>
          {summary}
        </p>
        {note ? <p className={`mt-4 text-sm ${styles.note}`}>{note}</p> : null}
        {items ? (
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className={`border-l-2 px-5 py-4 text-base leading-relaxed md:text-lg ${styles.item}`}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
