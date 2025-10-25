import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Biblioteca Vue/Componentes",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <h1>Componentes Vue 3</h1>
          <p>
            Pacote `@adsmagic/vue` com <code>&lt;script setup&gt;</code>, Vitest e Testing Library Vue.
          </p>
          <h2>Inventario</h2>
          <ul>
            <li>Button, AvatarHighlight, Badge, Card</li>
            <li>DataTable, Header, Sidebar, StatusDropdown</li>
            <li>SummaryCardGrid com paridade React</li>
          </ul>
          <h2>Fluxo para novos componentes</h2>
          <ol>
            <li>Implementar em `src/components/Nome/Nome.vue`.</li>
            <li>Adicionar story e teste (`Nome.spec.ts`).</li>
            <li>Exportar no `index.ts` do pacote.</li>
            <li>Rodar lint/test/build do workspace.</li>
          </ol>
          <h2>Notas</h2>
          <ul>
            <li>Tokens compartilhados via `@adsmagic/tokens`.</li>
            <li>Preferir slots nomeados para composicao.</li>
            <li>Planejar wrappers Nuxt quando necessario.</li>
          </ul>
        </>
      ),
    },
  },
  tags: ["docsPage"],
};

export default meta;
type Story = StoryObj;

export const Guia: Story = {
  name: "Docs",
  render: () => null,
};
