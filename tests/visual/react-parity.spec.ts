import { test, expect } from '@playwright/test';

/**
 * Testes de Paridade Visual React - Comparação contra baseline legado
 *
 * Estes testes garantem que os componentes React mantenham paridade visual
 * com o legado HTML, validando implementações fiéis.
 */
test.describe('React Components Visual Parity', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('Summary Cards', () => {
    test('SummaryCard - Paridade com legado', async ({ page }) => {
      // Carregar componente React no Storybook
      await page.goto('http://localhost:6008/iframe.html?id=summary-summarycard--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      // Aguardar componente renderizar completamente
      await page.locator('[data-testid="SummaryCard"]').waitFor();

      // Comparar contra baseline do legado
      await expect(page.locator('[data-testid="SummaryCard"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.05, // 5% tolerância para diferenças de implementação
      });
    });

    test('SummaryCardGrid - Layout de grid', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=summary-summarycardgrid--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="SummaryCardGrid"]').waitFor();

      await expect(page.locator('[data-testid="SummaryCardGrid"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.05,
      });
    });
  });

  test.describe('Data Tables', () => {
    test('DataTable - Estrutura tabular', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=table-datatable--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('table').waitFor();

      await expect(page.locator('table')).toHaveScreenshot('../snapshots/visual/data-table.png', {
        threshold: 0.03, // 3% tolerância para tabelas
      });
    });
  });

  test.describe('Charts', () => {
    test('RevenueChart - Gráfico de receita', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=charts-revenuechart--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      // Aguardar canvas/SVG renderizar
      await page.waitForTimeout(1000);

      await expect(page.locator('.chart, canvas, svg').first()).toHaveScreenshot('../snapshots/visual/charts-visualization.png', {
        threshold: 0.08, // 8% tolerância para gráficos (diferenças de renderização)
      });
    });

    test('ChannelsChart - Gráfico de canais', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=charts-channelschart--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(1000);

      await expect(page.locator('.chart, canvas, svg').first()).toHaveScreenshot('../snapshots/visual/charts-visualization.png', {
        threshold: 0.08,
      });
    });
  });

  test.describe('Status Components', () => {
    test('StatusDropdown - Estados e seleção', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=status-statusdropdown--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="StatusDropdown"]').waitFor();

      await expect(page.locator('[data-testid="StatusDropdown"]')).toHaveScreenshot('../snapshots/visual/status-badges.png', {
        threshold: 0.04,
      });
    });

    test('Badge - Indicadores de status', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=badge--primary&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="Badge"]').waitFor();

      await expect(page.locator('[data-testid="Badge"]')).toHaveScreenshot('../snapshots/visual/status-badges.png', {
        threshold: 0.04,
      });
    });
  });

  test.describe('Buttons', () => {
    test('Button - Estados padrão', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=inputs-button--primary&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('button').waitFor();

      await expect(page.locator('button').first()).toHaveScreenshot('../snapshots/visual/buttons-primary.png', {
        threshold: 0.03,
      });
    });

    test('Button - Estados hover', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=inputs-button--primary&viewMode=story');
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
    test('Header - Navegação principal', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=navigation-header--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="Header"]').waitFor();

      await expect(page.locator('[data-testid="Header"]')).toHaveScreenshot('../snapshots/visual/navigation-header.png', {
        threshold: 0.03,
      });
    });

    test('Sidebar - Menu lateral', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=navigation-sidebar--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="Sidebar"]').waitFor();

      await expect(page.locator('[data-testid="Sidebar"]')).toHaveScreenshot('../snapshots/visual/sidebar-menu.png', {
        threshold: 0.03,
      });
    });
  });

  test.describe('Cards', () => {
    test('Card - Estados padrão', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=card--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="Card"]').waitFor();

      await expect(page.locator('[data-testid="Card"]')).toHaveScreenshot('../snapshots/visual/summary-cards-grid.png', {
        threshold: 0.04,
      });
    });

    test('Card - Estados hover', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=card--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      const card = page.locator('[data-testid="Card"]').first();
      await card.hover();
      await page.waitForTimeout(200);

      await expect(card).toHaveScreenshot('../snapshots/visual/card-hover-state.png', {
        threshold: 0.05,
      });
    });
  });

  test.describe('Form Elements', () => {
    test('AvatarHighlight - Perfis de usuário', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=avatar-avatarhighlight--default&viewMode=story');
      await page.waitForLoadState('networkidle');

      await page.locator('[data-testid="AvatarHighlight"]').waitFor();

      // Comparar contra homepage onde avatares aparecem
      await expect(page.locator('[data-testid="AvatarHighlight"]')).toHaveScreenshot('../snapshots/visual/homepage-dashboard.png', {
        threshold: 0.06, // Maior tolerância para elementos complexos
      });
    });
  });

  test.describe('Accessibility States', () => {
    test('Focus states - Navegação teclado', async ({ page }) => {
      await page.goto('http://localhost:6008/iframe.html?id=inputs-button--primary&viewMode=story');
      await page.waitForLoadState('networkidle');

      // Simular navegação por teclado
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await expect(page).toHaveScreenshot('../snapshots/visual/focus-states-keyboard.png', {
        threshold: 0.03,
      });
    });
  });
});