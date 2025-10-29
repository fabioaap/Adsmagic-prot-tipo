import type { Meta, StoryObj } from "@storybook/react";
import { AvatarHighlight } from "@adsmagic/react";

const meta: Meta<typeof AvatarHighlight> = {
  title: "Componentes/Feedback/Avatar destacado",
  component: AvatarHighlight,
};

export default meta;

type Story = StoryObj<typeof AvatarHighlight>;

export const Perfil: Story = {
  render: () => <AvatarHighlight />,
};
