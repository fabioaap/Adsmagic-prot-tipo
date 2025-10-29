import type { Meta, StoryObj } from "@storybook/vue3";
import DsDrawer from "./Drawer.vue";
import DsButton from "../Button/Button.vue";

const meta: Meta<typeof DsDrawer> = {
  title: "Components/Drawer",
  component: DsDrawer,
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
type Story = StoryObj<typeof DsDrawer>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    isOpen: true,
  },
  render: (args) => ({
    components: { DsDrawer, DsButton },
    setup() {
      return { args };
    },
    template: `
      <DsDrawer v-bind="args">
        <div style="padding: 1rem;">
          <h2>Drawer Content</h2>
          <p>This is the content inside the drawer.</p>
          <DsButton>Action</DsButton>
        </div>
      </DsDrawer>
    `,
  }),
};

export const Overlay: Story = {
  args: {
    variant: "overlay",
    size: "lg",
    isOpen: true,
  },
  render: (args) => ({
    components: { DsDrawer },
    setup() {
      return { args };
    },
    template: `
      <DsDrawer v-bind="args">
        <div style="padding: 1rem;">
          <h2>Overlay Drawer</h2>
          <p>This drawer has an overlay background.</p>
        </div>
      </DsDrawer>
    `,
  }),
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
  render: (args) => ({
    components: { DsDrawer },
    setup() {
      return { args };
    },
    template: `
      <DsDrawer v-bind="args">
        <div>Hidden content</div>
      </DsDrawer>
    `,
  }),
};