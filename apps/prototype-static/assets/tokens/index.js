import tokens from "./design-tokens.json" assert { type: "json" };

const isTokenLeaf = (value) =>
  value &&
  typeof value === "object" &&
  Object.prototype.hasOwnProperty.call(value, "value") &&
  Object.keys(value).length === 1;

const traverse = (node, path = [], accumulator = {}) => {
  if (isTokenLeaf(node)) {
    accumulator[path.join(".")] = node.value;
    return accumulator;
  }

  if (node && typeof node === "object") {
    Object.entries(node).forEach(([key, value]) => {
      traverse(value, [...path, key], accumulator);
    });
  }

  return accumulator;
};

export const designTokens = tokens;

/**
 * Retorna o valor de um token usando notação de caminho (`color.primary.600`).
 * @param {string} path
 * @param {any} [fallback]
 * @returns {any}
 */
export function getToken(path, fallback) {
  if (!path) return fallback;

  const segments = path.split(".");
  let current = tokens;

  for (const segment of segments) {
    if (!current || typeof current !== "object" || !(segment in current)) {
      return fallback;
    }

    current = current[segment];
  }

  if (isTokenLeaf(current)) {
    return current.value;
  }

  return fallback;
}

/**
 * Achata a árvore de tokens em um objeto plano com caminhos do tipo `color.primary.600`.
 * @returns {Record<string, string>}
 */
export function flattenTokens() {
  return traverse(tokens);
}

/**
 * Converte os tokens em variáveis CSS prontas para aplicação.
 * @param {{ prefix?: string }} [options]
 * @returns {Record<string, string>}
 */
export function toCSSVariables(options = {}) {
  const { prefix = "--ds" } = options;
  const flat = flattenTokens();
  const cssVariables = {};

  Object.entries(flat).forEach(([path, value]) => {
    const cssName = `${prefix}-${path.replace(/\./g, "-")}`;
    cssVariables[cssName] = value;
  });

  return cssVariables;
}

/**
 * Gera uma string CSS (`:root { --ds-color-primary-600: ... }`) para injeção direta.
 * @param {{ selector?: string, prefix?: string }} [options]
 * @returns {string}
 */
export function createCSSVariablesString(options = {}) {
  const { selector = ":root", prefix } = options;
  const vars = toCSSVariables({ prefix });
  const body = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");

  return `${selector} {\n${body}\n}`;
}

/**
 * Aplica os tokens como variáveis CSS em um elemento destino.
 * @param {HTMLElement} target
 * @param {{ prefix?: string }} [options]
 */
export function applyTokensToElement(target, options = {}) {
  if (!target || typeof target.style === "undefined") return;
  const vars = toCSSVariables(options);

  Object.entries(vars).forEach(([name, value]) => {
    target.style.setProperty(name, value);
  });

  return () => {
    Object.keys(vars).forEach((name) => {
      target.style.removeProperty(name);
    });
  };
}

export default designTokens;
