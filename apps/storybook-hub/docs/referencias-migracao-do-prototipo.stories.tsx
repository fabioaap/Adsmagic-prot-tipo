import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Referencias/Migracao do Prototipo",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <h1>Migracao do Prototipo HTML</h1>
          <p>
            Trilho para transportar telas do legado estatico (`apps/prototype-static`)
            para os componentes do design system.
          </p>
          <h2>Checklist</h2>
          <ul>
            <li>Mapear secoes e componentes equivalentes.</li>
            <li>Reutilizar tokens (sem valores hardcoded).</li>
            <li>Documentar novos tokens/variantes.</li>
            <li>Atualizar testes Playwright.</li>
            <li>Validar com design.</li>
          </ul>
          <h2>Status sugerido</h2>
          <table>
            <thead>
              <tr>
                <th>Pagina</th>
                <th>Framework</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dashboard (index)</td>
                <td>React</td>
                <td>Discovery</td>
              </tr>
              <tr>
                <td>Funil</td>
                <td>Vue</td>
                <td>Backlog</td>
              </tr>
              <tr>
                <td>Contatos</td>
                <td>React</td>
                <td>Backlog</td>
              </tr>
            </tbody>
          </table>
          <p>Atualize a tabela conforme o roadmap evoluir.</p>
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
