import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SummaryCardGrid } from "./SummaryCardGrid";

describe("SummaryCardGrid", () => {
  it("renderiza cards resumindo métricas chave", () => {
    render(<SummaryCardGrid />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(4);
    expect(screen.getByText("Receita gerada")).toBeInTheDocument();
    expect(screen.getByText("R$ 482k")).toBeInTheDocument();
    expect(screen.getByText("+24% vs ultima semana")).toBeInTheDocument();
  });
});
