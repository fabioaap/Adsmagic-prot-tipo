import { render, screen, within } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import DataTable from "./DataTable.vue";

describe("DataTable (Vue)", () => {
  it("renderiza as campanhas padrão com status", () => {
    render(DataTable);

    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(5);
    expect(screen.getByText("Always-on Leads Latam")).toBeTruthy();
    expect(screen.getAllByText("Ativa")).toHaveLength(2);
    expect(screen.getByText("R$ 32.000")).toBeTruthy();
  });
});
