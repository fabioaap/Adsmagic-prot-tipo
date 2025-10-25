import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { StatusDropdown } from "./StatusDropdown";

describe("StatusDropdown", () => {
  it("permite selecionar um novo status", async () => {
    const user = userEvent.setup();
    render(<StatusDropdown />);

    const trigger = screen.getByRole("button", { name: "Pronto para subir" });
    await user.click(trigger);

    const option = screen.getByText("Revisar com cliente");
    await user.click(option);

    expect(
      screen.getByRole("button", { name: "Revisar com cliente" }),
    ).toBeInTheDocument();
  });
});
