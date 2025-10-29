import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "./Button.vue";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button Primary</Button>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button Secondary</Button>',
  }),
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button Ghost</Button>',
  }),
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Small Button</Button>',
  }),
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Disabled Button</Button>',
  }),
};

export const WithSlots: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <template #leading>→</template>
        Button with Icons
        <template #trailing>←</template>
      </Button>
    `,
  }),
};
