import { describe, expect, it } from "vitest";
import { isBlogStatusVisible, isProductionContentEnvironment } from "./blog";

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
});
