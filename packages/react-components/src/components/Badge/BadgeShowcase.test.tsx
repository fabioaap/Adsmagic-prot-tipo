import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BadgeShowcase } from "./BadgeShowcase";

describe("BadgeShowcase", () => {
  it("renderiza todas as variantes de badge esperadas", () => {
    render(<BadgeShowcase />);

    expect(screen.getByText("Campanha ativa")).toBeInTheDocument();
    expect(screen.getByText("Conversao +12%")).toBeInTheDocument();
    expect(screen.getByText("Em moderacao")).toBeInTheDocument();
    expect(screen.getByText("Pendencia SLA")).toBeInTheDocument();
  });
});
