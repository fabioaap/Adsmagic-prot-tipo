import { test, expect } from '@playwright/test'

test.describe('Storybook Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006')
    await page.waitForLoadState('networkidle')
  })

  test('Homepage do hub', async ({ page }) => {
    await expect(page).toHaveScreenshot('storybook-homepage.png', {
      fullPage: true,
      threshold: 0.1,
    })
  })

  test('Secao de componentes', async ({ page }) => {
    await page.getByRole('link', { name: /componentes/i }).click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('storybook-components.png', {
      fullPage: true,
      threshold: 0.1,
    })
  })

  test('Secao de tokens', async ({ page }) => {
    await page.getByRole('link', { name: /tokens/i }).click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('storybook-tokens.png', {
      fullPage: true,
      threshold: 0.1,
    })
  })

  test('Referencia React carregada', async ({ page }) => {
    const reactRef = page.locator('[data-ref-id="react"]')
    await expect(reactRef).toBeVisible()

    await expect(reactRef).toHaveScreenshot('storybook-react-ref.png', {
      threshold: 0.1,
    })
  })

  test('Referencia Vue carregada', async ({ page }) => {
    const vueRef = page.locator('[data-ref-id="vue"]')
    await expect(vueRef).toBeVisible()

    await expect(vueRef).toHaveScreenshot('storybook-vue-ref.png', {
      threshold: 0.1,
    })
  })
})
