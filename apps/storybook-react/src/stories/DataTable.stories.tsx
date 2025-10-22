import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@adsmagic/react";

const meta: Meta<typeof DataTable> = {
  title: "Componentes/Conteudo/Tabela",
  component: DataTable,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const VisaoGeral: Story = {
  render: () => (
    <div style={{ padding: '2rem', background: '#f8fafc' }}>
      <DataTable />
    </div>
  ),
};
