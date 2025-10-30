import type { AxeResults, Result } from 'axe-core';

export interface AccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    target: string[];
    html: string;
    failureSummary: string;
  }>;
  tags: string[];
}

export interface AccessibilityReport {
  violations: AccessibilityViolation[];
  passes: Array<{
    id: string;
    description: string;
    help: string;
    nodes: Array<{
      target: string[];
      html: string;
    }>;
  }>;
  incomplete: Array<{
    id: string;
    description: string;
    help: string;
    nodes: Array<{
      target: string[];
      html: string;
    }>;
  }>;
  inapplicable: Array<{
    id: string;
    description: string;
  }>;
  timestamp: Date;
  url?: string;
  component?: string;
}

export interface AccessibilityAuditOptions {
  component?: string;
  url?: string;
  rules?: string[];
  includeIncomplete?: boolean;
}

export class AccessibilityAuditService {
  private static instance: AccessibilityAuditService;

  public static getInstance(): AccessibilityAuditService {
    if (!AccessibilityAuditService.instance) {
      AccessibilityAuditService.instance = new AccessibilityAuditService();
    }
    return AccessibilityAuditService.instance;
  }

  /**
   * Executa auditoria de acessibilidade em um elemento DOM
   */
  async auditElement(
    element: HTMLElement,
    options: AccessibilityAuditOptions = {}
  ): Promise<AccessibilityReport> {
    // Importa axe-core dinamicamente para evitar problemas de build
    const axe = await this.loadAxeCore();

    const axeOptions = {
      rules: options.rules || [
        'color-contrast',
        'aria-roles',
        'aria-label',
        'button-name',
        'image-alt',
        'link-name',
        'heading-order',
        'keyboard-navigation',
        'focus-visible',
        'tabindex'
      ]
    };

    const results: AxeResults = await axe.run(element, axeOptions);

    return this.formatResults(results, options);
  }

  /**
   * Executa auditoria de acessibilidade na página inteira
   */
  async auditPage(options: AccessibilityAuditOptions = {}): Promise<AccessibilityReport> {
    const axe = await this.loadAxeCore();

    const axeOptions = {
      rules: options.rules || [
        'color-contrast',
        'aria-roles',
        'aria-label',
        'button-name',
        'image-alt',
        'link-name',
        'heading-order',
        'keyboard-navigation',
        'focus-visible',
        'tabindex',
        'region',
        'skip-link',
        'heading-order',
        'page-has-heading-one'
      ]
    };

    const results: AxeResults = await axe.run(document, axeOptions);

    return this.formatResults(results, {
      ...options,
      url: window.location.href
    });
  }

