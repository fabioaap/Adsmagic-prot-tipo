import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("exibe grupos de navegação e item ativo", () => {
    render(<Sidebar />);

    expect(screen.getByText("Adsmagic Platform")).toBeInTheDocument();
    expect(screen.getByText("Principal")).toBeInTheDocument();
    expect(screen.getByText("Insights")).toBeInTheDocument();
    expect(screen.getByText("Sistema")).toBeInTheDocument();
    const activeItem = screen.getByText("Visao geral");
    expect(activeItem).toBeInTheDocument();
  });
});
