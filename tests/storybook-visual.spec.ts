import { test, expect } from '@playwright/test';

test.describe('Storybook Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para o Storybook Hub
    await page.goto('http://localhost:6006');

    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');
  });

  test('Storybook homepage matches baseline', async ({ page }) => {
    // Capturar screenshot da página inicial
    await expect(page).toHaveScreenshot('storybook-homepage.png', {
      fullPage: true,
      threshold: 0.1, // 10% de tolerância para diferenças
    });
  });

  test('Components section matches baseline', async ({ page }) => {
    // Navegar para seção de componentes
    await page.getByRole('link', { name: /componentes/i }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('storybook-components.png', {
      fullPage: true,
      threshold: 0.1,
    });
  });

  test('Tokens section matches baseline', async ({ page }) => {
    // Navegar para seção de tokens
    await page.getByRole('link', { name: /tokens/i }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('storybook-tokens.png', {
      fullPage: true,
      threshold: 0.1,
    });
  });

  test('React components match baseline', async ({ page }) => {
    // Verificar se a referência React está carregando
    const reactRef = page.locator('[data-ref-id="react"]');
    await expect(reactRef).toBeVisible();

    // Capturar screenshot da seção React
    await expect(page.locator('[data-ref-id="react"]')).toHaveScreenshot('storybook-react-ref.png', {
      threshold: 0.1,
    });
  });

  test('Vue components match baseline', async ({ page }) => {
    // Verificar se a referência Vue está carregando
    const vueRef = page.locator('[data-ref-id="vue"]');
    await expect(vueRef).toBeVisible();

    // Capturar screenshot da seção Vue
    await expect(page.locator('[data-ref-id="vue"]')).toHaveScreenshot('storybook-vue-ref.png', {
      threshold: 0.1,
    });
  });
});