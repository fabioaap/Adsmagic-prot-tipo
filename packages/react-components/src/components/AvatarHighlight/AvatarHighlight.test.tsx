import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AvatarHighlight } from "./AvatarHighlight";

describe("AvatarHighlight", () => {
  it("exibe informações principais da liderança", () => {
    render(<AvatarHighlight />);

    expect(
      screen.getByText("Veronica Guedes - Head de Growth"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Responsavel pelos squads de aquisicao e expansao Latam."),
    ).toBeInTheDocument();
    expect(screen.getByText("32 lancamentos entregues")).toBeInTheDocument();
  });
});
