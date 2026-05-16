import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import BrandMark from "./brand-mark";

describe("brand mark", () => {
  it("renders the symbolic brand mark", () => {
    render(<BrandMark />);

    expect(screen.getByRole("img", { name: /julio vela tech solutions/i })).toBeInTheDocument();
  });

  it("does not render publishing controls", () => {
    render(<BrandMark />);
    expect(screen.queryByRole("button", { name: /publish/i })).not.toBeInTheDocument();
  });
});
