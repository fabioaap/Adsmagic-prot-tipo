import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Badge from "./Badge.vue";

describe("Badge (Vue)", () => {
  it("renderiza o rótulo informado", () => {
    render(Badge, {
      props: {
        label: "Campanha ativa",
      },
    });

    expect(screen.getByText("Campanha ativa")).toBeTruthy();
  });

  it("altera variante visual via prop", () => {
    render(Badge, {
      props: {
        label: "Conversao",
        variant: "success",
      },
    });

    expect(screen.getByText("Conversao")).toBeTruthy();
  });
});
