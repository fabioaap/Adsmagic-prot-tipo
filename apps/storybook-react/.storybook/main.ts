import type { StorybookConfig } from "@storybook/react-vite";
import { fileURLToPath } from "url";

const reactSrc = fileURLToPath(new URL("../../../packages/react-components/src", import.meta.url));
const tokensSrc = fileURLToPath(new URL("../../../packages/tokens/src", import.meta.url));
const tokensCss = fileURLToPath(new URL("../../../packages/tokens/css", import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)", "../../../packages/react-components/src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@adsmagic/react": reactSrc,
      "@adsmagic/tokens/css": tokensCss,
      "@adsmagic/tokens": tokensSrc,
    };
    return config;
  },
};

export default config;
