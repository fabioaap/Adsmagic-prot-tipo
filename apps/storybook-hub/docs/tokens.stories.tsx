import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Guia/Tokens",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <>
          <h1>Tokens de Design</h1>
          <p>
            Valores fonte expostos em CSS e TypeScript para manter consistencia
            visual nos produtos Adsmagic.
          </p>
          <h2>Categorias principais</h2>
          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Chaves</th>
                <th>Uso recomendado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>colors</td>
                <td>slate*, primary*, indigo*, success*, danger*</td>
                <td>Bases de UI, feedbacks, estados</td>
              </tr>
              <tr>
                <td>typography</td>
                <td>familySans, size2XS..sizeXL, weight*</td>
                <td>Hierarquia e legibilidade</td>
              </tr>
              <tr>
                <td>spacing</td>
                <td>2xs, xs, sm, md, lg, xl</td>
                <td>Margens, paddings, gaps</td>
              </tr>
              <tr>
                <td>radii</td>
                <td>sm, md, lg, full</td>
                <td>Cantos arredondados</td>
              </tr>
              <tr>
                <td>shadows</td>
                <td>card, pop, pill</td>
                <td>Elevacao e enfase</td>
              </tr>
              <tr>
                <td>aliases</td>
                <td>surface, pageBackground, borderSoft...</td>
                <td>Abstracao para temas</td>
              </tr>
            </tbody>
          </table>

          <h2>Consumo em TypeScript</h2>
          <pre>
            <code>{`import { tokens } from "@adsmagic/tokens";

const buttonStyle = {
  backgroundColor: tokens.colors.primary600,
  color: tokens.colors.white,
  borderRadius: tokens.radii.full,
};`}</code>
          </pre>

          <h2>Consumo em CSS</h2>
          <pre>
            <code>{`@import "@adsmagic/tokens/css/base.css";

.badge {
  background-color: var(--color-success-100);
  color: var(--color-success-600);
}`}</code>
          </pre>

          <h2>Boas praticas</h2>
          <ul>
            <li>Evite hardcode: sempre derive de um token existente.</li>
            <li>Valide contraste com o addon A11y.</li>
            <li>Nomeie tokens por semantica (ex.: danger) antes de tons.</li>
            <li>Documente impactos ao ajustar valores.</li>
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
