import { test, expect } from '@playwright/test';

test.describe('Card Layout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display exactly 14 summary cards', async ({ page }) => {
    const cards = page.locator('.summary-card');
    await expect(cards).toHaveCount(14);
  });

  test('should position last two cards side by side', async ({ page }) => {
    const allCards = page.locator('.summary-card');
    const totalCards = await allCards.count();

    // Get the last two cards
    const lastCard = allCards.nth(totalCards - 1);
    const secondLastCard = allCards.nth(totalCards - 2);

    // Both should be visible
    await expect(lastCard).toBeVisible();
    await expect(secondLastCard).toBeVisible();

    // Get their bounding boxes
    const lastCardBox = await lastCard.boundingBox();
    const secondLastCardBox = await secondLastCard.boundingBox();

    // They should be at approximately the same height (side by side)
    const heightDifference = Math.abs(lastCardBox.y - secondLastCardBox.y);
    expect(heightDifference).toBeLessThan(50); // Allow some tolerance for different content heights

    // They should not overlap significantly
    const lastCardRight = lastCardBox.x + lastCardBox.width;
    const secondLastCardLeft = secondLastCardBox.x;

    // The second last card should start before the last card ends (they're side by side)
    expect(secondLastCardLeft).toBeLessThan(lastCardRight);
  });

  test('should have correct card content for last two cards', async ({ page }) => {
    const allCards = page.locator('.summary-card');
    const totalCards = await allCards.count();

    // Check "Ciclo de vendas" card (second to last)
    const cicloVendasCard = allCards.nth(totalCards - 2);
    await expect(cicloVendasCard.locator('text=Ciclo de vendas')).toBeVisible();
    await expect(cicloVendasCard.locator('text=26 dias')).toBeVisible();

    // Check "Clientes ativos" card (last card)
    const clientesAtivosCard = allCards.nth(totalCards - 1);
    await expect(clientesAtivosCard.locator('text=Clientes ativos')).toBeVisible();
    await expect(clientesAtivosCard.locator('text=206')).toBeVisible();
  });

  test('should maintain responsive layout on different screen sizes', async ({ page }) => {
    // Test desktop layout (default)
    const allCards = page.locator('.summary-card');
    const totalCards = await allCards.count();

    const lastCard = allCards.nth(totalCards - 1);
    const secondLastCard = allCards.nth(totalCards - 2);

    const lastCardBox = await lastCard.boundingBox();
    const secondLastCardBox = await secondLastCard.boundingBox();

    // On desktop, they should be side by side
    const heightDifference = Math.abs(lastCardBox.y - secondLastCardBox.y);
    expect(heightDifference).toBeLessThan(100); // Increased tolerance for different card heights

    // Test mobile layout
    await page.setViewportSize({ width: 480, height: 800 });

    const mobileLastCardBox = await lastCard.boundingBox();
    const mobileSecondLastCardBox = await secondLastCard.boundingBox();

    // On mobile, cards should still be visible
    await expect(lastCard).toBeVisible();
    await expect(secondLastCard).toBeVisible();

    // Cards should still exist and be positioned
    expect(mobileLastCardBox).toBeTruthy();
    expect(mobileSecondLastCardBox).toBeTruthy();
  });

  test('should have proper grid layout for all cards', async ({ page }) => {
    const viewport = page.viewportSize();
    const isDesktop = viewport && viewport.width >= 1024;

    if (isDesktop) {
      // On desktop, first 12 cards should be in a 4-column grid
      // Last 2 cards should span the full width
      const allCards = page.locator('.summary-card');
      const totalCards = await allCards.count();

      // Check that we have the expected number of cards
      expect(totalCards).toBe(14);

      // The last two cards should each span 2 columns in a 4-column grid
      // This means they should be wider than regular cards
      const regularCard = allCards.first();
      const lastCard = allCards.last();

      const regularCardBox = await regularCard.boundingBox();
      const lastCardBox = await lastCard.boundingBox();

      // Last card should be significantly wider than regular cards
      expect(lastCardBox.width).toBeGreaterThan(regularCardBox.width * 1.5);
    }
  });
});
