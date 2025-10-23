import type { Meta, StoryObj } from "@storybook/vue3";
import Card from "./Card.vue";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Título do card" },
    value: { control: "text", description: "Valor principal" },
    meta: { control: "text", description: "Informação adicional" },
    caption: { control: "text", description: "Descrição ou contexto" },
    footerNote: { control: "text", description: "Nota de rodapé" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Total de Leads",
    value: "1.248",
    meta: "↑ 12% vs. mês anterior",
    caption: "Considerando todas as fontes ativas",
    footerNote: "Atualizado há 5 minutos",
  },
};

export const Simple: Story = {
  args: {
    title: "Conversões",
    value: "342",
  },
};

export const WithCaption: Story = {
  args: {
    title: "ROI Médio",
    value: "R$ 4,80",
    caption: "Para cada R$ 1,00 investido em anúncios",
  },
};

export const Complete: Story = {
  args: {
    title: "Taxa de Conversão",
    value: "18,5%",
    meta: "↑ 3,2pp vs. semana passada",
    caption: "Meta mensal: 20%",
    footerNote: "Última atualização: hoje às 14:32",
  },
};
