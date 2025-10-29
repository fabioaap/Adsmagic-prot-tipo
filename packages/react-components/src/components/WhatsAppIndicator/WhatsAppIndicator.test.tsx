import { render, screen } from "@testing-library/react";
import { WhatsAppIndicator } from "./WhatsAppIndicator";
import { expect, test } from "vitest";

test("renders title and value", () => {
  render(
    <WhatsAppIndicator
      title="Tempo Médio"
      value="2h 15m"
    />
  );
  expect(screen.getByText("Tempo Médio")).toBeInTheDocument();
  expect(screen.getByText("2h 15m")).toBeInTheDocument();
});

test("renders subtitle when provided", () => {
  render(
    <WhatsAppIndicator
      title="Tempo Médio"
      value="2h 15m"
      subtitle="Média dos últimos 7 dias"
    />
  );
  expect(screen.getByText("Média dos últimos 7 dias")).toBeInTheDocument();
});

test("renders trend with correct color", () => {
  render(
    <WhatsAppIndicator
      title="Tempo Médio"
      value="2h 15m"
      trend={{ value: "-15min", type: "positive" }}
    />
  );
  const trendElement = screen.getByText("-15min");
  expect(trendElement).toHaveStyle({ color: "#059669" });
});