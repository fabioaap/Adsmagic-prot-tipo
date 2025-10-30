import React, { useState, useEffect } from 'react';
import { tokens } from '@adsmagic/tokens';
import { budgetService, PerformanceBudget, BudgetResult } from '../services/budgetService';
import { PerformanceMetric } from '../hooks/usePerformanceMonitoring';

interface PerformanceBudgetsProps {
  metrics?: PerformanceMetric[];
  onClose?: () => void;
}

export const PerformanceBudgets: React.FC<PerformanceBudgetsProps> = ({
  metrics = [],
  onClose
}) => {
  const [budgets, setBudgets] = useState<PerformanceBudget[]>([]);
  const [budgetResults, setBudgetResults] = useState<BudgetResult[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newBudget, setNewBudget] = useState<Partial<PerformanceBudget>>({
    name: '',
    metric: 'LCP',
    budget: 0,
    unit: 'ms',
    severity: 'warning',
    enabled: true,
    description: ''
  });

  useEffect(() => {
    setBudgets(budgetService.getBudgets());
    updateBudgetResults();
  }, [metrics]);

  const updateBudgetResults = () => {
    const results = budgetService.evaluateBudgets(metrics);
    setBudgetResults(results);
  };

  const handleSaveBudget = () => {
    if (!newBudget.name || !newBudget.metric) return;

    const budget: PerformanceBudget = {
      id: isEditing || `budget-${Date.now()}`,
      name: newBudget.name!,
      metric: newBudget.metric!,
      budget: newBudget.budget!,
      unit: newBudget.unit!,
      severity: newBudget.severity!,
      enabled: newBudget.enabled ?? true,
      description: newBudget.description
    };

    if (isEditing) {
      budgetService.updateBudget(isEditing, budget);
    } else {
      budgetService.addBudget(budget);
    }

    setBudgets(budgetService.getBudgets());
    updateBudgetResults();
    setIsEditing(null);
    resetNewBudget();
  };

  const resetNewBudget = () => {
    setNewBudget({
      name: '',
      metric: 'LCP',
      budget: 0,
      unit: 'ms',
      severity: 'warning',
      enabled: true,
      description: ''
    });
  };

  const handleEditBudget = (budget: PerformanceBudget) => {
    setIsEditing(budget.id);
    setNewBudget(budget);
  };

  const handleDeleteBudget = (budgetId: string) => {
    budgetService.removeBudget(budgetId);
    setBudgets(budgetService.getBudgets());
    updateBudgetResults();
  };

  const handleToggleBudget = (budgetId: string) => {
    const budget = budgets.find(b => b.id === budgetId);
    if (budget) {
      budgetService.updateBudget(budgetId, { enabled: !budget.enabled });
      setBudgets(budgetService.getBudgets());
      updateBudgetResults();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return tokens.colors.success600;
      case 'warning': return tokens.colors.warning600;
      case 'fail': return tokens.colors.danger600;
      default: return tokens.colors.slate500;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✅';
      case 'warning': return '⚠️';
      case 'fail': return '❌';
      default: return '❓';
    }
  };

  const summary = budgetService.getBudgetSummary(budgetResults);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
            💰 Orçamentos de Performance
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {/* Resumo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: tokens.colors.slate900 }}>
              {summary.score}%
            </div>
            <div style={{ fontSize: '14px', color: tokens.colors.slate600 }}>
              Score Geral
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: tokens.colors.success600 }}>
              {summary.passed}
            </div>
            <div style={{ fontSize: '14px', color: tokens.colors.slate600 }}>
              Aprovados
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: tokens.colors.warning600 }}>
              {summary.warnings}
            </div>
            <div style={{ fontSize: '14px', color: tokens.colors.slate600 }}>
              Avisos
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: tokens.colors.danger600 }}>
              {summary.failures}
            </div>
            <div style={{ fontSize: '14px', color: tokens.colors.slate600 }}>
              Falhas
            </div>
          </div>
        </div>

        {/* Formulário de novo orçamento */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
            {isEditing ? 'Editar Orçamento' : 'Novo Orçamento'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Nome
              </label>
              <input
                type="text"
                value={newBudget.name || ''}
                onChange={(e) => setNewBudget(prev => ({ ...prev, name: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Métrica
              </label>
              <select
                value={newBudget.metric || 'LCP'}
                onChange={(e) => setNewBudget(prev => ({ ...prev, metric: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              >
                <option value="LCP">LCP (Largest Contentful Paint)</option>
                <option value="INP">INP (Interaction to Next Paint)</option>
                <option value="FCP">FCP (First Contentful Paint)</option>
                <option value="CLS">CLS (Cumulative Layout Shift)</option>
                <option value="TTFB">TTFB (Time to First Byte)</option>
                <option value="bundle_size">Bundle Size</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Unidade
              </label>
              <select
                value={newBudget.unit || 'ms'}
                onChange={(e) => setNewBudget(prev => ({ ...prev, unit: e.target.value as 'ms' | 'score' | 'bytes' }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              >
                <option value="ms">Milissegundos</option>
                <option value="score">Score (0-1)</option>
                <option value="bytes">Bytes</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Orçamento
              </label>
              <input
                type="number"
                step={newBudget.unit === 'score' ? '0.01' : '1'}
                value={newBudget.budget || 0}
                onChange={(e) => setNewBudget(prev => ({ ...prev, budget: parseFloat(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Severidade
              </label>
              <select
                value={newBudget.severity || 'warning'}
                onChange={(e) => setNewBudget(prev => ({ ...prev, severity: e.target.value as 'warning' | 'error' }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              >
                <option value="warning">Aviso</option>
                <option value="error">Erro</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'end' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={newBudget.enabled ?? true}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, enabled: e.target.checked }))}
                  style={{ marginRight: '8px' }}
                />
                Ativo
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Descrição
            </label>
            <textarea
              value={newBudget.description || ''}
              onChange={(e) => setNewBudget(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição opcional do orçamento..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                minHeight: '60px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSaveBudget}
              style={{
                padding: '8px 16px',
                backgroundColor: tokens.colors.primary600,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Atualizar' : 'Criar'} Orçamento
            </button>

            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(null);
                  resetNewBudget();
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Lista de orçamentos */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Orçamentos Ativos</h3>

          {budgets.length === 0 ? (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
              Nenhum orçamento configurado ainda.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {budgets.map((budget) => {
                const result = budgetResults.find(r => r.budget.id === budget.id);

                return (
                  <div key={budget.id} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: budget.enabled ? '#f9fafb' : '#fef2f2'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                            {budget.name}
                          </h4>
                          {result && (
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              backgroundColor: getStatusColor(result.status),
                              color: 'white'
                            }}>
                              {getStatusIcon(result.status)} {result.status.toUpperCase()}
                            </span>
                          )}
                        </div>

                        <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>
                          {budget.metric}: {budget.budget} {budget.unit}
                          {' • '}
                          Severidade: {budget.severity}
                          {' • '}
                          {budget.enabled ? 'Ativo' : 'Inativo'}
                        </p>

                        {budget.description && (
                          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#374151' }}>
                            {budget.description}
                          </p>
                        )}

                        {result && (
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>
                            Atual: {result.current.toFixed(2)} {budget.unit}
                            {result.difference !== 0 && (
                              <span style={{
                                color: result.difference > 0 ? tokens.colors.danger600 : tokens.colors.success600,
                                marginLeft: '8px'
                              }}>
                                ({result.difference > 0 ? '+' : ''}{result.difference.toFixed(2)} {budget.unit}, {result.percentage.toFixed(1)}%)
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                        <button
                          onClick={() => handleToggleBudget(budget.id)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: budget.enabled ? '#10b981' : '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          {budget.enabled ? 'Desativar' : 'Ativar'}
                        </button>
                        <button
                          onClick={() => handleEditBudget(budget)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteBudget(budget.id)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};