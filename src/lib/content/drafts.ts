import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export type DraftPreviewKind = "Blog draft" | "LinkedIn draft" | "Image prompt";

export type DraftPreviewItem = {
  body: string;
  filePath: string;
  frontmatter: Record<string, string | string[]>;
  kind: DraftPreviewKind;
  title: string;
};

const draftSources: Array<{ dir: string; extensions: string[]; kind: DraftPreviewKind }> = [
  { dir: "content/drafts/blog", extensions: [".mdx"], kind: "Blog draft" },
  { dir: "content/drafts/linkedin", extensions: [".md"], kind: "LinkedIn draft" },
  { dir: "content/assets/prompts", extensions: [".md"], kind: "Image prompt" },
];

function walk(dir: string, extensions: string[]): string[] {
  const absolute = path.join(process.cwd(), dir);

  if (!existsSync(absolute)) {
    return [];
  }

  return readdirSync(absolute).flatMap((entry) => {
    const absoluteEntry = path.join(absolute, entry);
    const relativeEntry = path.relative(process.cwd(), absoluteEntry);
    const stats = statSync(absoluteEntry);

    if (stats.isDirectory()) {
      return walk(relativeEntry, extensions);
    }

    return extensions.some((extension) => entry.endsWith(extension)) ? [relativeEntry] : [];
  });
}

export function parseDraftDocument(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { body: content.trim(), frontmatter: {} };
  }

  const [, rawFrontmatter, body] = match;
  const frontmatter: Record<string, string | string[]> = {};
  let currentListKey: string | null = null;

  for (const line of rawFrontmatter.split("\n")) {
    const listItem = line.match(/^\s+-\s+"?(.+?)"?\s*$/);

    if (listItem && currentListKey) {
      const list = frontmatter[currentListKey];

      if (Array.isArray(list)) {
        list.push(listItem[1]);
      }

      continue;
    }

    const keyValue = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);

    if (!keyValue) {
      continue;
    }

    const [, key, rawValue] = keyValue;
    const value = rawValue.trim().replace(/^"|"$/g, "");

    if (value === "") {
      if (key === "tags") {
        frontmatter[key] = [];
        currentListKey = key;
        continue;
      }

      frontmatter[key] = "";
      currentListKey = null;
      continue;
    }

    frontmatter[key] = value;
    currentListKey = null;
  }

  return { body: body.trim(), frontmatter };
}

export function readDraftPreviewItems(): DraftPreviewItem[] {
  return draftSources.flatMap(({ dir, extensions, kind }) =>
    walk(dir, extensions).map((filePath: string) => {
      const content = readFileSync(path.join(process.cwd(), filePath), "utf8");
      const { body, frontmatter } = parseDraftDocument(content);
      const title = typeof frontmatter.title === "string" ? frontmatter.title : path.basename(filePath);

      return {
        body,
        filePath,
        frontmatter,
        kind,
        title,
      };
    }),
  );
}
