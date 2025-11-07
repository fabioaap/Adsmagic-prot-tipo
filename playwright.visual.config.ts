import { defineConfig, devices } from '@playwright/test'

/**
 * Configuracao da suite de regressao visual.
 * - Baseline: screenshots do legado HTML (test-server.js)
 * - Parity: comparacao React/Vue contra baseline
 * - Storybook: smoke visual do hub central
 */
export default defineConfig({
  testDir: './tests/visual',
  outputDir: './test-results/visual',
  snapshotDir: './snapshots/visual',
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 2 : 4,
  forbidOnly: !!process.env.CI,

  use: {
    baseURL: 'http://localhost:4100',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  expect: {
    toHaveScreenshot: {
      threshold: 0.01,
      maxDiffPixelRatio: 0.05,
    },
  },

  projects: [
    {
      name: 'legacy-baseline',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/legacy-baseline.spec.ts',
      metadata: {
        description: 'Captura screenshots do legado HTML como baseline de referencia',
        type: 'baseline',
      },
    },
    {
      name: 'react-parity',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/react-parity.spec.ts',
      metadata: {
        description: 'Compara componentes React contra o baseline do legado',
        type: 'parity',
      },
    },
    {
      name: 'vue-parity',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/vue-parity.spec.ts',
      metadata: {
        description: 'Compara componentes Vue contra o baseline do legado',
        type: 'parity',
      },
    },
    {
      name: 'storybook-visual',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/storybook-visual.spec.ts',
      metadata: {
        description: 'Smoke visual do Storybook Hub e referencias',
        type: 'storybook',
      },
    },
    {
      name: 'mobile-parity',
      use: { ...devices['iPhone 12'] },
      testMatch: '**/mobile-parity.spec.ts',
      metadata: {
        description: 'Validacao visual responsiva (mobile/tablet)',
        type: 'parity',
      },
    },
  ],

  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: 'test-results/visual-reports' }]]
    : [['html', { outputFolder: 'test-results/visual-reports' }], ['list']],
})
