import type { StorybookConfig } from "@storybook/vue3-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@adsmagic/vue": resolve(__dirname, "../../../packages/vue-components/src"),
      "@adsmagic/tokens/css": resolve(__dirname, "../../../packages/tokens/css"),
      "@adsmagic/tokens": resolve(__dirname, "../../../packages/tokens/src"),
    };
    return config;
  }
};

export default config;
