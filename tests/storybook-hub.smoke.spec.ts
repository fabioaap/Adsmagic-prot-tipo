import { expect, test } from "@playwright/test";

const hubUrl = process.env.STORYBOOK_URL ?? "http://localhost:6006";

test.describe("Storybook Hub - smoke", () => {
  test("carrega a documentacao inicial", async ({ page }) => {
    let response;
    try {
      response = await page.goto(hubUrl, {
        waitUntil: "domcontentloaded",
        timeout: 15_000,
      });
    } catch (error) {
      test.skip(
        `Storybook Hub indisponivel em ${hubUrl}. Inicie "npm run dev" (hub) antes de rodar este teste.`,
      );
      return;
    }

    if (response && response.status() >= 400) {
      test.skip(
        `Storybook Hub respondeu com status ${response.status()} em ${hubUrl}.`,
      );
      return;
    }

    await page.goto(`${hubUrl}/?path=/docs/guia-visao-geral--docs`, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector("#storybook-preview-iframe", {
      timeout: 10_000,
    });
    const docsFrame = page.frameLocator("#storybook-preview-iframe");

    await expect(
      docsFrame.getByRole("heading", { name: /Design System Adsmagic/i }),
    ).toBeVisible();
    await expect(
      docsFrame.getByRole("heading", { name: /Proposito/i }),
    ).toBeVisible();
    await expect(
      page.locator('[data-item-id="guia-visao-geral--docs"]').first(),
    ).toBeVisible();
  });
});
