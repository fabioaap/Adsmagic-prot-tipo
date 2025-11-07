import React, { useState, useEffect } from 'react';
import { alertService, AlertRule, AlertChannel } from '../services/alertService';

interface AlertConfigurationProps {
  onClose?: () => void;
}

const alertFieldIds = {
  name: 'alert-config-name',
  metric: 'alert-config-metric',
  condition: 'alert-config-condition',
  threshold: 'alert-config-threshold',
  severity: 'alert-config-severity',
  cooldown: 'alert-config-cooldown',
  channelsGroup: 'alert-config-channels',
} as const;

const srOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export const AlertConfiguration: React.FC<AlertConfigurationProps> = ({ onClose }) => {
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    name: '',
    metric: 'CLS',
    condition: 'gt',
    threshold: 0,
    severity: 'warning',
    channels: [],
    enabled: true,
    cooldownMinutes: 30
  });

  useEffect(() => {
    setRules(alertService.getRules());
  }, []);

  const handleSaveRule = () => {
    if (!newRule.name || !newRule.metric) return;

    const rule: AlertRule = {
      id: isEditing || `rule-${Date.now()}`,
      name: newRule.name!,
      metric: newRule.metric!,
      condition: newRule.condition!,
      threshold: newRule.threshold!,
      severity: newRule.severity!,
      channels: newRule.channels || [],
      enabled: newRule.enabled ?? true,
      cooldownMinutes: newRule.cooldownMinutes || 30
    };

    if (isEditing) {
      alertService.updateRule(isEditing, rule);
    } else {
      alertService.addRule(rule);
    }

    setRules(alertService.getRules());
    setIsEditing(null);
    setNewRule({
      name: '',
      metric: 'CLS',
      condition: 'gt',
      threshold: 0,
      severity: 'warning',
      channels: [],
      enabled: true,
      cooldownMinutes: 30
    });
  };

  const handleEditRule = (rule: AlertRule) => {
    setIsEditing(rule.id);
    setNewRule(rule);
  };

  const handleDeleteRule = (ruleId: string) => {
    alertService.removeRule(ruleId);
    setRules(alertService.getRules());
  };

  const handleAddChannel = () => {
    setNewRule(prev => ({
      ...prev,
      channels: [
        ...(prev.channels || []),
        { type: 'slack', config: {} }
      ]
    }));
  };

  const handleUpdateChannel = (index: number, channel: AlertChannel) => {
    setNewRule(prev => ({
      ...prev,
      channels: prev.channels?.map((c, i) => i === index ? channel : c) || []
    }));
  };

  const handleRemoveChannel = (index: number) => {
    setNewRule(prev => ({
      ...prev,
      channels: prev.channels?.filter((_, i) => i !== index) || []
    }));
  };

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
        maxWidth: '800px',
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
            Configuração de Alertas
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

        {/* Formulário de nova regra */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
            {isEditing ? 'Editar Regra' : 'Nova Regra'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label
                htmlFor={alertFieldIds.name}
                style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}
              >
                Nome da Regra
              </label>
              <input
                id={alertFieldIds.name}
                type="text"
                value={newRule.name || ''}
                onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div>
              <label htmlFor={alertFieldIds.metric} style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Métrica
              </label>
              <select
                id={alertFieldIds.metric}
                value={newRule.metric || 'CLS'}
                onChange={(e) => setNewRule(prev => ({ ...prev, metric: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              >
                <option value="CLS">CLS (Layout Shift)</option>
                <option value="INP">INP (Interaction)</option>
                <option value="FCP">FCP (First Paint)</option>
                <option value="LCP">LCP (Largest Paint)</option>
                <option value="TTFB">TTFB (Time to First Byte)</option>
              </select>
            </div>

            <div>
              <label htmlFor={alertFieldIds.condition} style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Condição
              </label>
              <select
                id={alertFieldIds.condition}
                value={newRule.condition || 'gt'}
                onChange={(e) => setNewRule(prev => ({ ...prev, condition: e.target.value as 'gt' | 'lt' | 'eq' }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              >
                <option value="gt">Maior que</option>
                <option value="lt">Menor que</option>
                <option value="eq">Igual a</option>
              </select>
            </div>

            <div>
              <label htmlFor={alertFieldIds.threshold} style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Limite
              </label>
              <input
                id={alertFieldIds.threshold}
                type="number"
                step="0.01"
                value={newRule.threshold || 0}
                onChange={(e) => setNewRule(prev => ({ ...prev, threshold: parseFloat(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div>
              <label htmlFor={alertFieldIds.severity} style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Severidade
              </label>
              <select
                id={alertFieldIds.severity}
                value={newRule.severity || 'warning'}
                onChange={(e) => setNewRule(prev => ({ ...prev, severity: e.target.value as 'warning' | 'error' | 'critical' }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              >
                <option value="warning">Aviso</option>
                <option value="error">Erro</option>
                <option value="critical">Crítico</option>
              </select>
            </div>

            <div>
              <label htmlFor={alertFieldIds.cooldown} style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Cooldown (minutos)
              </label>
              <input
                id={alertFieldIds.cooldown}
                type="number"
                value={newRule.cooldownMinutes || 30}
                onChange={(e) => setNewRule(prev => ({ ...prev, cooldownMinutes: parseInt(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>

          {/* Canais de notificação */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label id={alertFieldIds.channelsGroup} style={{ fontWeight: '500' }}>Canais de Notificação</label>
              <button
                onClick={handleAddChannel}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                + Adicionar Canal
              </button>
            </div>

            {newRule.channels?.map((channel, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '8px',
                padding: '8px',
                backgroundColor: '#f9fafb',
                borderRadius: '4px'
              }}>
                <label htmlFor={`alert-channel-type-${index}`} style={srOnlyStyle}>
                  Tipo de canal {index + 1}
                </label>
                <select
                  id={`alert-channel-type-${index}`}
                  value={channel.type}
                  onChange={(e) => handleUpdateChannel(index, {
                    ...channel,
                    type: e.target.value as 'email' | 'slack' | 'webhook'
                  })}
                  style={{ padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  aria-describedby={alertFieldIds.channelsGroup}
                >
                  <option value="slack">Slack</option>
                  <option value="email">Email</option>
                  <option value="webhook">Webhook</option>
                </select>

                {channel.type === 'slack' && (
                  <input
                    aria-label={`URL do webhook do Slack do canal ${index + 1}`}
                    type="text"
                    placeholder="Webhook URL do Slack"
                    value={channel.config.webhookUrl || ''}
                    onChange={(e) => handleUpdateChannel(index, {
                      ...channel,
                      config: { ...channel.config, webhookUrl: e.target.value }
                    })}
                    style={{ flex: 1, padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  />
                )}

                {channel.type === 'email' && (
                  <input
                    aria-label={`Email destinatário do canal ${index + 1}`}
                    type="email"
                    placeholder="Email destinatário"
                    value={channel.config.emailTo || ''}
                    onChange={(e) => handleUpdateChannel(index, {
                      ...channel,
                      config: { ...channel.config, emailTo: e.target.value }
                    })}
                    style={{ flex: 1, padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  />
                )}

                {channel.type === 'webhook' && (
                  <input
                    aria-label={`URL do webhook do canal ${index + 1}`}
                    type="url"
                    placeholder="URL do Webhook"
                    value={channel.config.webhookUrl || ''}
                    onChange={(e) => handleUpdateChannel(index, {
                      ...channel,
                      config: { ...channel.config, webhookUrl: e.target.value }
                    })}
                    style={{ flex: 1, padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  />
                )}

                <button
                  onClick={() => handleRemoveChannel(index)}
                  style={{
                    padding: '4px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSaveRule}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Atualizar' : 'Criar'} Regra
            </button>

            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(null);
                  setNewRule({
                    name: '',
                    metric: 'CLS',
                    condition: 'gt',
                    threshold: 0,
                    severity: 'warning',
                    channels: [],
                    enabled: true,
                    cooldownMinutes: 30
                  });
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

        {/* Lista de regras existentes */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Regras Ativas</h3>

          {rules.length === 0 ? (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
              Nenhuma regra configurada ainda.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {rules.map((rule) => (
                <div key={rule.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: rule.enabled ? '#f9fafb' : '#fef2f2'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                        {rule.name}
                      </h4>
                      <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>
                        {rule.metric} {rule.condition === 'gt' ? '>' : rule.condition === 'lt' ? '<' : '='} {rule.threshold}
                        {' • '}
                        Severidade: {rule.severity}
                        {' • '}
                        Cooldown: {rule.cooldownMinutes}min
                      </p>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {rule.channels.map((channel, index) => (
                          <span key={index} style={{
                            padding: '2px 6px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {channel.type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditRule(rule)}
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
                        onClick={() => handleDeleteRule(rule.id)}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
