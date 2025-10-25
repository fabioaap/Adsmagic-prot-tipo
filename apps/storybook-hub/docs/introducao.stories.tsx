import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Guia/Visao Geral",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["docsPage"],
};

export default meta;
type Story = StoryObj;

const DocPage = () => (
  <>
    <h1>Design System Adsmagic</h1>
    <p>
      Hub unificado que concentra tokens, bibliotecas de componentes e
      processos operacionais do design system Adsmagic.
    </p>

    <h2>Proposito</h2>
    <ul>
      <li>Garantir linguagem visual unificada em qualquer front-end.</li>
      <li>Servir como ponto de entrada para devs, designers e QA.</li>
      <li>Acelerar migracao do prototipo legado para componentes modulares.</li>
    </ul>

    <h2>O que voce encontra aqui</h2>
    <table>
      <thead>
        <tr>
          <th>Secao</th>
          <th>Quando consultar</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Guia de tokens</td>
          <td>Aplicar cores, tipografia e espacamentos oficiais</td>
          <td>
            <a href="?path=/docs/guia-tokens--docs">Guia/Tokens</a>
          </td>
        </tr>
        <tr>
          <td>Biblioteca React</td>
          <td>Consumir ou evoluir componentes React</td>
          <td>
            <a href="?path=/docs/biblioteca-react-componentes--docs">
              Biblioteca React/Componentes
            </a>
          </td>
        </tr>
        <tr>
          <td>Biblioteca Vue</td>
          <td>Consumir ou evoluir componentes Vue 3</td>
          <td>
            <a href="?path=/docs/biblioteca-vue-componentes--docs">
              Biblioteca Vue/Componentes
            </a>
          </td>
        </tr>
        <tr>
          <td>Operacoes - Workflow</td>
          <td>Subir ambientes, buildar ou publicar</td>
          <td>
            <a href="?path=/docs/operacoes-fluxo-de-trabalho--docs">
              Operacoes/Fluxo de Trabalho
            </a>
          </td>
        </tr>
        <tr>
          <td>Operacoes - Qualidade</td>
          <td>Planejar testes, auditorias ou monitoracao</td>
          <td>
            <a href="?path=/docs/operacoes-qualidade-e-testes--docs">
              Operacoes/Qualidade e Testes
            </a>
          </td>
        </tr>
        <tr>
          <td>Referencias - Migracao</td>
          <td>Migrar telas do HTML legado</td>
          <td>
            <a href="?path=/docs/referencias-migracao-do-prototipo--docs">
              Referencias/Migracao do Prototipo
            </a>
          </td>
        </tr>
        <tr>
          <td>Referencias - Governanca</td>
          <td>Contribuicao e diretrizes</td>
          <td>
            <a href="?path=/docs/referencias-governanca-e-contribuicao--docs">
              Referencias/Governanca e Contribuicao
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Topologia do workspace</h2>
    <pre>
      <code>{`packages/
  tokens/
  react-components/
  vue-components/

apps/
  storybook-react/
  storybook-vue/
  storybook-hub/
  prototype-static/`}</code>
    </pre>

    <h2>Quickstart</h2>
    <pre>
      <code>{`.\\start-all-storybooks.ps1`}</code>
    </pre>
    <ul>
      <li>
        Hub: <a href="http://localhost:6006/">http://localhost:6006/</a>
      </li>
      <li>
        React: <a href="http://localhost:6008/">http://localhost:6008/</a>
      </li>
      <li>
        Vue: <a href="http://localhost:7007/">http://localhost:7007/</a>
      </li>
    </ul>

    <h2>Responsabilidades dos pacotes</h2>
    <ul>
      <li>
        <code>@adsmagic/tokens</code>: tokens em CSS e TypeScript.
      </li>
      <li>
        <code>@adsmagic/react</code>: componentes React com stories, testes e builds.
      </li>
      <li>
        <code>@adsmagic/vue</code>: paridade Vue 3 com slots e testes.
      </li>
    </ul>

    <h2>Como usar o Hub</h2>
    <ol>
      <li>Consulte tokens antes de definir novos estilos.</li>
      <li>Veja props e exemplos nas bibliotecas React/Vue.</li>
      <li>Siga fluxos de operacao para build e release.</li>
      <li>Cheque o checklist de qualidade.</li>
      <li>Documente decisoes na secao de governanca.</li>
    </ol>
  </>
);

export const Overview: Story = {
  name: "Docs",
  parameters: {
    docs: {
      page: DocPage,
    },
  },
  render: () => null,
};
