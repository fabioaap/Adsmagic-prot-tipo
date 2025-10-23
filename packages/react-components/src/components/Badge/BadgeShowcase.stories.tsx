import type { Meta, StoryObj } from "@storybook/react";
import { BadgeShowcase } from "./BadgeShowcase";

const meta = {
  title: "Components/BadgeShowcase",
  component: BadgeShowcase,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BadgeShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
