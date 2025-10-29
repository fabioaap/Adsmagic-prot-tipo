import { render } from "@testing-library/vue";
import { expect, test } from "vitest";
import DsWhatsAppIndicator from "./WhatsAppIndicator.vue";

test("renders title and value", () => {
  const { getByText } = render(DsWhatsAppIndicator, {
    props: {
      title: "Tempo Médio",
      value: "2h 15m",
    },
  });
  expect(getByText("Tempo Médio")).toBeInTheDocument();
  expect(getByText("2h 15m")).toBeInTheDocument();
});

test("renders subtitle when provided", () => {
  const { getByText } = render(DsWhatsAppIndicator, {
    props: {
      title: "Tempo Médio",
      value: "2h 15m",
      subtitle: "Média dos últimos 7 dias",
    },
  });
  expect(getByText("Média dos últimos 7 dias")).toBeInTheDocument();
});

test("renders trend with correct color", () => {
  const { getByText } = render(DsWhatsAppIndicator, {
    props: {
      title: "Tempo Médio",
      value: "2h 15m",
      trend: { value: "-15min", type: "positive" },
    },
  });
  const trendElement = getByText("-15min");
  expect(trendElement).toHaveStyle({ color: "#059669" });
});