type MarkdownBodyProps = {
  body: string;
};

export default function MarkdownBody({ body }: MarkdownBodyProps) {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5 text-lg leading-relaxed text-[color:var(--brand-graphite)]">
      {lines.map((line) => {
        if (line.startsWith("# ")) {
          return null;
        }

        if (line.startsWith("## ")) {
          return (
            <h2 key={line} className="pt-8 text-3xl font-semibold leading-tight text-[color:var(--brand-space)]">
              {line.replace(/^##\s+/, "")}
            </h2>
          );
        }

        if (/^\d+\.\s/.test(line)) {
          return (
            <p key={line} className="border-l-2 border-[color:var(--brand-red)] pl-4">
              {line}
            </p>
          );
        }

        return <p key={line}>{line}</p>;
      })}
    </div>
  );
}
