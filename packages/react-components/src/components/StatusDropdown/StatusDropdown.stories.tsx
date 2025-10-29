import type { Meta, StoryObj } from "@storybook/react";
import { StatusDropdown } from "./StatusDropdown";

const meta = {
  title: "Components/StatusDropdown",
  component: StatusDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  render: () => {
    return (
      <div style={{ minHeight: "300px", display: "flex", alignItems: "flex-start", padding: "20px" }}>
        <StatusDropdown />
      </div>
    );
  },
};
