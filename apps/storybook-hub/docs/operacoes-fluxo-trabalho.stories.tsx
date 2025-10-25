import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Operacoes/Fluxo de Trabalho",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <h1>Fluxo de Trabalho</h1>
          <h2>Ambiente local</h2>
          <ol>
            <li>`npm install`</li>
            <li>`npm run dev:react`, `npm run dev:vue`, `npm run dev`</li>
            <li>`npm run dev:legacy` para comparar com HTML</li>
          </ol>
          <h2>Scripts chave</h2>
          <table>
            <thead>
              <tr>
                <th>Script</th>
                <th>Descricao</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>`npm run dev`</td>
                <td>Hub Storybook (6006)</td>
              </tr>
              <tr>
                <td>`npm run dev:react`</td>
                <td>Storybook React (6008)</td>
              </tr>
              <tr>
                <td>`npm run dev:vue`</td>
                <td>Storybook Vue (7007)</td>
              </tr>
              <tr>
                <td>`npm run build`</td>
                <td>Build estatico do hub</td>
              </tr>
            </tbody>
          </table>
          <h2>Automacao sugerida</h2>
          <ul>
            <li>CI: install ? lint ? test ? build</li>
            <li>CD: publicar Storybook e smoke Playwright</li>
            <li>Release: SemVer + changelog</li>
          </ul>
          <h2>Checklist de PR</h2>
          <ul>
            <li>Storybooks sobem sem erros</li>
            <li>Lint/Test verdes</li>
            <li>Docs atualizadas</li>
            <li>Evidencias visuais anexadas</li>
            <li>Rollback documentado</li>
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
