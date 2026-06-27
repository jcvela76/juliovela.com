import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { parseDraftDocument } from "@/lib/content/drafts";

const approvedBlogDir = "content/approved/blog";
const draftBlogDir = "content/drafts/blog";
const productionEnv = "production";
const productionBranch = "main";

export type BlogStatus = "draft" | "ready_for_review" | "approved" | "published" | "archived";

export type BlogPost = {
  alternateLanguageUrl: string;
  author: string;
  body: string;
  canonicalUrl: string;
  date: string;
  description: string;
  excerpt: string;
  filePath: string;
  language: string;
  ogDescription: string;
  ogTitle: string;
  routePath: string;
  seoTitle: string;
  slug: string;
  source: "approved" | "draft";
  status: BlogStatus;
  tags: string[];
  title: string;
  translationOf: string;
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

function routePathForPost(language: string, slug: string) {
  return language === "es" ? `/es/blog/${slug}` : `/blog/${slug}`;
}

function readBlogPostsFromDir(dir: string, source: BlogPost["source"]) {
  return walk(dir, [".mdx"]).map((filePath) => {
    const content = readFileSync(path.join(process.cwd(), filePath), "utf8");
    const { body, frontmatter } = parseDraftDocument(content);
    const language = stringField(frontmatter.language) || "en";
    const slug = stringField(frontmatter.slug);
    const status = stringField(frontmatter.status);

    return {
      alternateLanguageUrl: stringField(frontmatter.alternate_language_url),
      author: stringField(frontmatter.author),
      body,
      canonicalUrl: stringField(frontmatter.canonical_url),
      date: stringField(frontmatter.date),
      description: stringField(frontmatter.description),
      excerpt: stringField(frontmatter.excerpt),
      filePath,
      language,
      ogDescription: stringField(frontmatter.og_description),
      ogTitle: stringField(frontmatter.og_title),
      routePath: routePathForPost(language, slug),
      seoTitle: stringField(frontmatter.seo_title),
      slug,
      source,
      status: status as BlogStatus,
      tags: listField(frontmatter.tags),
      title: stringField(frontmatter.title),
      translationOf: stringField(frontmatter.translation_of),
    } satisfies BlogPost;
  });
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
  return readBlogPostsFromDir(approvedBlogDir, "approved")
    .filter((post) => isBlogStatusVisible(post.status, vercelEnv, gitCommitRef))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function readApprovedBlogPostsByLanguage(
  language: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  return readApprovedBlogPosts(vercelEnv, gitCommitRef).filter((post) => post.language === language);
}

export function readDraftBlogPostsByLanguage(
  language: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  if (isProductionContentEnvironment(vercelEnv, gitCommitRef)) {
    return [];
  }

  return readBlogPostsFromDir(draftBlogDir, "draft")
    .filter((post) => post.language === language)
    .filter((post) => post.status === "draft" || post.status === "ready_for_review")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function readVisibleBlogPostsByLanguage(
  language: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  return [
    ...readApprovedBlogPostsByLanguage(language, vercelEnv, gitCommitRef),
    ...readDraftBlogPostsByLanguage(language, vercelEnv, gitCommitRef),
  ].sort((a, b) => b.date.localeCompare(a.date));
}

export function findApprovedBlogPost(
  slug: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  return readApprovedBlogPosts(vercelEnv, gitCommitRef).find((post) => post.slug === slug) ?? null;
}

export function findApprovedBlogPostByLanguage(
  slug: string,
  language: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  return readApprovedBlogPostsByLanguage(language, vercelEnv, gitCommitRef).find((post) => post.slug === slug) ?? null;
}

export function findVisibleBlogPostByLanguage(
  slug: string,
  language: string,
  vercelEnv = process.env.VERCEL_ENV,
  gitCommitRef = process.env.VERCEL_GIT_COMMIT_REF,
) {
  return readVisibleBlogPostsByLanguage(language, vercelEnv, gitCommitRef).find((post) => post.slug === slug) ?? null;
}
