import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardBase } from "./CardBase";

describe("CardBase", () => {
  it("exibe titulo, valor e seções opcionais", () => {
    render(
      <CardBase
        title="Velocidade de resposta"
        value="15 min"
        meta={<span>Meta: 20 min</span>}
        caption="Reducao de 5 min versus a ultima semana."
        footerNote="Atualizado ha 3 horas"
        actions={<button type="button">Detalhes</button>}
      />,
    );

    expect(screen.getByText("Velocidade de resposta")).toBeInTheDocument();
    expect(screen.getByText("15 min")).toBeInTheDocument();
    expect(screen.getByText("Meta: 20 min")).toBeInTheDocument();
    expect(
      screen.getByText("Reducao de 5 min versus a ultima semana."),
    ).toBeInTheDocument();
    expect(screen.getByText("Atualizado ha 3 horas")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Detalhes" }),
    ).toBeInTheDocument();
  });
});
