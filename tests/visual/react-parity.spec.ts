import { test, expect } from '@playwright/test'

/**
 * Paridade visual dos componentes React em relacao ao legado HTML.
 * Compara os componentes renderizados no Storybook com os snapshots do legado.
 */
test.describe('React Components Visual Parity', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test.describe('Summary Cards', () => {
    test('SummaryCard - paridade', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=summary-summarycard--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="SummaryCard"]').waitFor()

      await expect(page.locator('[data-testid="SummaryCard"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.05,
      })
    })

    test('SummaryCardGrid - layout', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=summary-summarycardgrid--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="SummaryCardGrid"]').waitFor()

      await expect(page.locator('[data-testid="SummaryCardGrid"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.05,
      })
    })
  })

  test.describe('Tabelas', () => {
    test('DataTable - estrutura', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=table-datatable--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('table').waitFor()

      await expect(page.locator('table')).toHaveScreenshot('../snapshots/visual/data-table.png', {
        threshold: 0.03,
      })
    })
  })

  test.describe('Graficos', () => {
    const chartStories = [
      { url: 'http://localhost:6008/iframe.html?id=charts-revenuechart--default&viewMode=story', name: 'RevenueChart' },
      { url: 'http://localhost:6008/iframe.html?id=charts-channelschart--default&viewMode=story', name: 'ChannelsChart' },
    ]

    for (const chart of chartStories) {
      test(`${chart.name} - grafico`, async ({ page }) => {
        await page.goto(chart.url)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(1000)

        await expect(page.locator('.chart, canvas, svg').first()).toHaveScreenshot('../snapshots/visual/charts-visualization.png', {
          threshold: 0.08,
        })
      })
    }
  })

  test.describe('Status e badges', () => {
    test('StatusDropdown', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=status-statusdropdown--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="StatusDropdown"]').waitFor()

      await expect(page.locator('[data-testid="StatusDropdown"]')).toHaveScreenshot('../snapshots/visual/status-badges.png', {
        threshold: 0.04,
      })
    })

    test('Badge', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=badge--primary&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="Badge"]').waitFor()

      await expect(page.locator('[data-testid="Badge"]')).toHaveScreenshot('../snapshots/visual/status-badges.png', {
        threshold: 0.04,
      })
    })
  })

  test.describe('Botoes', () => {
    test('Button default', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=inputs-button--primary&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('button').first().waitFor()

      await expect(page.locator('button').first()).toHaveScreenshot('../snapshots/visual/buttons-primary.png', {
        threshold: 0.03,
      })
    })

    test('Button hover', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=inputs-button--primary&viewMode=story')
      await page.waitForLoadState('networkidle')

      const button = page.locator('button').first()
      await button.hover()
      await page.waitForTimeout(200)

      await expect(button).toHaveScreenshot('../snapshots/visual/card-hover-state.png', {
        threshold: 0.05,
      })
    })
  })

  test.describe('Navegacao', () => {
    test('Header', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=navigation-header--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="Header"]').waitFor()

      await expect(page.locator('[data-testid="Header"]')).toHaveScreenshot('../snapshots/visual/navigation-header.png', {
        threshold: 0.03,
      })
    })

    test('Sidebar', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=navigation-sidebar--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="Sidebar"]').waitFor()

      await expect(page.locator('[data-testid="Sidebar"]')).toHaveScreenshot('../snapshots/visual/sidebar-menu.png', {
        threshold: 0.03,
      })
    })
  })

  test.describe('Cards', () => {
    test('Card default', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=card--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="Card"]').waitFor()

      await expect(page.locator('[data-testid="Card"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.04,
      })
    })

    test('Card hover', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=card--default&viewMode=story')
      await page.waitForLoadState('networkidle')

      const card = page.locator('[data-testid="Card"]').first()
      await card.hover()
      await page.waitForTimeout(200)

      await expect(card).toHaveScreenshot('../snapshots/visual/card-hover-state.png', {
        threshold: 0.05,
      })
    })
  })

  test.describe('Form e acessibilidade', () => {
    test('AvatarHighlight', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=avatar-avatarhighlight--default&viewMode=story')
      await page.waitForLoadState('networkidle')
      await page.locator('[data-testid="AvatarHighlight"]').waitFor()

      await expect(page.locator('[data-testid="AvatarHighlight"]')).toHaveScreenshot('../snapshots/visual/homepage-dashboard.png', {
        threshold: 0.06,
      })
    })

    test('Focus via teclado', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=inputs-button--primary&viewMode=story')
      await page.waitForLoadState('networkidle')

      await page.keyboard.press('Tab')
      await page.waitForTimeout(100)

      await expect(page).toHaveScreenshot('../snapshots/visual/focus-states-keyboard.png', {
        threshold: 0.03,
      })
    })
  })
})
