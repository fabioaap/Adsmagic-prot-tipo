import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./DataTable";

describe("DataTable", () => {
  it("lista campanhas e apresenta status formatado", () => {
    render(<DataTable />);

    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    // 1 header + 4 dados
    expect(rows).toHaveLength(5);

    expect(
      within(table).getByText("Always-on Leads Latam"),
    ).toBeInTheDocument();
    expect(within(table).getAllByText("Ativa")).toHaveLength(2);
    expect(within(table).getByText("R$ 32.000")).toBeInTheDocument();
    expect(within(table).getByText("ha 2h")).toBeInTheDocument();
  });
});
