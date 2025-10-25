import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Biblioteca React/Componentes",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <h1>Componentes React</h1>
          <p>
            Pacote `@adsmagic/react` com estilizacao via tokens, bundler tsup e
            testes Vitest.
          </p>

          <h2>Inventario atual</h2>
          <table>
            <thead>
              <tr>
                <th>Componente</th>
                <th>Descricao</th>
                <th>Casos de uso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Button</td>
                <td>CTA pill com variantes e tamanhos</td>
                <td>Acoes primarias/ secundarias</td>
              </tr>
              <tr>
                <td>AvatarHighlight</td>
                <td>Avatar destacado com badge e meta info</td>
                <td>Destaque de liderancas</td>
              </tr>
              <tr>
                <td>BadgeShowcase</td>
                <td>Badges tematicos baseados em tokens</td>
                <td>Status, filtros, categorias</td>
              </tr>
              <tr>
                <td>CardBase</td>
                <td>Cartoes com header/footer opcionais</td>
                <td>Metrica e resumos</td>
              </tr>
              <tr>
                <td>DataTable</td>
                <td>Tabela com status e acoes</td>
                <td>Listagens operacionais</td>
              </tr>
              <tr>
                <td>Header</td>
                <td>Hero do dashboard com estatisticas</td>
                <td>Cabecalho principal</td>
              </tr>
              <tr>
                <td>Sidebar</td>
                <td>Navegacao lateral com grupos</td>
                <td>Layout do workspace</td>
              </tr>
              <tr>
                <td>StatusDropdown</td>
                <td>Dropdown inline com estados chave</td>
                <td>Fluxos de alteracao rapida</td>
              </tr>
              <tr>
                <td>SummaryCardGrid</td>
                <td>Grid responsivo de metricas</td>
                <td>Dashboard executivo</td>
              </tr>
            </tbody>
          </table>

          <h2>Fluxo para novos componentes</h2>
          <ol>
            <li>Criar pasta em `src/components/Nome`.</li>
            <li>Implementar com tokens e estilos inline.</li>
            <li>Adicionar story e testes.</li>
            <li>Exportar em `src/index.ts`.</li>
            <li>Rodar lint, test, build do workspace.</li>
          </ol>
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
