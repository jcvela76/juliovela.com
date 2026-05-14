import { describe, expect, it } from "vitest";
import { parseDraftDocument } from "./drafts";

describe("draft document parsing", () => {
  it("parses frontmatter, lists, and body content", () => {
    const parsed = parseDraftDocument(`---
title: "Example Draft"
status: "draft"
tags:
  - "AI tools"
  - "workflows"
approved_by: ""
---

# Example Draft

Body copy.`);

    expect(parsed.frontmatter.title).toBe("Example Draft");
    expect(parsed.frontmatter.status).toBe("draft");
    expect(parsed.frontmatter.approved_by).toBe("");
    expect(parsed.frontmatter.tags).toEqual(["AI tools", "workflows"]);
    expect(parsed.body).toContain("# Example Draft");
  });
});
