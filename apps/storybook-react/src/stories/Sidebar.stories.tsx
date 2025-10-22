import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "@adsmagic/react";

const meta: Meta<typeof Sidebar> = {
  title: "Componentes/Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Navegacao: Story = {
  render: () => (
    <div style={{ padding: '2rem', background: '#f8fafc' }}>
      <Sidebar />
    </div>
  ),
};
