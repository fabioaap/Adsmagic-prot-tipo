import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../docs/**/*.mdx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  refs: {
    react: {
      title: "React Components",
      url: "http://localhost:6007"
    },
    vue: {
      title: "Vue Components",
      url: "http://localhost:7007"
    }
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@adsmagic/tokens/css": resolve(__dirname, "../../../packages/tokens/css"),
      "@adsmagic/tokens": resolve(__dirname, "../../../packages/tokens/src"),
    };
    return config;
  }
};

export default config;
