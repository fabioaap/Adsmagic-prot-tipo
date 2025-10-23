import type { Meta, StoryObj } from "@storybook/react";
import { SummaryCardGrid } from "./SummaryCardGrid";

const meta = {
  title: "Components/SummaryCardGrid",
  component: SummaryCardGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SummaryCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
