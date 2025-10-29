import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("mostra status do workspace e ações rápidas", () => {
    render(<Header />);

    expect(screen.getByText("Workspace ativo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Central de operacoes Adsmagic" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Campanhas")).toBeInTheDocument();
    expect(screen.getByText("128 ativas")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Nova campanha" }),
    ).toBeInTheDocument();
  });
});
