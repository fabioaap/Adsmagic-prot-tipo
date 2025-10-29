import type { Meta, StoryObj } from "@storybook/react";
import { SummaryCardGrid } from "@adsmagic/react";

const meta: Meta<typeof SummaryCardGrid> = {
  title: "Componentes/Conteudo/Card de resumo",
  component: SummaryCardGrid,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof SummaryCardGrid>;

export const Painel: Story = {
  render: () => (
    <div style={{ padding: '2rem', background: '#f8fafc' }}>
      <SummaryCardGrid />
    </div>
  ),
};
