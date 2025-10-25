import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Referencias/Governanca e Contribuicao",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <h1>Governanca e Contribuicao</h1>
          <h2>Principios</h2>
          <ul>
            <li>Design system como produto.</li>
            <li>Paridade entre stacks.</li>
            <li>Tokens como fonte unica de estilo.</li>
            <li>Documentacao viva no Storybook.</li>
          </ul>
          <h2>Fluxo de contribuicao</h2>
          <ol>
            <li>Planejar com squad/design.</li>
            <li>Implementar seguindo guias.</li>
            <li>Revisar com checklist completo.</li>
            <li>Divulgar releases e changelog.</li>
          </ol>
          <h2>Discovery condicional</h2>
          <p>
            Utilize quando houver incerteza validavel e baixo custo de
            reversao. Sempre com feature flag, metrica definida e rollback.
          </p>
          <h2>Papel das squads</h2>
          <ul>
            <li>DS Core: curadoria de tokens/componentes.</li>
            <li>Squads Produto: solicitacao e validacao.</li>
            <li>QA: acessibilidade, testes, regressao visual.</li>
            <li>Platform: CI/CD e releases.</li>
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
