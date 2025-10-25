import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Operacoes/Qualidade e Testes",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <h1>Qualidade e Testes</h1>
          <h2>Camadas</h2>
          <ul>
            <li>Vitest: `@adsmagic/react` e `@adsmagic/vue`.</li>
            <li>Playwright: prototipo legacy e smoke do hub.</li>
            <li>ESLint: `npm run lint --workspaces`.</li>
            <li>A11y: addon habilitado em todos os Storybooks.</li>
          </ul>
          <h2>Comandos principais</h2>
          <pre>
            <code>{`npm run test
npx playwright test tests/basic.spec.js`}</code>
          </pre>
          <h2>Checklist</h2>
          <ul>
            <li>Roles/ARIA corretos</li>
            <li>Contraste AA</li>
            <li>Dependencias justificadas</li>
            <li>Resultados de testes anexados</li>
            <li>Documentacao atualizada</li>
          </ul>
          <h2>Rabos</h2>
          <p>
            Expanda cobertura, integre regressao visual e monitore metricas
            chave nos ambientes publicados.
          </p>
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
