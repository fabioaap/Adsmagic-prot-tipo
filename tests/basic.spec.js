import { test, expect } from '@playwright/test';

test.describe('Adsmagic Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Adsmágic/);
  });

  test('should display dashboard content', async ({ page }) => {
    // Check if main dashboard elements are present
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Visão geral');
  });

  test('should display summary cards', async ({ page }) => {
    // Check if summary cards are present
    await expect(page.locator('.summary-grid')).toBeVisible();
    await expect(page.locator('.summary-card')).toHaveCount(14);
  });

  test('should display last two cards side by side', async ({ page }) => {
    // Check if the last two cards are positioned correctly
    const lastCard = page.locator('.summary-card').last();
    const secondLastCard = page.locator('.summary-card').nth(-2);

    // Both cards should be visible
    await expect(lastCard).toBeVisible();
    await expect(secondLastCard).toBeVisible();

    // Check if they have the correct styling (side by side)
    const lastCardBox = await lastCard.boundingBox();
    const secondLastCardBox = await secondLastCard.boundingBox();

    // They should be approximately at the same height (side by side)
    expect(Math.abs(lastCardBox.y - secondLastCardBox.y)).toBeLessThan(10);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 480, height: 800 });

    // Cards should still be visible (check first card specifically)
    await expect(page.locator('.summary-card').first()).toBeVisible();

    // Check if responsive styles are applied
    const cards = page.locator('.summary-card');
    const count = await cards.count();
    expect(count).toBe(14);
  });

  test('should display navigation', async ({ page }) => {
    // Check if sidebar navigation is present
    await expect(page.locator('.app-sidebar')).toBeVisible();
    await expect(page.locator('.app-nav')).toBeVisible();
  });

  test('should display charts and graphs', async ({ page }) => {
    // Check if chart sections are present
    await expect(page.locator('text=Contatos e Vendas')).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: 'Receita' })).toBeVisible();
    await expect(page.locator('text=Funil de conversão')).toBeVisible();
  });
});
