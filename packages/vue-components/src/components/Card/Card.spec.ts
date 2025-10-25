import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Card from "./Card.vue";

describe("Card (Vue)", () => {
  it("renderiza props principais e slots", () => {
    render(Card, {
      props: {
        title: "Velocidade de resposta",
        value: "15 min",
        meta: "Meta: 20 min",
        caption: "Reducao de 5 min versus a ultima semana.",
        footerNote: "Atualizado ha 3 horas",
      },
      slots: {
        actions: '<button type="button">Detalhes</button>',
      },
    });

    expect(screen.getByText("Velocidade de resposta")).toBeTruthy();
    expect(screen.getByText("15 min")).toBeTruthy();
    expect(screen.getByText("Meta: 20 min")).toBeTruthy();
    expect(
      screen.getByText("Reducao de 5 min versus a ultima semana."),
    ).toBeTruthy();
    expect(screen.getByText("Atualizado ha 3 horas")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Detalhes" })).toBeTruthy();
  });
});
