import { render, screen } from "@testing-library/react";
import { Drawer } from "./Drawer";
import { expect, test } from "vitest";

test("renders drawer when open", () => {
  render(
    <Drawer isOpen={true}>
      <div>Test Content</div>
    </Drawer>
  );
  expect(screen.getByText("Test Content")).toBeInTheDocument();
});

test("does not render drawer when closed", () => {
  const { container } = render(
    <Drawer isOpen={false}>
      <div>Test Content</div>
    </Drawer>
  );
  expect(container.firstChild).toBeNull();
});

test("applies correct size", () => {
  render(
    <Drawer isOpen={true} size="lg">
      <div>Test</div>
    </Drawer>
  );
  const drawer = screen.getByText("Test").parentElement;
  expect(drawer).toHaveStyle({ width: "500px" });
});

test("renders overlay when variant is overlay", () => {
  render(
    <Drawer isOpen={true} variant="overlay">
      <div>Test</div>
    </Drawer>
  );
  expect(document.querySelector('[style*="background-color: rgba(0, 0, 0, 0.5)"]')).toBeInTheDocument();
});