import type { Meta, StoryObj } from "@storybook/react";
import { WhatsAppIndicator } from "./WhatsAppIndicator";
import { MessageCircle } from "lucide-react";

const meta: Meta<typeof WhatsAppIndicator> = {
  title: "Components/WhatsAppIndicator",
  component: WhatsAppIndicator,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    title: {
      control: { type: "text" },
    },
    value: {
      control: { type: "text" },
    },
    subtitle: {
      control: { type: "text" },
    },
    trend: {
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WhatsAppIndicator>;

export const Default: Story = {
  args: {
    title: "Tempo Médio de Resposta",
    value: "2h 15m",
    subtitle: "Média dos últimos 7 dias",
    trend: {
      value: "-15min",
      type: "positive",
    },
    icon: <MessageCircle size={16} />,
  },
};

export const WithVariation: Story = {
  args: {
    title: "Variação de Resposta",
    value: "±45min",
    subtitle: "Desvio padrão",
    trend: {
      value: "+5min",
      type: "negative",
    },
  },
};

export const Neutral: Story = {
  args: {
    title: "Mensagens Recebidas",
    value: "1.234",
    subtitle: "Hoje",
    trend: {
      value: "0%",
      type: "neutral",
    },
  },
};