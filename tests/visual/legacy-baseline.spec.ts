import { test, expect } from '@playwright/test'

/**
 * Baseline visual do legado HTML.
 * Captura screenshots de referencia para comparar com implementacoes modernas.
 *
 * Para atualizar: npm run test:visual:update
 */
test.describe('Legacy Baseline Screenshots', () => {
  const desktopViewport = { width: 1280, height: 720 }

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(desktopViewport)
  })

  const legacyPages: Array<{
    label: string
    path: string
    screenshot: string
  }> = [
    { label: 'Homepage / Dashboard', path: '/', screenshot: 'homepage-dashboard.png' },
    { label: 'Pagina de Vendas', path: '/vendas.html', screenshot: 'vendas-page.png' },
    { label: 'Pagina de Contatos', path: '/contatos.html', screenshot: 'contatos-page.png' },
    { label: 'Pagina de Eventos', path: '/eventos.html', screenshot: 'eventos-page.png' },
    { label: 'Pagina de Funil', path: '/funil.html', screenshot: 'funil-page.png' },
    { label: 'Pagina de Integracoes', path: '/integracoes.html', screenshot: 'integracoes-page.png' },
    { label: 'Pagina de Links', path: '/links.html', screenshot: 'links-page.png' },
    { label: 'Pagina de Mensagens', path: '/mensagens.html', screenshot: 'mensagens-page.png' },
    { label: 'Pagina de Relatorios', path: '/relatorios.html', screenshot: 'relatorios-page.png' },
    { label: 'Pagina de Suporte', path: '/suporte.html', screenshot: 'suporte-page.png' },
    { label: 'Pagina de Configuracoes', path: '/configuracoes.html', screenshot: 'configuracoes-page.png' },
  ]

  test.describe('Paginas principais do legado', () => {
    for (const pageConfig of legacyPages) {
      test(pageConfig.label, async ({ page }) => {
        await page.goto(pageConfig.path)
        await page.waitForLoadState('networkidle')

        await expect(page).toHaveScreenshot(pageConfig.screenshot, {
          fullPage: true,
          threshold: 0.005,
        })
      })
    }
  })

  test.describe('Componentes individuais', () => {
    test('Summary Cards Grid', async ({ page }) => {
      await page.goto('/vendas.html')
      await page.waitForLoadState('networkidle')

      const summaryGrid = page.locator('.summary-cards, .metrics-grid, [class*="summary"]')
      await expect(summaryGrid.first()).toHaveScreenshot('summary-cards-grid.png', {
        threshold: 0.01,
      })
    })

    test('Tabela de dados', async ({ page }) => {
      await page.goto('/vendas.html')
      await page.waitForLoadState('networkidle')

      const dataTable = page.locator('table, .data-table, [class*="table"]')
      if (await dataTable.count()) {
        await expect(dataTable.first()).toHaveScreenshot('data-table.png', {
          threshold: 0.01,
        })
      }
    })

    test('Graficos e visualizacoes', async ({ page }) => {
      await page.goto('/vendas.html')
      await page.waitForLoadState('networkidle')

      const charts = page.locator('.chart, .graph, canvas, svg, [class*="chart"]')
      if (await charts.count()) {
        await expect(charts.first()).toHaveScreenshot('charts-visualization.png', {
          threshold: 0.02,
        })
      }
    })

    test('Badges de status', async ({ page }) => {
      await page.goto('/vendas.html')
      await page.waitForLoadState('networkidle')

      await expect(page).toHaveScreenshot('status-badges.png', {
        fullPage: false,
        threshold: 0.01,
      })
    })

    test('Botoes principais', async ({ page }) => {
      await page.goto('/vendas.html')
      await page.waitForLoadState('networkidle')

      const buttons = page.locator('button, .btn, [class*="button"], input[type="submit"]')
      if (await buttons.count()) {
        await expect(buttons.first()).toHaveScreenshot('buttons-primary.png', {
          threshold: 0.01,
        })
      }
    })

    test('Header / navegacao superior', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const header = page.locator('header, nav, .navbar, .navigation, [class*="nav"]')
      if (await header.count()) {
        await expect(header.first()).toHaveScreenshot('navigation-header.png', {
          threshold: 0.005,
        })
      }
    })

    test('Sidebar', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const sidebar = page.locator('.sidebar, aside, .menu-lateral, [class*="sidebar"]')
      if (await sidebar.count()) {
        await expect(sidebar.first()).toHaveScreenshot('sidebar-menu.png', {
          threshold: 0.005,
        })
      }
    })
  })

  test.describe('Estados interativos', () => {
    test('Estado hover de cards', async ({ page }) => {
      await page.goto('/vendas.html')
      await page.waitForLoadState('networkidle')

      const card = page.locator('.card, .summary-card, [class*="card"]').first()
      if (await card.count()) {
        await card.hover()
        await page.waitForTimeout(200)

        await expect(card).toHaveScreenshot('card-hover-state.png', {
          threshold: 0.02,
        })
      }
    })

    test('Estado focus via teclado', async ({ page }) => {
      await page.goto('/vendas.html')
      await page.waitForLoadState('networkidle')

      await page.keyboard.press('Tab')
      await page.waitForTimeout(100)

      await expect(page).toHaveScreenshot('focus-states-keyboard.png', {
        threshold: 0.01,
      })
    })
  })

  test.describe('Responsividade', () => {
    test('Mobile - iPhone SE', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      await expect(page).toHaveScreenshot('mobile-responsive.png', {
        fullPage: true,
        threshold: 0.02,
      })
    })

    test('Tablet - iPad', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      await expect(page).toHaveScreenshot('tablet-responsive.png', {
        fullPage: true,
        threshold: 0.01,
      })
    })
  })
})
