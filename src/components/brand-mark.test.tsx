import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import BrandMark from "./brand-mark";

describe("brand mark", () => {
  it("renders the symbolic brand mark", () => {
    render(<BrandMark />);

    expect(screen.getByRole("img", { name: /julio vela tech solutions/i })).toBeInTheDocument();
  });

  it("supports an inverted tone for dark section headers", () => {
    const { container } = render(<BrandMark tone="inverted" />);

    expect(within(container).getByRole("img", { name: /julio vela tech solutions/i })).toBeInTheDocument();
  });

  it("does not render publishing controls", () => {
    render(<BrandMark />);
    expect(screen.queryByRole("button", { name: /publish/i })).not.toBeInTheDocument();
  });
});
