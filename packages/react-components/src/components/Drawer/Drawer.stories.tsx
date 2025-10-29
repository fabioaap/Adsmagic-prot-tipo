import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "overlay"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isOpen: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    isOpen: true,
    children: (
      <div style={{ padding: "1rem" }}>
        <h2>Drawer Content</h2>
        <p>This is the content inside the drawer.</p>
        <Button>Action</Button>
      </div>
    ),
  },
};

export const Overlay: Story = {
  args: {
    variant: "overlay",
    size: "lg",
    isOpen: true,
    children: (
      <div style={{ padding: "1rem" }}>
        <h2>Overlay Drawer</h2>
        <p>This drawer has an overlay background.</p>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    children: <div>Hidden content</div>,
  },
};