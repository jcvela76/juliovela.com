import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import ContentSection from "./content-section";

describe("content section", () => {
  it("renders linked insight items when a section item has an href", () => {
    render(
      <ContentSection
        eyebrow="04 / Insights"
        id="insights"
        items={[
          {
            label: "Choosing the Right AI Tool",
            href: "/blog/choosing-the-right-ai-tool",
            meta: "Published guide",
          },
        ]}
        summary="Published articles and practical notes."
        theme="graphite"
        title="Field notes for practical technology work."
      />,
    );

    expect(screen.getByRole("link", { name: /choosing the right ai tool published guide/i })).toHaveAttribute(
      "href",
      "/blog/choosing-the-right-ai-tool",
    );
  });
});
