import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const nextConfigSource = readFileSync("next.config.mjs", "utf8");

describe("Next.js deployment tracing config", () => {
  it("excludes the pnpm store from traced serverless functions", () => {
    expect(nextConfigSource).toContain('experimental');
    expect(nextConfigSource).toContain('outputFileTracingExcludes');
    expect(nextConfigSource).toContain('"./.pnpm-store/**/*"');
  });

  it("includes only the content folders needed by content-backed routes", () => {
    expect(nextConfigSource).toContain('outputFileTracingIncludes');
    expect(nextConfigSource).toContain('"./content/approved/blog/**/*"');
    expect(nextConfigSource).toContain('"./content/assets/prompts/**/*"');
    expect(nextConfigSource).toContain('"./content/drafts/blog/**/*"');
    expect(nextConfigSource).toContain('"./content/drafts/linkedin/**/*"');
  });
});
