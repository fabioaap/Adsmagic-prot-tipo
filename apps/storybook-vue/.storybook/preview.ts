import type { Preview } from "@storybook/vue3";
import "@adsmagic/tokens/css/base.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: "centered"
  }
};

export default preview;
