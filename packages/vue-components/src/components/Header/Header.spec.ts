import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Header from "./Header.vue";

describe("Header (Vue)", () => {
  it("apresenta status e métricas do workspace", () => {
    render(Header);

    expect(screen.getByText("Workspace ativo")).toBeTruthy();
    expect(screen.getByText(/Central de .*Adsmagic/i)).toBeTruthy();
    expect(screen.getByText(/Orquestre campanhas/i)).toBeTruthy();
    expect(screen.getByText("128 ativas")).toBeTruthy();
    expect(screen.getByText("+18% semana")).toBeTruthy();
    expect(screen.getByText("9 conectadas")).toBeTruthy();
  });
});
