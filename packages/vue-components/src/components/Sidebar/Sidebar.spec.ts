import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Sidebar from "./Sidebar.vue";

describe("Sidebar (Vue)", () => {
  it("exibe grupos de navegação padrão", () => {
    render(Sidebar);

    expect(screen.getByText("Adsmagic Platform")).toBeTruthy();
    expect(screen.getByText("Principal")).toBeTruthy();
    expect(screen.getByText("Insights")).toBeTruthy();
    expect(screen.getByText("Sistema")).toBeTruthy();
    expect(screen.getByText(/Vis.*o geral/i)).toBeTruthy();
    expect(
      screen.getByText(/Workspace premium com sincronizacao ativa/i),
    ).toBeTruthy();
  });
});
