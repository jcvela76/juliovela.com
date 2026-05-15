import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { parseDraftDocument } from "@/lib/content/drafts";

const approvedBlogDir = "content/approved/blog";
const productionEnv = "production";
const productionBranch = "main";

export type BlogStatus = "approved" | "published" | "archived";

export type BlogPost = {
  author: string;
  body: string;
  canonicalUrl: string;
  date: string;
  description: string;
  excerpt: string;
  filePath: string;
  ogDescription: string;
  ogTitle: string;
  seoTitle: string;
  slug: string;
  status: BlogStatus;
  tags: string[];
  title: string;
};

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

function stringField(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

function listField(value: string | string[] | undefined) {
  return Array.isArray(value) ? value : [];
}

export function isProductionContentEnvironment(
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  return vercelEnv === productionEnv && (!gitCommitRef || gitCommitRef === productionBranch);
}

export function isBlogStatusVisible(
  status: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  if (isProductionContentEnvironment(vercelEnv, gitCommitRef)) {
    return status === "published";
  }

  return status === "approved" || status === "published";
}

export function readApprovedBlogPosts(
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
): BlogPost[] {
  return walk(approvedBlogDir, [".mdx"])
    .map((filePath) => {
      const content = readFileSync(path.join(process.cwd(), filePath), "utf8");
      const { body, frontmatter } = parseDraftDocument(content);
      const status = stringField(frontmatter.status);

      if (!isBlogStatusVisible(status, vercelEnv, gitCommitRef)) {
        return null;
      }

      return {
        author: stringField(frontmatter.author),
        body,
        canonicalUrl: stringField(frontmatter.canonical_url),
        date: stringField(frontmatter.date),
        description: stringField(frontmatter.description),
        excerpt: stringField(frontmatter.excerpt),
        filePath,
        ogDescription: stringField(frontmatter.og_description),
        ogTitle: stringField(frontmatter.og_title),
        seoTitle: stringField(frontmatter.seo_title),
        slug: stringField(frontmatter.slug),
        status: status as BlogStatus,
        tags: listField(frontmatter.tags),
        title: stringField(frontmatter.title),
      } satisfies BlogPost;
    })
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function findApprovedBlogPost(
  slug: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  return readApprovedBlogPosts(vercelEnv, gitCommitRef).find((post) => post.slug === slug) ?? null;
}
