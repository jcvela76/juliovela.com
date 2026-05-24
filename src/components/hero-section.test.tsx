import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import HeroSection from "./hero-section";

describe("hero section", () => {
  it("exposes a single semantic homepage heading without changing the logo-first design", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /julio vela tech solutions: practical technology guidance for modern builders/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /julio vela tech solutions/i })).toBeInTheDocument();
  });
});
