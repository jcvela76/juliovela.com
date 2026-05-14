import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const allowedStatuses = new Set(["idea", "draft", "ready_for_review", "approved", "published", "archived"]);
const requiredBlogFields = [
  "title",
  "seo_title",
  "description",
  "slug",
  "date",
  "status",
  "author",
  "excerpt",
  "tags",
  "linkedin_summary",
  "cover_image",
  "canonical_url",
  "og_title",
  "og_description",
  "approved_by",
  "approved_at",
];
const requiredDirs = [
  "content/topics",
  "content/drafts/blog",
  "content/drafts/linkedin",
  "content/approved/blog",
  "content/approved/linkedin",
  "content/assets/prompts",
  "content/assets/images",
];

const errors = [];
const slugGroups = new Map();

function fail(message) {
  errors.push(message);
}

function readRelative(filePath) {
  return readFileSync(path.join(root, filePath), "utf8");
}

function walk(dir, extensions) {
  const absolute = path.join(root, dir);

  if (!existsSync(absolute)) {
    return [];
  }

  return readdirSync(absolute).flatMap((entry) => {
    const absoluteEntry = path.join(absolute, entry);
    const relativeEntry = path.relative(root, absoluteEntry);
    const stats = statSync(absoluteEntry);

    if (stats.isDirectory()) {
      return walk(relativeEntry, extensions);
    }

    return extensions.some((extension) => entry.endsWith(extension)) ? [relativeEntry] : [];
  });
}

function parseFrontmatter(filePath) {
  const content = readRelative(filePath);
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    fail(`${filePath}: missing YAML frontmatter block`);
    return null;
  }

  const fields = {};
  const lines = match[1].split("\n");
  let currentListKey = null;

  for (const line of lines) {
    const listItem = line.match(/^\s+-\s+"?(.+?)"?\s*$/);

    if (listItem && currentListKey) {
      fields[currentListKey].push(listItem[1]);
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
        fields[key] = [];
        currentListKey = key;
        continue;
      }

      fields[key] = "";
      currentListKey = null;
      continue;
    }

    fields[key] = value;
    currentListKey = null;
  }

  return fields;
}

function validateStatus(filePath, frontmatter) {
  const status = frontmatter.status;

  if (!allowedStatuses.has(status)) {
    fail(`${filePath}: invalid status "${status}"`);
  }

  const hasApproval = Boolean(frontmatter.approved_by) || Boolean(frontmatter.approved_at);

  if (["idea", "draft", "ready_for_review"].includes(status) && hasApproval) {
    fail(`${filePath}: approval fields must be empty until content is approved`);
  }

  if (["approved", "published"].includes(status) && (!frontmatter.approved_by || !frontmatter.approved_at)) {
    fail(`${filePath}: approved or published content requires approved_by and approved_at`);
  }

  if (filePath.includes("/drafts/") && status === "published") {
    fail(`${filePath}: draft folders must not contain published content`);
  }
}

function validateRequiredFields(filePath, frontmatter, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in frontmatter)) {
      fail(`${filePath}: missing required frontmatter field "${field}"`);
    }
  }
}

function validateSeoFields(filePath, frontmatter) {
  if (frontmatter.seo_title && frontmatter.seo_title.length > 60) {
    fail(`${filePath}: seo_title should be 60 characters or fewer`);
  }

  if (frontmatter.description && frontmatter.description.length > 155) {
    fail(`${filePath}: description should be 155 characters or fewer`);
  }

  if (frontmatter.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(frontmatter.slug)) {
    fail(`${filePath}: slug must be lowercase kebab-case`);
  }

  if (frontmatter.canonical_url && !frontmatter.canonical_url.startsWith("https://")) {
    fail(`${filePath}: canonical_url must be empty or start with https://`);
  }
}

function trackSlug(group, filePath, frontmatter) {
  if (!frontmatter.slug) {
    return;
  }

  const key = `${group}:${frontmatter.slug}`;
  const existing = slugGroups.get(key);

  if (existing) {
    fail(`${filePath}: duplicate slug "${frontmatter.slug}" also used by ${existing}`);
    return;
  }

  slugGroups.set(key, filePath);
}

function validateApprovedBlogStatus(filePath, frontmatter) {
  if (!["approved", "published", "archived"].includes(frontmatter.status)) {
    fail(`${filePath}: approved blog folder only allows approved, published, or archived status`);
  }
}

for (const dir of requiredDirs) {
  if (!existsSync(path.join(root, dir))) {
    fail(`missing required directory: ${dir}`);
  }
}

const topicQueueExample = "content/topics/topic_queue.example.yml";

if (!existsSync(path.join(root, topicQueueExample))) {
  fail(`missing example topic queue: ${topicQueueExample}`);
} else {
  const topicQueue = readRelative(topicQueueExample);

  if (!topicQueue.includes("topics:")) {
    fail(`${topicQueueExample}: missing topics root key`);
  }

  if (!topicQueue.includes('status: "idea"')) {
    fail(`${topicQueueExample}: example topic should start with status idea`);
  }
}

for (const filePath of walk("content/drafts/blog", [".mdx"])) {
  const frontmatter = parseFrontmatter(filePath);

  if (!frontmatter) {
    continue;
  }

  validateRequiredFields(filePath, frontmatter, requiredBlogFields);
  validateStatus(filePath, frontmatter);
  validateSeoFields(filePath, frontmatter);
  trackSlug("draft-blog", filePath, frontmatter);

  if (!Array.isArray(frontmatter.tags) || frontmatter.tags.length === 0) {
    fail(`${filePath}: tags must include at least one item`);
  }
}

for (const filePath of walk("content/approved/blog", [".mdx"])) {
  const frontmatter = parseFrontmatter(filePath);

  if (!frontmatter) {
    continue;
  }

  validateRequiredFields(filePath, frontmatter, requiredBlogFields);
  validateStatus(filePath, frontmatter);
  validateSeoFields(filePath, frontmatter);
  validateApprovedBlogStatus(filePath, frontmatter);
  trackSlug("approved-blog", filePath, frontmatter);
}

for (const filePath of walk("content/drafts/linkedin", [".md"])) {
  const frontmatter = parseFrontmatter(filePath);

  if (!frontmatter) {
    continue;
  }

  validateRequiredFields(filePath, frontmatter, ["title", "slug", "date", "status", "author", "source_slug", "approved_by", "approved_at"]);
  validateStatus(filePath, frontmatter);
}

for (const filePath of walk("content/assets/prompts", [".md"])) {
  const frontmatter = parseFrontmatter(filePath);

  if (!frontmatter) {
    continue;
  }

  validateRequiredFields(filePath, frontmatter, ["title", "slug", "date", "status", "source_slug", "approved_by", "approved_at"]);
  validateStatus(filePath, frontmatter);
}

if (errors.length > 0) {
  console.error("content validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("content validation passed");
