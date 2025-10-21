import { useLayoutEffect } from "react";
import {
  designTokens,
  toCSSVariables,
  applyTokensToElement,
  flattenTokens,
  getToken,
} from "./index.js";

/**
 * Hook para aplicar tokens como variáveis CSS em qualquer elemento React.
 * @param {{ prefix?: string, target?: HTMLElement | (() => HTMLElement | null) }} [options]
 */
export function useDesignTokens(options = {}) {
  const { target, prefix } = options;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const element =
      typeof target === "function"
        ? target() ?? document.documentElement
        : target ?? document.documentElement;

    const cleanup = applyTokensToElement(element, { prefix });
    return cleanup;
  }, [target, prefix]);
}

/**
 * Gera um objeto de tema plano (`{ "color.primary.600": "#2563eb", ... }`) para uso em libs como styled-components.
 * @returns {Record<string, string>}
 */
export function createReactTheme() {
  return flattenTokens();
}

/**
 * Expõe helpers úteis para projetos React.
 */
export const reactTokens = {
  tokens: designTokens,
  get: getToken,
  theme: createReactTheme,
  cssVariables: (options) => toCSSVariables(options),
};

export default reactTokens;
