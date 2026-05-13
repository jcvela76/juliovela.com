import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import BrandMark from "./brand-mark";

describe("brand mark", () => {
  it("renders the symbolic brand mark", () => {
    render(<BrandMark />);

    expect(screen.getByText("://")).toBeInTheDocument();
    expect(screen.getByText("JULIO VELA")).toBeInTheDocument();
    expect(screen.getByText("TECH SOLUTIONS")).toBeInTheDocument();
  });

  it("does not render publishing controls", () => {
    render(<BrandMark />);
    expect(screen.queryByRole("button", { name: /publish/i })).not.toBeInTheDocument();
  });
});
