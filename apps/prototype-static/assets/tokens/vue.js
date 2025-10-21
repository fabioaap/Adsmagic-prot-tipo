import {
  designTokens,
  applyTokensToElement,
  toCSSVariables,
  flattenTokens,
  getToken,
} from "./index.js";

/**
 * Cria um plugin Vue que injeta tokens como provide/inject + CSS variables.
 * @param {{ prefix?: string, target?: HTMLElement | (() => HTMLElement | null) }} [options]
 */
export function createDesignSystemPlugin(options = {}) {
  const { prefix, target } = options;

  return {
    install(app) {
      const vars = toCSSVariables({ prefix });
      app.config.globalProperties.$tokens = designTokens;
      app.provide("designTokens", designTokens);
      app.provide("designTokensGet", getToken);

      if (typeof window !== "undefined") {
        const element =
          typeof target === "function"
            ? target() ?? document.documentElement
            : target ?? document.documentElement;

        applyTokensToElement(element, { prefix });
      }

      app.mixin({
        computed: {
          $tokenMap() {
            return vars;
          },
        },
      });
    },
  };
}

export const vueTokens = {
  tokens: designTokens,
  get: getToken,
  flatten: flattenTokens,
  cssVariables: (options) => toCSSVariables(options),
  plugin: createDesignSystemPlugin,
};

export default vueTokens;
