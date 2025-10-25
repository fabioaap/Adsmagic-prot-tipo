import type { StorybookConfig } from "@storybook/react-vite";
import { fileURLToPath } from "url";

const tokensCssDir = fileURLToPath(
  new URL("../../../packages/tokens/css", import.meta.url),
);
const tokensSrcDir = fileURLToPath(
  new URL("../../../packages/tokens/src", import.meta.url),
);
const docsDir = fileURLToPath(new URL("../docs", import.meta.url));
const repoRootDir = fileURLToPath(new URL("../../..", import.meta.url));

const config: StorybookConfig = {
  stories: ["../docs/**/*.mdx", "../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  refs: {
    react: {
      title: "React Components",
      url: "http://localhost:6008"
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
      "@adsmagic/tokens/css": tokensCssDir,
      "@adsmagic/tokens": tokensSrcDir,
    };
    config.server = config.server ?? {};
    config.server.fs = config.server.fs ?? {};
    config.server.fs.allow = [
      ...(config.server.fs.allow ?? []),
      docsDir,
      tokensCssDir,
      tokensSrcDir,
      repoRootDir,
    ];
    return config;
  }
};

export default config;
