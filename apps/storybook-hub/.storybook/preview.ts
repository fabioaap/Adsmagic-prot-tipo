import type { Preview } from "@storybook/react-vite";
import "@adsmagic/tokens/css/base.css";
import "./apple-fonts.css"; // Tipografia Apple SF Pro

const preview: Preview = {
  parameters: {
    // Backgrounds estilo Apple: Clean e minimalista
    backgrounds: {
      default: "apple-light",
      values: [
        {
          name: "apple-light",
          value: "#F5F5F7", // Apple Light Gray
        },
        {
          name: "white",
          value: "#FFFFFF", // Branco puro
        },
        {
          name: "apple-dark",
          value: "#1D1D1F", // Preto Apple
        },
        {
          name: "glass",
          value: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,245,247,0.9) 100%)",
        },
      ],
    },

    // Actions (eventos) automaticamente detectados
    actions: { argTypesRegex: "^on[A-Z].*" },

    // Controles melhorados
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Mostra controles expandidos por padrão
    },

    // Layout padrão
    layout: "padded",

    // Viewports responsivos customizados
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
        wide: {
          name: "Wide Screen",
          styles: {
            width: "1920px",
            height: "1080px",
          },
        },
      },
    },

    // Opções do Docs
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2, h3',
        title: 'Nesta página',
        disable: false,
      },
    },
  },

  // Tags globais
  tags: ["autodocs"],
};

export default preview;

