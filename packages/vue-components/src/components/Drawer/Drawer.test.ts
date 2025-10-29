import { render } from "@testing-library/vue";
import { expect, test } from "vitest";
import DsDrawer from "./Drawer.vue";

test("renders drawer when open", () => {
  const { getByText } = render(DsDrawer, {
    props: { isOpen: true },
    slots: { default: "<div>Test Content</div>" },
  });
  expect(getByText("Test Content")).toBeInTheDocument();
});

test("does not render drawer when closed", () => {
  const { queryByText } = render(DsDrawer, {
    props: { isOpen: false },
    slots: { default: "<div>Test Content</div>" },
  });
  expect(queryByText("Test Content")).toBeNull();
});

test("applies correct size", () => {
  const { getByText } = render(DsDrawer, {
    props: { isOpen: true, size: "lg" },
    slots: { default: "<div>Test</div>" },
  });
  const drawer = getByText("Test").parentElement;
  expect(drawer).toHaveStyle({ width: "500px" });
});

test("renders overlay when variant is overlay", () => {
  render(DsDrawer, {
    props: { isOpen: true, variant: "overlay" },
    slots: { default: "<div>Test</div>" },
  });
  expect(document.querySelector('[style*="background-color: rgba(0, 0, 0, 0.5)"]')).toBeInTheDocument();
});