import type { Meta, StoryObj } from "@storybook/vue3";
import DsWhatsAppIndicator from "./WhatsAppIndicator.vue";

const meta: Meta<typeof DsWhatsAppIndicator> = {
  title: "Components/WhatsAppIndicator",
  component: DsWhatsAppIndicator,
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
type Story = StoryObj<typeof DsWhatsAppIndicator>;

export const Default: Story = {
  args: {
    title: "Tempo Médio de Resposta",
    value: "2h 15m",
    subtitle: "Média dos últimos 7 dias",
    trend: {
      value: "-15min",
      type: "positive",
    },
  },
  render: (args) => ({
    components: { DsWhatsAppIndicator },
    setup() {
      return { args };
    },
    template: `
      <DsWhatsAppIndicator v-bind="args">
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </template>
      </DsWhatsAppIndicator>
    `,
  }),
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
  render: (args) => ({
    components: { DsWhatsAppIndicator },
    setup() {
      return { args };
    },
    template: `
      <DsWhatsAppIndicator v-bind="args" />
    `,
  }),
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
  render: (args) => ({
    components: { DsWhatsAppIndicator },
    setup() {
      return { args };
    },
    template: `
      <DsWhatsAppIndicator v-bind="args" />
    `,
  }),
};