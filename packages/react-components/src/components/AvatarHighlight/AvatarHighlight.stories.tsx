import type { Meta, StoryObj } from "@storybook/react";
import { AvatarHighlight } from "./AvatarHighlight";

const meta = {
  title: "Components/AvatarHighlight",
  component: AvatarHighlight,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    role: { control: "text" },
    avatarUrl: { control: "text" },
  },
} satisfies Meta<typeof AvatarHighlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Dra. Letícia Lopes",
    role: "Marketing Consultant",
    avatarUrl: "https://i.pravatar.cc/150?u=leticia",
  },
};

export const WithoutImage: Story = {
  args: {
    name: "André Gomes",
    role: "Developer",
    avatarUrl: "",
  },
};
