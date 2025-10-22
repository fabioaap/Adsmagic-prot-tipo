import type { Meta, StoryObj } from "@storybook/react";
import { BadgeShowcase } from "@adsmagic/react";

const meta: Meta<typeof BadgeShowcase> = {
  title: "Componentes/Conteudo/Badges",
  component: BadgeShowcase,
};

export default meta;

type Story = StoryObj<typeof BadgeShowcase>;

export const Colecao: Story = {
  render: () => <BadgeShowcase />,
};
