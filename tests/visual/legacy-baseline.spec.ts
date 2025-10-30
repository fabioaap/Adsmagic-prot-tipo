import { test, expect } from '@playwright/test';

/**
 * Testes de Baseline Visual - Captura screenshots do legado HTML
 *
 * Estes testes estabelecem a "fonte de verdade visual" contra a qual
 * os componentes React/Vue serão comparados.
 *
 * Para atualizar baseline: npm run test:visual:update
 */
test.describe('Legacy Baseline Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Garantir viewport consistente
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('Páginas Principais', () => {
    test('Homepage/Dashboard - Layout completo', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Capturar screenshot completo da página
      await expect(page).toHaveScreenshot('homepage-dashboard.png', {
        fullPage: true,
        threshold: 0.005, // 0.5% tolerância para baseline
      });
    });

    test('Página de Vendas - Cards e métricas', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('vendas-page.png', {
        fullPage: true,
        threshold: 0.005,
      });
    });

    test('Página de Contatos - Listas e filtros', async ({ page }) => {
      await page.goto('/contatos.html');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('contatos-page.png', {
        fullPage: true,
        threshold: 0.005,
      });
    });
  });

  test.describe('Componentes Individuais', () => {
    test('Summary Cards Grid - Métricas principais', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      // Isolar apenas o grid de cards
      const summaryGrid = page.locator('.summary-cards, .metrics-grid, [class*="summary"]');
      await expect(summaryGrid.first()).toHaveScreenshot('summary-cards-grid.png', {
        threshold: 0.01, // 1% tolerância
      });
    });

    test('Data Table - Listagem de dados', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      // Procurar por tabelas de dados
      const dataTable = page.locator('table, .data-table, [class*="table"]');
      if (await dataTable.count() > 0) {
        await expect(dataTable.first()).toHaveScreenshot('data-table.png', {
          threshold: 0.01,
        });
      }
    });

    test('Charts/Gráficos - Visualizações', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      // Capturar qualquer elemento que pareça ser um gráfico
      const charts = page.locator('.chart, .graph, canvas, svg, [class*="chart"]');
      if (await charts.count() > 0) {
        await expect(charts.first()).toHaveScreenshot('charts-visualization.png', {
          threshold: 0.02, // 2% tolerância para gráficos
        });
      }
    });

    test('Status Badges - Estados e indicadores', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      // Procurar por badges de status
      const badges = page.locator('.badge, .status, .tag, [class*="badge"], [class*="status"]');
      if (await badges.count() > 0) {
        // Capturar todos os badges visíveis
        await expect(page).toHaveScreenshot('status-badges.png', {
          fullPage: false,
          threshold: 0.01,
        });
      }
    });

    test('Buttons - Elementos interativos', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      // Capturar botões principais
      const buttons = page.locator('button, .btn, [class*="button"], input[type="submit"]');
      if (await buttons.count() > 0) {
        await expect(buttons.first()).toHaveScreenshot('buttons-primary.png', {
          threshold: 0.01,
        });
      }
    });

    test('Navigation/Header - Navegação principal', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Capturar header/nav
      const header = page.locator('header, nav, .navbar, .navigation, [class*="nav"]');
      if (await header.count() > 0) {
        await expect(header.first()).toHaveScreenshot('navigation-header.png', {
          threshold: 0.005,
        });
      }
    });

    test('Sidebar - Menu lateral', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Capturar sidebar
      const sidebar = page.locator('.sidebar, aside, .menu-lateral, [class*="sidebar"]');
      if (await sidebar.count() > 0) {
        await expect(sidebar.first()).toHaveScreenshot('sidebar-menu.png', {
          threshold: 0.005,
        });
      }
    });
  });

  test.describe('Estados Interativos', () => {
    test('Hover states - Interações', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      // Hover em um card
      const card = page.locator('.card, .summary-card, [class*="card"]').first();
      if (await card.count() > 0) {
        await card.hover();
        await page.waitForTimeout(200); // Aguardar transição

        await expect(card).toHaveScreenshot('card-hover-state.png', {
          threshold: 0.02,
        });
      }
    });

    test('Focus states - Navegação teclado', async ({ page }) => {
      await page.goto('/vendas.html');
      await page.waitForLoadState('networkidle');

      // Simular navegação por teclado
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Capturar elemento focado
      const focusedElement = await page.evaluate(() => {
        const active = document.activeElement;
        return active ? active.tagName + (active.className ? '.' + active.className.split(' ')[0] : '') : null;
      });

      if (focusedElement) {
        await expect(page).toHaveScreenshot('focus-states-keyboard.png', {
          threshold: 0.01,
        });
      }
    });
  });

  test.describe('Responsividade', () => {
    test('Mobile viewport - Layout adaptativo', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('mobile-responsive.png', {
        fullPage: true,
        threshold: 0.02, // Maior tolerância para mobile
      });
    });

    test('Tablet viewport - Layout intermediário', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('tablet-responsive.png', {
        fullPage: true,
        threshold: 0.01,
      });
    });
  });
});