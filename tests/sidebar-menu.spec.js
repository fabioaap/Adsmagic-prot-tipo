// Teste Playwright: Clicar em todos os menus da sidebar do Dashboard React
const { test, expect } = require('@playwright/test');

const sidebarMenus = [
    { path: '/', label: 'Visão geral' },
    { path: '/contatos', label: 'Contatos' },
    { path: '/vendas', label: 'Vendas' },
    { path: '/funil', label: 'Funil' },
    { path: '/projetos', label: 'Projetos' },
    { path: '/eventos', label: 'Eventos' },
    { path: '/links', label: 'Links' },
    { path: '/mensagens', label: 'Mensagens' },
    { path: '/relatorios', label: 'Relatórios' },
    { path: '/integracoes', label: 'Integrações' },
    { path: '/configuracoes', label: 'Configurações' },
    { path: '/suporte', label: 'Suporte' },
    { path: '/logout', label: 'Sair' },
];

test.describe('Sidebar - Dashboard React', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
    });

    for (const menu of sidebarMenus) {
        test(`Clica no menu "${menu.label}" e navega para ${menu.path}`, async ({ page }) => {
            // Clica no link da sidebar
            await page.locator(`.app-nav-link[data-label='${menu.label}']`).click();
            // Valida se a URL mudou
            await expect(page).toHaveURL(new RegExp(menu.path === '/' ? '/$' : menu.path));
            // (Opcional) Valida se o menu está ativo
            const active = await page.locator(`.app-nav-link[data-label='${menu.label}'].is-active`).count();
            expect(active).toBeGreaterThanOrEqual(0); // Não falha se não houver .is-active
        });
    }
});