  /**
   * Carrega axe-core dinamicamente
   */
  private async loadAxeCore(): Promise<any> {
    if (typeof window === 'undefined') {
      throw new Error('AccessibilityAuditService só funciona no navegador');
    }

    // Verifica se axe já está carregado
    if ((window as any).axe) {
      return (window as any).axe;
    }

    // Carrega axe-core via CDN
    await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js');

    // Aguarda axe estar disponível
    let attempts = 0;
    while (!(window as any).axe && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    if (!(window as any).axe) {
      throw new Error('Falha ao carregar axe-core');
    }

    return (window as any).axe;
  }

  /**
   * Carrega script dinamicamente
   */
  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Falha ao carregar script: ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Formata resultados do axe-core para o formato interno
   */
  private formatResults(
    results: AxeResults,
    options: AccessibilityAuditOptions
  ): AccessibilityReport {
    return {
      violations: results.violations.map(violation => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map(node => ({
          target: node.target,
          html: node.html,
          failureSummary: node.failureSummary
        })),
        tags: violation.tags
      })),
      passes: results.passes.map(pass => ({
        id: pass.id,
        description: pass.description,
        help: pass.help,
        nodes: pass.nodes.map(node => ({
          target: node.target,
          html: node.html
        }))
      })),
      incomplete: results.incomplete.map(incomplete => ({
        id: incomplete.id,
        description: incomplete.description,
        help: incomplete.help,
        nodes: incomplete.nodes.map(node => ({
          target: node.target,
          html: node.html
        }))
      })),
      inapplicable: results.inapplicable.map(inapplicable => ({
        id: inapplicable.id,
        description: inapplicable.description
      })),
      timestamp: new Date(),
      url: options.url,
      component: options.component
    };
  }

  /**
   * Calcula pontuação de acessibilidade baseada nas violações
   */
  calculateAccessibilityScore(report: AccessibilityReport): {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    violationsByImpact: Record<string, number>;
  } {
    const violationsByImpact = report.violations.reduce((acc, violation) => {
      acc[violation.impact] = (acc[violation.impact] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Pontuação baseada na severidade das violações
    const weights = {
      critical: 10,
      serious: 7,
      moderate: 4,
      minor: 1
    };

    const totalPenalty = Object.entries(violationsByImpact).reduce((total, [impact, count]) => {
      return total + (weights[impact as keyof typeof weights] || 0) * count;
    }, 0);

    // Pontuação base de 100, penalizada pelas violações
    const score = Math.max(0, 100 - totalPenalty);

    let grade: 'A' | 'B' | 'C' | 'D' | 'F';
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else grade = 'F';

    return {
      score: Math.round(score),
      grade,
      violationsByImpact
    };
  }

  /**
   * Gera relatório HTML formatado
   */
  generateHTMLReport(report: AccessibilityReport): string {
    const { score, grade } = this.calculateAccessibilityScore(report);

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório de Acessibilidade - ${report.component || 'Página'}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
          .score { font-size: 48px; font-weight: bold; margin: 10px 0; }
          .grade { font-size: 24px; opacity: 0.9; }
          .summary { padding: 30px; border-bottom: 1px solid #eee; }
          .violations { padding: 30px; }
          .violation { margin-bottom: 20px; padding: 20px; border-radius: 6px; border-left: 4px solid; }
          .violation.critical { border-color: #dc3545; background: #f8d7da; }
          .violation.serious { border-color: #fd7e14; background: #fff3cd; }
          .violation.moderate { border-color: #ffc107; background: #fff3cd; }
          .violation.minor { border-color: #17a2b8; background: #d1ecf1; }
          .violation h3 { margin: 0 0 10px 0; color: #333; }
          .violation p { margin: 5px 0; }
          .help-link { color: #007bff; text-decoration: none; }
          .help-link:hover { text-decoration: underline; }
          .stats { display: flex; gap: 20px; margin-top: 20px; }
          .stat { text-align: center; }
          .stat-number { font-size: 24px; font-weight: bold; color: #333; }
          .stat-label { color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Relatório de Acessibilidade</h1>
            <div class="score">${score}/100</div>
            <div class="grade">Nota ${grade}</div>
            <div>Componente: ${report.component || 'Página completa'}</div>
            <div>Data: ${report.timestamp.toLocaleString('pt-BR')}</div>
          </div>

          <div class="summary">
            <h2>Resumo</h2>
            <div class="stats">
              <div class="stat">
                <div class="stat-number">${report.violations.length}</div>
                <div class="stat-label">Violações</div>
              </div>
              <div class="stat">
                <div class="stat-number">${report.passes.length}</div>
                <div class="stat-label">Testes Aprovados</div>
              </div>
              <div class="stat">
                <div class="stat-number">${report.incomplete.length}</div>
                <div class="stat-label">Incompletos</div>
              </div>
            </div>
          </div>

          <div class="violations">
            <h2>Violações (${report.violations.length})</h2>
            ${report.violations.length === 0
              ? '<p>🎉 Nenhuma violação de acessibilidade encontrada!</p>'
              : report.violations.map(violation => `
                <div class="violation ${violation.impact}">
                  <h3>${violation.description}</h3>
                  <p><strong>Impacto:</strong> ${violation.impact}</p>
                  <p><strong>Ajuda:</strong> ${violation.help}</p>
                  <p><a href="${violation.helpUrl}" class="help-link" target="_blank">Saiba mais</a></p>
                  <p><strong>Elementos afetados:</strong> ${violation.nodes.length}</p>
                  ${violation.nodes.slice(0, 3).map(node => `
                    <details>
                      <summary>Elemento: ${node.target.join(' > ')}</summary>
                      <pre>${node.html}</pre>
                      <p><em>${node.failureSummary}</em></p>
                    </details>
                  `).join('')}
                </div>
              `).join('')
            }
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const accessibilityAuditService = AccessibilityAuditService.getInstance();