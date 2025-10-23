import type { StorybookConfig } from "@storybook/vue3-vite";
import vuePlugin from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";

const vueSrcDir = fileURLToPath(new URL("../../../packages/vue-components/src", import.meta.url));
const tokensCssDir = fileURLToPath(new URL("../../../packages/tokens/css", import.meta.url));
const tokensSrcDir = fileURLToPath(new URL("../../../packages/tokens/src", import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)", "../../../packages/vue-components/src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  async viteFinal(config) {
    config.plugins = config.plugins ?? [];
    config.plugins.unshift(vuePlugin());

    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@adsmagic/vue": vueSrcDir,
      "@adsmagic/tokens/css": tokensCssDir,
      "@adsmagic/tokens": tokensSrcDir
    };

    return config;
  }
};

export default config;
