const { chromium } = require('playwright');

async function checkElements() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4100/vendas.html');
    await page.waitForLoadState('networkidle');

    const summaryGrid = await page.locator('.summary-grid').count();
    console.log('Elementos .summary-grid encontrados:', summaryGrid);

    const summaryCards = await page.locator('.summary-card').count();
    console.log('Elementos .summary-card encontrados:', summaryCards);

    const overviewSummary = await page.locator('.overview-summary').count();
    console.log('Elementos .overview-summary encontrados:', overviewSummary);

    // Verificar se há algum elemento com essas classes
    const allElements = await page.locator('[class*="summary"]').count();
    console.log('Elementos com classe contendo "summary":', allElements);

    await browser.close();
}

checkElements().catch(console.error);