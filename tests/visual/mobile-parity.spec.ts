import { test, expect } from '@playwright/test'

/**
 * Paridade visual em viewports mobile e tablet.
 * Valida que os layouts responsivos continuam alinhados com o baseline do legado.
 */
test.describe('Mobile Visual Parity', () => {
  test.describe('iPhone SE (375x667)', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('Homepage mobile - layout responsivo', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      await expect(page).toHaveScreenshot('../snapshots/visual/mobile-responsive.png', {
        fullPage: true,
        threshold: 0.03,
      })
    })

    test('React SummaryCard mobile', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=summary-summarycard--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="SummaryCard"]').waitFor()

      await expect(page.locator('[data-testid="SummaryCard"]')).toHaveScreenshot('../snapshots/visual/mobile-responsive.png', {
        threshold: 0.05,
      })
    })

    test('Vue DsSummaryCard mobile', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=summary-dssummarycard--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="DsSummaryCard"]').waitFor()

      await expect(page.locator('[data-testid="DsSummaryCard"]')).toHaveScreenshot('../snapshots/visual/mobile-responsive.png', {
        threshold: 0.05,
      })
    })
  })

  test.describe('iPad (768x1024)', () => {
    test.use({ viewport: { width: 768, height: 1024 } })

    test('Homepage tablet - layout intermediario', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      await expect(page).toHaveScreenshot('../snapshots/visual/tablet-responsive.png', {
        fullPage: true,
        threshold: 0.02,
      })
    })

    test('React DataTable tablet', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=table-datatable--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('table').waitFor()

      await expect(page.locator('table')).toHaveScreenshot('../snapshots/visual/tablet-responsive.png', {
        threshold: 0.04,
      })
    })

    test('Vue DsDataTable tablet', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=table-dsdatatable--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('table').waitFor()

      await expect(page.locator('table')).toHaveScreenshot('../snapshots/visual/tablet-responsive.png', {
        threshold: 0.04,
      })
    })
  })
})
