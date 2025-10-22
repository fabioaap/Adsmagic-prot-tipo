import type { Meta, StoryObj } from "@storybook/vue3";
import { DsButton } from "@adsmagic/vue";

const meta: Meta<typeof DsButton> = {
  title: "Componentes/Inputs/Button",
  component: DsButton,
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "md"
  }
};

export default meta;

type Story = StoryObj<typeof DsButton>;

export const Primario: Story = {
  render: (args) => ({
    components: { DsButton },
    setup() {
      return { args };
    },
    template: '<DsButton v-bind="args">Criar campanha</DsButton>'
  })
};

export const Secundario: Story = {
  args: { variant: "secondary" },
  render: (args) => ({
    components: { DsButton },
    setup() {
      return { args };
    },
    template: '<DsButton v-bind="args">Sincronizar</DsButton>'
  })
};

export const Fantasma: Story = {
  args: { variant: "ghost" },
  render: (args) => ({
    components: { DsButton },
    setup() {
      return { args };
    },
    template: '<DsButton v-bind="args">Ver detalhes</DsButton>'
  })
};

export const ComSlots: Story = {
  render: (args) => ({
    components: { DsButton },
    setup() {
      return { args };
    },
    template: `
      <DsButton v-bind="args">
        <template #leading>??</template>
        Exportar
        <template #trailing>?</template>
      </DsButton>
    `
  })
};
