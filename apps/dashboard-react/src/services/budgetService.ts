import { PerformanceMetric } from '../hooks/usePerformanceMonitoring';

export interface PerformanceBudget {
  id: string;
  name: string;
  metric: string;
  budget: number; // valor limite
  unit: 'ms' | 'score' | 'bytes';
  severity: 'warning' | 'error';
  enabled: boolean;
  description?: string;
}

export interface BudgetResult {
  budget: PerformanceBudget;
  current: number;
  status: 'pass' | 'warning' | 'fail';
  difference: number; // diferença do orçamento (positivo = ruim)
  percentage: number; // percentual acima/abaixo do orçamento
}

class PerformanceBudgetService {
  private budgets: PerformanceBudget[] = [];

  constructor() {
    this.initializeDefaultBudgets();
  }

  private initializeDefaultBudgets() {
    this.budgets = [
      {
        id: 'lcp-budget',
        name: 'Largest Contentful Paint',
        metric: 'LCP',
        budget: 2500,
        unit: 'ms',
        severity: 'error',
        enabled: true,
        description: 'Conteúdo principal deve carregar em até 2.5s'
      },
      {
        id: 'fid-budget',
        name: 'First Input Delay',
        metric: 'INP',
        budget: 100,
        unit: 'ms',
        severity: 'error',
        enabled: true,
        description: 'Interações devem responder em até 100ms'
      },
      {
        id: 'cls-budget',
        name: 'Cumulative Layout Shift',
        metric: 'CLS',
        budget: 0.1,
        unit: 'score',
        severity: 'error',
        enabled: true,
        description: 'Layout deve ser estável (máximo 0.1)'
      },
      {
        id: 'fcp-budget',
        name: 'First Contentful Paint',
        metric: 'FCP',
        budget: 1800,
        unit: 'ms',
        severity: 'warning',
        enabled: true,
        description: 'Primeiro conteúdo deve aparecer em até 1.8s'
      },
      {
        id: 'ttfb-budget',
        name: 'Time to First Byte',
        metric: 'TTFB',
        budget: 600,
        unit: 'ms',
        severity: 'warning',
        enabled: true,
        description: 'Servidor deve responder em até 600ms'
      },
      {
        id: 'bundle-budget',
        name: 'Bundle Size',
        metric: 'bundle_size',
        budget: 500,
        unit: 'bytes',
        severity: 'warning',
        enabled: true,
        description: 'Bundle principal deve ser menor que 500KB'
      }
    ];
  }

  addBudget(budget: PerformanceBudget) {
    this.budgets.push(budget);
  }

  updateBudget(budgetId: string, updates: Partial<PerformanceBudget>) {
    const index = this.budgets.findIndex(b => b.id === budgetId);
    if (index !== -1) {
      this.budgets[index] = { ...this.budgets[index], ...updates };
    }
  }

  removeBudget(budgetId: string) {
    this.budgets = this.budgets.filter(b => b.id !== budgetId);
  }

  getBudgets(): PerformanceBudget[] {
    return [...this.budgets];
  }

  getEnabledBudgets(): PerformanceBudget[] {
    return this.budgets.filter(b => b.enabled);
  }

  evaluateBudgets(metrics: PerformanceMetric[]): BudgetResult[] {
    const results: BudgetResult[] = [];

    for (const budget of this.getEnabledBudgets()) {
      const metric = metrics.find(m => m.name === budget.metric);
      if (!metric) continue;

      const result = this.evaluateBudget(budget, metric);
      results.push(result);
    }

    return results;
  }

  private evaluateBudget(budget: PerformanceBudget, metric: PerformanceMetric): BudgetResult {
    const current = metric.value;
    const budgetValue = budget.budget;

    let difference: number;
    let percentage: number;
    let status: 'pass' | 'warning' | 'fail';

    if (budget.metric === 'CLS') {
      // Para CLS, menor é melhor
      difference = current - budgetValue;
      percentage = (difference / budgetValue) * 100;

      if (current <= budgetValue) {
        status = 'pass';
      } else if (budget.severity === 'error') {
        status = 'fail';
      } else {
        status = 'warning';
      }
    } else {
      // Para outras métricas (tempo), menor é melhor
      difference = current - budgetValue;
      percentage = (difference / budgetValue) * 100;

      if (current <= budgetValue) {
        status = 'pass';
      } else if (budget.severity === 'error') {
        status = 'fail';
      } else {
        status = 'warning';
      }
    }

    return {
      budget,
      current,
      status,
      difference,
      percentage
    };
  }

  getBudgetSummary(results: BudgetResult[]) {
    const summary = {
      total: results.length,
      passed: results.filter(r => r.status === 'pass').length,
      warnings: results.filter(r => r.status === 'warning').length,
      failures: results.filter(r => r.status === 'fail').length,
      score: 0
    };

    summary.score = Math.round((summary.passed / summary.total) * 100);
    return summary;
  }

  // Método para verificar se budgets foram excedidos e gerar alertas
  checkBudgetAlerts(metrics: PerformanceMetric[]): BudgetResult[] {
    const results = this.evaluateBudgets(metrics);
    const failedBudgets = results.filter(r => r.status === 'fail');

    // Aqui poderia integrar com o alertService para enviar notificações
    if (failedBudgets.length > 0) {
      console.warn('🚨 Orçamentos de performance excedidos:', failedBudgets);
    }

    return results;
  }

  // Método para exportar configuração (útil para CI/CD)
  exportBudgets(): string {
    return JSON.stringify(this.budgets, null, 2);
  }

  // Método para importar configuração
  importBudgets(config: string) {
    try {
      const imported = JSON.parse(config);
      if (Array.isArray(imported)) {
        this.budgets = imported;
      }
    } catch (error) {
      console.error('Erro ao importar configuração de budgets:', error);
    }
  }
}

export const budgetService = new PerformanceBudgetService();