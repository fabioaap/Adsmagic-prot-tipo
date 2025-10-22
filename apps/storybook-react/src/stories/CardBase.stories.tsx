import type { Meta, StoryObj } from "@storybook/react";
import { CardBase, StatusDropdown, Button } from "@adsmagic/react";
import { Settings } from "lucide-react";

const meta: Meta<typeof CardBase> = {
  title: "Componentes/Conteudo/Card base",
  component: CardBase,
};

export default meta;

type Story = StoryObj<typeof CardBase>;

export const Default: Story = {
  args: {
    title: 'Budget mensal',
    value: 'R$ 320.000',
    meta: <span>Disponivel: <strong>R$ 89.120</strong></span>,
    caption: 'Distribuicao automatica do orcamento com base na performance das campanhas.',
    footerNote: 'Atualizado ha 2 horas',
    actions: (
      <Button size="sm" variant="ghost" leadingIcon={<Settings size={14} />}>Configurar</Button>
    ),
  },
};

export const ComDropdown: Story = {
  render: () => (
    <CardBase
      title="Status do lancamento"
      value="Squad ADS Magic"
      caption="Controle o andamento do go-live e sinalize dependencias para o time de produto."
      footerNote="Checklist sincronizado com Monday"
      meta={<StatusDropdown />}
    />
  ),
};


