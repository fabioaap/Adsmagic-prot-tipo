import { test, expect } from '@playwright/test';

/**
 * Testes de Paridade Visual Vue - Comparação contra baseline legado
 *
 * Estes testes garantem que os componentes Vue mantenham paridade visual
 * com o legado HTML, validando implementações fiéis.
 */
test.describe('Vue Components Visual Parity', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('Summary Cards', () => {
    test('DsSummaryCard - Paridade com legado', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=summary-dssummarycard--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsSummaryCard"]').waitFor();

      await expect(page.locator('[data-testid="DsSummaryCard"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.05,
      });
    });

    test('DsSummaryCardGrid - Layout de grid', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=summary-dssummarycardgrid--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsSummaryCardGrid"]').waitFor();

      await expect(page.locator('[data-testid="DsSummaryCardGrid"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.05,
      });
    });
  });

  test.describe('Data Tables', () => {
    test('DsDataTable - Estrutura tabular', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=table-dsdatatable--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('table').waitFor();

      await expect(page.locator('table')).toHaveScreenshot('../snapshots/visual/data-table.png', {
        threshold: 0.03,
      });
    });
  });

  test.describe('Charts', () => {
    test('DsRevenueChart - Gráfico de receita', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=charts-dsrevenuechart--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(1000);

      await expect(page.locator('.chart, canvas, svg').first()).toHaveScreenshot('../snapshots/visual/charts-visualization.png', {
        threshold: 0.08,
      });
    });

    test('DsChannelsChart - Gráfico de canais', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=charts-dschannelschart--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(1000);

      await expect(page.locator('.chart, canvas, svg').first()).toHaveScreenshot('../snapshots/visual/charts-visualization.png', {
        threshold: 0.08,
      });
    });
  });

  test.describe('Status Components', () => {
    test('DsStatusDropdown - Estados e seleção', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=status-dsstatusdropdown--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsStatusDropdown"]').waitFor();

      await expect(page.locator('[data-testid="DsStatusDropdown"]')).toHaveScreenshot('../snapshots/visual/status-badges.png', {
        threshold: 0.04,
      });
    });

    test('DsBadge - Indicadores de status', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=badge--primary&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsBadge"]').waitFor();

      await expect(page.locator('[data-testid="DsBadge"]')).toHaveScreenshot('../snapshots/visual/status-badges.png', {
        threshold: 0.04,
      });
    });
  });

  test.describe('Buttons', () => {
    test('DsButton - Estados padrão', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=inputs-dsbutton--primary&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('button').waitFor();

      await expect(page.locator('button').first()).toHaveScreenshot('../snapshots/visual/buttons-primary.png', {
        threshold: 0.03,
      });
    });

    test('DsButton - Estados hover', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=inputs-dsbutton--primary&viewMode=story');
      await page.waitForLoadState('networkidle');

      const button = page.locator('button').first();
      await button.hover();
      await page.waitForTimeout(200);

      await expect(button).toHaveScreenshot('../snapshots/visual/card-hover-state.png', {
        threshold: 0.05,
      });
    });
  });

  test.describe('Navigation', () => {
    test('DsHeader - Navegação principal', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=navigation-dsheader--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsHeader"]').waitFor();

      await expect(page.locator('[data-testid="DsHeader"]')).toHaveScreenshot('../snapshots/visual/navigation-header.png', {
        threshold: 0.03,
      });
    });

    test('DsSidebar - Menu lateral', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=navigation-dssidebar--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsSidebar"]').waitFor();

      await expect(page.locator('[data-testid="DsSidebar"]')).toHaveScreenshot('../snapshots/visual/sidebar-menu.png', {
        threshold: 0.03,
      });
    });
  });

  test.describe('Cards', () => {
    test('DsCard - Estados padrão', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=card--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsCard"]').waitFor();

      await expect(page.locator('[data-testid="DsCard"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.04,
      });
    });

    test('DsCard - Estados hover', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=card--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      const card = page.locator('[data-testid="DsCard"]').first();
      await card.hover();
      await page.waitForTimeout(200);

      await expect(card).toHaveScreenshot('../snapshots/visual/card-hover-state.png', {
        threshold: 0.05,
      });
    });
  });

  test.describe('Form Elements', () => {
    test('DsAvatarHighlight - Perfis de usuário', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=avatar-dsavatarhighlight--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="DsAvatarHighlight"]').waitFor();

      await expect(page.locator('[data-testid="DsAvatarHighlight"]')).toHaveScreenshot('../snapshots/visual/homepage-dashboard.png', {
        threshold: 0.06,
      });
    });
  });

  test.describe('Accessibility States', () => {
    test('Focus states - Navegação teclado', async ({ page }) => {
      await page.goto('http://localhost:7007/iframe.html?id=inputs-dsbutton--primary&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await expect(page).toHaveScreenshot('../snapshots/visual/focus-states-keyboard.png', {
        threshold: 0.03,
      });
    });
  });
});