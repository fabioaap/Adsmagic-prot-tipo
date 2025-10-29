import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'storybook-visual.spec.ts',

  // Configuração específica para testes visuais
  use: {
    // Capturar screenshots apenas em falhas para economizar espaço
    screenshot: 'only-on-failure',

    // Configurações de viewport consistentes
    viewport: { width: 1280, height: 720 },

    // Ignorar HTTPS errors (Storybook local)
    ignoreHTTPSErrors: true,

    // Timeout maior para carregamento do Storybook
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Configurações de snapshot
  expect: {
    // Tolerância para diferenças visuais (10%)
    toHaveScreenshot: { threshold: 0.1 },
  },

  // Projetos para diferentes navegadores
  projects: [
    {
      name: 'chromium-visual',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Configurações de output
  outputDir: 'test-results/visual',

  // Configurações de reporter
  reporter: [
    ['html', { outputFolder: 'playwright-report/visual' }],
    ['json', { outputFile: 'test-results/visual-results.json' }],
  ],

  // Configurações de workers (1 para consistência visual)
  workers: 1,

  // Retry limitado para testes visuais
  retries: 1,
});