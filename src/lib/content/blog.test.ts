import { describe, expect, it } from "vitest";
import {
  findVisibleBlogPostByLanguage,
  isBlogStatusVisible,
  isProductionContentEnvironment,
  readApprovedBlogPostsByLanguage,
  readDraftBlogPostsByLanguage,
} from "./blog";

describe("blog visibility rules", () => {
  it("shows approved content outside production", () => {
    expect(isBlogStatusVisible("approved", "preview")).toBe(true);
    expect(isBlogStatusVisible("approved", undefined)).toBe(true);
  });

  it("hides approved content in production on main", () => {
    expect(isBlogStatusVisible("approved", "production", "main")).toBe(false);
    expect(isBlogStatusVisible("approved", "production", undefined)).toBe(false);
  });

  it("shows approved content on non-main Vercel branch deployments", () => {
    expect(isBlogStatusVisible("approved", "production", "feature/vercel-function-size-fix")).toBe(true);
  });

  it("shows only published content in production", () => {
    expect(isBlogStatusVisible("published", "production", "main")).toBe(true);
    expect(isBlogStatusVisible("draft", "production", "main")).toBe(false);
    expect(isBlogStatusVisible("ready_for_review", "production", "main")).toBe(false);
  });

  it("detects production content environments conservatively", () => {
    expect(isProductionContentEnvironment("production", "main")).toBe(true);
    expect(isProductionContentEnvironment("production", undefined)).toBe(true);
    expect(isProductionContentEnvironment("production", "feature/example")).toBe(false);
    expect(isProductionContentEnvironment("preview", "feature/example")).toBe(false);
  });

  it("keeps English approved posts separate from published Spanish posts", () => {
    const englishPosts = readApprovedBlogPostsByLanguage("en");

    expect(englishPosts).toContainEqual(
      expect.objectContaining({
        language: "en",
        routePath: "/blog/choosing-the-right-ai-tool",
        slug: "choosing-the-right-ai-tool",
      }),
    );
    expect(englishPosts).not.toContainEqual(
      expect.objectContaining({
        language: "es",
      }),
    );
  });

  it("keeps the approved Spanish article visible in production after publication", () => {
    const spanishPosts = readApprovedBlogPostsByLanguage("es", "production", "main");

    expect(spanishPosts).toContainEqual(
      expect.objectContaining({
        canonicalUrl: "https://juliovela.com/es/blog/como-elegir-la-herramienta-ia-adecuada",
        language: "es",
        routePath: "/es/blog/como-elegir-la-herramienta-ia-adecuada",
        slug: "como-elegir-la-herramienta-ia-adecuada",
        status: "published",
        translationOf: "choosing-the-right-ai-tool",
      }),
    );
  });

  it("resolves the published Spanish article in production", () => {
    expect(
      findVisibleBlogPostByLanguage("como-elegir-la-herramienta-ia-adecuada", "es", "production", "main"),
    ).toEqual(
      expect.objectContaining({
        language: "es",
        routePath: "/es/blog/como-elegir-la-herramienta-ia-adecuada",
        status: "published",
      }),
    );
  });

  it("has no Spanish drafts after the first Spanish article publication", () => {
    expect(readDraftBlogPostsByLanguage("es", "preview", "feature/spanish-blog-preview")).toEqual([]);
  });
});
