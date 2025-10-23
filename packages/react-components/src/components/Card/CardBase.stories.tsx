import type { Meta, StoryObj } from "@storybook/react";
import { CardBase } from "./CardBase";

const meta = {
  title: "Components/CardBase",
  component: CardBase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Card title",
    },
    value: {
      control: "text",
      description: "Main value displayed",
    },
    caption: {
      control: "text",
      description: "Additional caption text",
    },
    footerNote: {
      control: "text",
      description: "Footer note text",
    },
  },
} satisfies Meta<typeof CardBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Total de Vendas",
    value: "R$ 45.231,89",
    caption: "Últimos 30 dias",
  },
};

export const WithMeta: Story = {
  args: {
    title: "Novos Leads",
    value: "2.543",
    meta: (
      <span style={{ color: "#10b981", fontWeight: 600 }}>
        ↑ 12.5%
      </span>
    ),
    caption: "Comparado ao mês anterior",
  },
};

export const WithFooter: Story = {
  args: {
    title: "Taxa de Conversão",
    value: "3.24%",
    caption: "Baseado em 10.432 visitantes",
    footerNote: "Atualizado há 5 minutos",
  },
};

export const WithActions: Story = {
  args: {
    title: "Receita Mensal",
    value: "R$ 123.456,00",
    caption: "Crescimento de 23% vs. mês anterior",
    actions: (
      <button
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          background: "white",
          cursor: "pointer",
        }}
      >
        Ver detalhes
      </button>
    ),
  },
};

export const Complete: Story = {
  args: {
    title: "Clientes Ativos",
    value: "1.234",
    meta: (
      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ color: "#10b981", fontWeight: 600 }}>↑ 8.2%</span>
        <span style={{ color: "#64748b" }}>vs. semana passada</span>
      </span>
    ),
    caption: "847 novos esta semana",
    footerNote: "Última atualização: 14:35",
    actions: (
      <button
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          border: "1px solid #3b82f6",
          borderRadius: "6px",
          background: "#eff6ff",
          color: "#3b82f6",
          cursor: "pointer",
        }}
      >
        Exportar
      </button>
    ),
  },
};
