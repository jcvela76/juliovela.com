import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import MarkdownBody from "./markdown-body";

describe("markdown body", () => {
  it("renders dash-prefixed markdown lines as a semantic unordered list", () => {
    render(
      <MarkdownBody
        body={`Intro paragraph.

- First item
- Second item

Closing paragraph.`}
      />,
    );

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("First item")).toBeInTheDocument();
    expect(screen.getByText("Second item")).toBeInTheDocument();
    expect(screen.queryByText("- First item")).not.toBeInTheDocument();
  });
});
