import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import AvatarHighlight from "./AvatarHighlight.vue";

describe("AvatarHighlight (Vue)", () => {
  it("exibe dados básicos da liderança", () => {
    render(AvatarHighlight);

    expect(
      screen.getByText("Veronica Guedes - Head de Growth"),
    ).toBeTruthy();
    expect(
      screen.getByText("Responsavel pelos squads de aquisicao e expansao Latam."),
    ).toBeTruthy();
    expect(screen.getByText("veronica@adsmagic.com")).toBeTruthy();
    expect(screen.getByText("32 lancamentos entregues")).toBeTruthy();
  });
});
