import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import SummaryCardGrid from "./SummaryCardGrid.vue";

describe("SummaryCardGrid (Vue)", () => {
  it("lista cards de resumo com métricas padrão", () => {
    render(SummaryCardGrid);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(4);
    expect(screen.getByText("Receita gerada")).toBeTruthy();
    expect(screen.getByText("R$ 482k")).toBeTruthy();
    expect(screen.getByText(/24% vs/)).toBeTruthy();
  });
});
