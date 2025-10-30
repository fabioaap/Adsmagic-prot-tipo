import type { Meta, StoryObj } from "@storybook/vue3";
import { DsCard } from "@adsmagic/vue";

const meta: Meta<typeof DsCard> = {
  title: "Componentes/Layout/Card",
  component: DsCard,
  tags: ["autodocs"],
  args: {
    title: "Título do Card",
    content: "Conteúdo do card com informações relevantes."
  }
};

export default meta;

type Story = StoryObj<typeof DsCard>;

export const Padrao: Story = {
  render: (args) => ({
    components: { DsCard },
    setup() {
      return { args };
    },
    template: `
      <DsCard>
        <template #title>{{ args.title }}</template>
        <template #content>{{ args.content }}</template>
      </DsCard>
    `
  })
};

export const ComAcoes: Story = {
  render: (args) => ({
    components: { DsCard },
    setup() {
      return { args };
    },
    template: `
      <DsCard>
        <template #title>Card com Ações</template>
        <template #content>Este card possui ações no cabeçalho.</template>
        <template #actions>
          <button style="padding: 4px 8px; margin-right: 8px; border: 1px solid #d1d5db; border-radius: 4px; background: white;">Editar</button>
          <button style="padding: 4px 8px; border: 1px solid #d1d5db; border-radius: 4px; background: white;">Excluir</button>
        </template>
      </DsCard>
    `
  })
};

export const ComMeta: Story = {
  args: {
    meta: "Atualizado há 2 horas"
  },
  render: (args) => ({
    components: { DsCard },
    setup() {
      return { args };
    },
    template: `
      <DsCard>
        <template #title>Card com Meta</template>
        <template #content>Informações sobre vendas do mês.</template>
        <template #meta>{{ args.meta }}</template>
      </DsCard>
    `
  })
};

export const ApenasConteudo: Story = {
  render: (args) => ({
    components: { DsCard },
    setup() {
      return { args };
    },
    template: `
      <DsCard>
        <template #content>
          <p>Este card contém apenas conteúdo, sem título ou ações.</p>
          <p>Pode ser usado para seções simples de informação.</p>
        </template>
      </DsCard>
    `
  })
};