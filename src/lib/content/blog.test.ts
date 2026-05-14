import { describe, expect, it } from "vitest";
import { isBlogStatusVisible } from "./blog";

describe("blog visibility rules", () => {
  it("shows approved content outside production", () => {
    expect(isBlogStatusVisible("approved", "preview")).toBe(true);
    expect(isBlogStatusVisible("approved", undefined)).toBe(true);
  });

  it("hides approved content in production", () => {
    expect(isBlogStatusVisible("approved", "production")).toBe(false);
  });

  it("shows only published content in production", () => {
    expect(isBlogStatusVisible("published", "production")).toBe(true);
    expect(isBlogStatusVisible("draft", "production")).toBe(false);
    expect(isBlogStatusVisible("ready_for_review", "production")).toBe(false);
  });
});
