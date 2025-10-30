import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração para testes de regressão visual
 * - Baseline: screenshots do legado HTML (test-server.js)
 * - Parity: comparação React/Vue contra baseline
 * - Storybook: testes visuais dos componentes documentados
 */
export default defineConfig({
  testDir: './tests/visual', // Diretório específico para testes visuais
  outputDir: './test-results/visual',
  snapshotDir: './snapshots/visual',
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 2 : 4, // Paralelização controlada
  forbidOnly: !!process.env.CI,

  use: {
    // Base URL para legado (usando servidor existente na porta 4100)
    baseURL: 'http://localhost:4100',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  expect: {
    toHaveScreenshot: {
      // Tolerância padrão de 1% para diferenças sutis
      threshold: 0.01,
      // Máximo de 5% para diferenças maiores (ex.: fontes, anti-aliasing)
      maxDiffPixelRatio: 0.05,
    },
  },

  projects: [
    {
      name: 'legacy-baseline',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/legacy-baseline.spec.ts',
      metadata: {
        description: 'Captura screenshots do legado HTML como baseline de referência',
        type: 'baseline'
      }
    },
    {
      name: 'react-parity',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/react-parity.spec.ts',
      metadata: {
        description: 'Compara componentes React contra baseline do legado',
        type: 'parity'
      }
    },
    {
      name: 'vue-parity',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/vue-parity.spec.ts',
      metadata: {
        description: 'Compara componentes Vue contra baseline do legado',
        type: 'parity'
      }
    },
    {
      name: 'storybook-visual',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/storybook-visual.spec.ts',
      metadata: {
        description: 'Testes visuais dos componentes no Storybook',
        type: 'storybook'
      }
    },
    {
      name: 'mobile-parity',
      use: { ...devices['iPhone 12'] },
      testMatch: '**/mobile-parity.spec.ts',
      metadata: {
        description: 'Validação visual em dispositivos móveis',
        type: 'parity'
      }
    },
  ],

  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: 'test-results/visual-reports' }]]
    : [['html', { outputFolder: 'test-results/visual-reports' }], ['list']],
});