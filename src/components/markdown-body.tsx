import React from "react";

type MarkdownBodyProps = {
  body: string;
};

type MarkdownBlock =
  | {
      content: string;
      type: "heading" | "ordered" | "paragraph" | "skip";
    }
  | {
      items: string[];
      type: "unordered-list";
    };

function parseMarkdownBlocks(body: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      blocks.push({ items: listItems, type: "unordered-list" });
      listItems = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith("- ")) {
      listItems.push(line.replace(/^-\s+/, ""));
      continue;
    }

    flushList();

    if (line.startsWith("# ")) {
      blocks.push({ content: line, type: "skip" });
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ content: line.replace(/^##\s+/, ""), type: "heading" });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      blocks.push({ content: line, type: "ordered" });
      continue;
    }

    blocks.push({ content: line, type: "paragraph" });
  }

  flushList();

  return blocks;
}

export default function MarkdownBody({ body }: MarkdownBodyProps) {
  const blocks = parseMarkdownBlocks(body);

  return (
    <div className="space-y-5 text-lg leading-relaxed text-[color:var(--brand-graphite)]">
      {blocks.map((block, index) => {
        if (block.type === "skip") {
          return null;
        }

        if (block.type === "heading") {
          return (
            <h2 key={`${block.content}-${index}`} className="pt-8 text-3xl font-semibold leading-tight text-[color:var(--brand-space)]">
              {block.content}
            </h2>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={`list-${index}`} className="list-disc space-y-2 pl-6 marker:text-[color:var(--brand-red)]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered") {
          return (
            <p key={`${block.content}-${index}`} className="border-l-2 border-[color:var(--brand-red)] pl-4">
              {block.content}
            </p>
          );
        }

        return <p key={`${block.content}-${index}`}>{block.content}</p>;
      })}
    </div>
  );
}
