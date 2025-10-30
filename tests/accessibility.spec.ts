import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Auditoria de Acessibilidade - Design System', () => {

  test.beforeEach(async ({ page }) => {
    // Configurar viewport para testes consistentes
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('Storybook React Components', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:6008');
    });

    test('Button - Acessibilidade WCAG 2.1 AA', async ({ page }) => {
      // Navegar para a página do Button
      await page.getByRole('link', { name: /button/i }).click();

      // Aguardar carregamento do componente
      await page.waitForSelector('[data-testid="storybook-iframe"]');

      // Executar auditoria de acessibilidade
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Verificar se não há violações críticas ou sérias
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );

      if (criticalViolations.length > 0) {
        console.log('Violações críticas encontradas no componente Button:');
        criticalViolations.forEach(violation => {
          console.log(`- ${violation.id}: ${violation.description}`);
          console.log(`  Impacto: ${violation.impact}`);
          console.log(`  Elementos afetados: ${violation.nodes.length}`);
        });
      }

      expect(criticalViolations).toHaveLength(0);
    });

    test('StatusDropdown - Acessibilidade WCAG 2.1 AA', async ({ page }) => {
      // Navegar para a página do StatusDropdown
      await page.getByRole('link', { name: /status.*dropdown/i }).click();

      // Aguardar carregamento do componente
      await page.waitForSelector('[data-testid="storybook-iframe"]');

      // Executar auditoria de acessibilidade
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Verificar se não há violações críticas ou sérias
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('DataTable - Acessibilidade WCAG 2.1 AA', async ({ page }) => {
      // Navegar para a página do DataTable
      await page.getByRole('link', { name: /data.*table/i }).click();

      // Aguardar carregamento do componente
      await page.waitForSelector('[data-testid="storybook-iframe"]');

      // Executar auditoria de acessibilidade
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Verificar se não há violações críticas ou sérias
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });
  });

  test.describe('Storybook Vue Components', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:7007');
    });

    test('Button Vue - Acessibilidade WCAG 2.1 AA', async ({ page }) => {
      // Navegar para a página do Button
      await page.getByRole('link', { name: /button/i }).click();

      // Aguardar carregamento do componente
      await page.waitForSelector('[data-testid="storybook-iframe"]');

      // Executar auditoria de acessibilidade
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Verificar se não há violações críticas ou sérias
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('StatusDropdown Vue - Acessibilidade WCAG 2.1 AA', async ({ page }) => {
      // Navegar para a página do StatusDropdown
      await page.getByRole('link', { name: /status.*dropdown/i }).click();

      // Aguardar carregamento do componente
      await page.waitForSelector('[data-testid="storybook-iframe"]');

      // Executar auditoria de acessibilidade
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Verificar se não há violações críticas ou sérias
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });
  });

  test.describe('Dashboard React - Acessibilidade Completa', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000');
    });

    test('Página principal - Acessibilidade WCAG 2.1 AA', async ({ page }) => {
      // Aguardar carregamento da página
      await page.waitForLoadState('networkidle');

      // Executar auditoria completa de acessibilidade
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Gerar relatório detalhado
      console.log('=== RELATÓRIO DE ACESSIBILIDADE ===');
      console.log(`Total de violações: ${accessibilityScanResults.violations.length}`);
      console.log(`Testes aprovados: ${accessibilityScanResults.passes.length}`);
      console.log(`Testes incompletos: ${accessibilityScanResults.incomplete.length}`);
      console.log(`Testes não aplicáveis: ${accessibilityScanResults.inapplicable.length}`);

      // Agrupar violações por impacto
      const violationsByImpact = accessibilityScanResults.violations.reduce((acc, violation) => {
        acc[violation.impact] = (acc[violation.impact] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('\nViolações por impacto:');
      Object.entries(violationsByImpact).forEach(([impact, count]) => {
        console.log(`- ${impact}: ${count}`);
      });

      // Calcular pontuação (similar ao Lighthouse)
      const weights = { critical: 10, serious: 7, moderate: 4, minor: 1 };
      const totalPenalty = Object.entries(violationsByImpact).reduce((total, [impact, count]) => {
        return total + (weights[impact as keyof typeof weights] || 0) * count;
      }, 0);

      const score = Math.max(0, 100 - totalPenalty);
      const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

      console.log(`\nPontuação de acessibilidade: ${score}/100 (Nota ${grade})`);

      // Verificar se não há violações críticas
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical'
      );

      if (criticalViolations.length > 0) {
        console.log('\n🚨 VIOLAÇÕES CRÍTICAS ENCONTRADAS:');
        criticalViolations.forEach(violation => {
          console.log(`\n- ${violation.id}: ${violation.description}`);
          console.log(`  Regra WCAG: ${violation.tags.join(', ')}`);
          console.log(`  Elementos afetados: ${violation.nodes.length}`);
          console.log(`  Ajuda: ${violation.help}`);
          console.log(`  URL: ${violation.helpUrl}`);
        });
      }

      // Para WCAG 2.1 AA, violações críticas são inaceitáveis
      expect(criticalViolations).toHaveLength(0);

      // Permitir até 5 violações sérias para AA (dependendo da complexidade)
      const seriousViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'serious'
      );

      expect(seriousViolations.length).toBeLessThanOrEqual(5);
    });

    test('Navegação por teclado - Componentes interativos', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      // Testar navegação por Tab nos botões
      await page.keyboard.press('Tab');
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);

      // Continuar navegando
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100); // Pequena pausa para estabilidade
      }

      // Verificar se conseguimos focar elementos interativos
      const focusedElements = await page.$$('[tabindex]:not([tabindex="-1"])');
      expect(focusedElements.length).toBeGreaterThan(0);
    });

    test('Contraste de cores - Cumprimento WCAG', async ({ page }) => {
      await page.waitForLoadState('networkidle');

      // Executar apenas testes de contraste
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      const contrastViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'color-contrast'
      );

      if (contrastViolations.length > 0) {
        console.log('Violações de contraste encontradas:');
        contrastViolations.forEach(violation => {
          console.log(`- ${violation.description}`);
          violation.nodes.forEach(node => {
            console.log(`  Elemento: ${node.target.join(' > ')}`);
          });
        });
      }

      // Para AA, podemos permitir algumas violações de contraste em elementos decorativos
      expect(contrastViolations.length).toBeLessThanOrEqual(3);
    });
  });

  test.describe('Relatórios de Regressão', () => {
    test('Comparação com baseline de acessibilidade', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Baseline esperado (ajuste conforme necessário)
      const expectedMaxViolations = {
        critical: 0,
        serious: 5,
        moderate: 15,
        minor: 30
      };

      const violationsByImpact = accessibilityScanResults.violations.reduce((acc, violation) => {
        acc[violation.impact] = (acc[violation.impact] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Verificar se não regredimos além do baseline
      Object.entries(expectedMaxViolations).forEach(([impact, maxAllowed]) => {
        const actual = violationsByImpact[impact] || 0;
        expect(actual).toBeLessThanOrEqual(maxAllowed);
      });

      // Salvar resultados para análise posterior
      const report = {
        timestamp: new Date().toISOString(),
        url: page.url(),
        violations: violationsByImpact,
        totalViolations: accessibilityScanResults.violations.length,
        score: Math.max(0, 100 - Object.entries(violationsByImpact).reduce((total, [impact, count]) => {
          const weights = { critical: 10, serious: 7, moderate: 4, minor: 1 };
          return total + (weights[impact as keyof typeof weights] || 0) * count;
        }, 0))
      };

      console.log('Relatório de acessibilidade salvo:', JSON.stringify(report, null, 2));
    });
  });
});