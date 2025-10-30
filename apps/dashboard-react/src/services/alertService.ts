import { PerformanceMetric } from '../hooks/usePerformanceMonitoring';

export interface AlertChannel {
  type: 'email' | 'slack' | 'webhook';
  config: {
    webhookUrl?: string;
    emailTo?: string;
    slackChannel?: string;
  };
}

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'gt' | 'lt' | 'eq';
  threshold: number;
  severity: 'warning' | 'error' | 'critical';
  channels: AlertChannel[];
  enabled: boolean;
  cooldownMinutes: number; // Evitar spam de alertas
}

export interface Alert {
  id: string;
  ruleId: string;
  metric: PerformanceMetric;
  message: string;
  severity: 'warning' | 'error' | 'critical';
  timestamp: number;
  sent: boolean;
  sentAt?: number;
}

class AlertService {
  private rules: AlertRule[] = [];
  private alerts: Alert[] = [];
  private lastAlertTimes: Map<string, number> = new Map();

  constructor() {
    this.initializeDefaultRules();
  }

  private initializeDefaultRules() {
    // Regras padrão para métricas críticas
    this.rules = [
      {
        id: 'cls-critical',
        name: 'CLS Crítico',
        metric: 'CLS',
        condition: 'gt',
        threshold: 0.25,
        severity: 'critical',
        channels: [
          {
            type: 'slack',
            config: { slackChannel: '#alerts-performance' }
          },
          {
            type: 'email',
            config: { emailTo: 'dev-team@adsmagic.com' }
          }
        ],
        enabled: true,
        cooldownMinutes: 30
      },
      {
        id: 'inp-critical',
        name: 'INP Crítico',
        metric: 'INP',
        condition: 'gt',
        threshold: 200,
        severity: 'critical',
        channels: [
          {
            type: 'slack',
            config: { slackChannel: '#alerts-performance' }
          }
        ],
        enabled: true,
        cooldownMinutes: 15
      },
      {
        id: 'lcp-warning',
        name: 'LCP Alerta',
        metric: 'LCP',
        condition: 'gt',
        threshold: 2500,
        severity: 'warning',
        channels: [
          {
            type: 'webhook',
            config: { webhookUrl: process.env.REACT_APP_ALERT_WEBHOOK_URL }
          }
        ],
        enabled: true,
        cooldownMinutes: 60
      },
      {
        id: 'fcp-error',
        name: 'FCP Erro',
        metric: 'FCP',
        condition: 'gt',
        threshold: 2000,
        severity: 'error',
        channels: [
          {
            type: 'email',
            config: { emailTo: 'performance@adsmagic.com' }
          }
        ],
        enabled: true,
        cooldownMinutes: 45
      }
    ];
  }

  addRule(rule: AlertRule) {
    this.rules.push(rule);
  }

  updateRule(ruleId: string, updates: Partial<AlertRule>) {
    const index = this.rules.findIndex(r => r.id === ruleId);
    if (index !== -1) {
      this.rules[index] = { ...this.rules[index], ...updates };
    }
  }

  removeRule(ruleId: string) {
    this.rules = this.rules.filter(r => r.id !== ruleId);
  }

  getRules(): AlertRule[] {
    return [...this.rules];
  }

  getAlerts(): Alert[] {
    return [...this.alerts];
  }

  async checkMetrics(metrics: PerformanceMetric[]): Promise<Alert[]> {
    const newAlerts: Alert[] = [];

    for (const metric of metrics) {
      for (const rule of this.rules.filter(r => r.enabled)) {
        if (rule.metric === metric.name && this.shouldTriggerAlert(rule, metric)) {
          const alert = this.createAlert(rule, metric);
          newAlerts.push(alert);
          await this.sendAlert(alert, rule.channels);
        }
      }
    }

    this.alerts.push(...newAlerts);
    return newAlerts;
  }

  private shouldTriggerAlert(rule: AlertRule, metric: PerformanceMetric): boolean {
    // Verificar cooldown
    const lastAlertTime = this.lastAlertTimes.get(rule.id);
    if (lastAlertTime) {
      const cooldownMs = rule.cooldownMinutes * 60 * 1000;
      if (Date.now() - lastAlertTime < cooldownMs) {
        return false;
      }
    }

    // Verificar condição
    const value = metric.value;
    switch (rule.condition) {
      case 'gt':
        return value > rule.threshold;
      case 'lt':
        return value < rule.threshold;
      case 'eq':
        return Math.abs(value - rule.threshold) < 0.001; // Para floats
      default:
        return false;
    }
  }

  private createAlert(rule: AlertRule, metric: PerformanceMetric): Alert {
    const message = this.generateAlertMessage(rule, metric);

    return {
      id: `${rule.id}-${metric.timestamp}`,
      ruleId: rule.id,
      metric,
      message,
      severity: rule.severity,
      timestamp: metric.timestamp,
      sent: false
    };
  }

  private generateAlertMessage(rule: AlertRule, metric: PerformanceMetric): string {
    const formattedValue = metric.name.includes('CLS')
      ? metric.value.toFixed(3)
      : metric.value.toFixed(0) + (metric.name.includes('P') ? 'ms' : '');

    const descriptions = {
      CLS: `Layout instável detectado (${formattedValue}). Usuários podem estar experimentando mudanças visuais inesperadas.`,
      INP: `Interação lenta detectada (${formattedValue}). Usuários podem sentir atrasos ao interagir com a página.`,
      FCP: `Primeira renderização lenta (${formattedValue}). Usuários estão esperando muito para ver conteúdo.`,
      LCP: `Conteúdo principal lento (${formattedValue}). O elemento mais importante está demorando para carregar.`,
      TTFB: `Servidor lento (${formattedValue}). Há atrasos na resposta do servidor.`
    };

    return descriptions[metric.name as keyof typeof descriptions] || `Métrica crítica: ${metric.name} = ${formattedValue}`;
  }

  private async sendAlert(alert: Alert, channels: AlertChannel[]) {
    const promises = channels.map(channel => this.sendToChannel(alert, channel));

    try {
      await Promise.all(promises);
      alert.sent = true;
      alert.sentAt = Date.now();
      this.lastAlertTimes.set(alert.ruleId, Date.now());
    } catch (error) {
      console.error('Erro ao enviar alerta:', error);
    }
  }

  private async sendToChannel(alert: Alert, channel: AlertChannel) {
    const payload = {
      text: `🚨 *Alerta de Performance ${alert.severity.toUpperCase()}*`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `🚨 Alerta de Performance ${alert.severity.toUpperCase()}`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: alert.message
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Métrica:* ${alert.metric.name}`
            },
            {
              type: 'mrkdwn',
              text: `*Valor:* ${alert.metric.value.toFixed(2)}`
            },
            {
              type: 'mrkdwn',
              text: `*Timestamp:* ${new Date(alert.timestamp).toLocaleString('pt-BR')}`
            },
            {
              type: 'mrkdwn',
              text: `*Severidade:* ${alert.severity}`
            }
          ]
        }
      ]
    };

    switch (channel.type) {
      case 'slack':
        if (channel.config.webhookUrl) {
          await fetch(channel.config.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }
        break;

      case 'webhook':
        if (channel.config.webhookUrl) {
          await fetch(channel.config.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              alert,
              timestamp: new Date().toISOString()
            })
          });
        }
        break;

      case 'email':
        // Em produção, isso seria integrado com um serviço de email
        // Por enquanto, apenas log
        console.log(`📧 Email alert to ${channel.config.emailTo}:`, alert.message);
        break;
    }
  }

  // Método para configuração via variáveis de ambiente
  configureFromEnv() {
    const slackWebhook = process.env.REACT_APP_SLACK_WEBHOOK_URL;
    const emailTo = process.env.REACT_APP_ALERT_EMAIL_TO;
    const webhookUrl = process.env.REACT_APP_ALERT_WEBHOOK_URL;

    if (slackWebhook) {
      this.rules.forEach(rule => {
        rule.channels = rule.channels.map(channel => ({
          ...channel,
          config: { ...channel.config, webhookUrl: slackWebhook }
        }));
      });
    }

    if (emailTo) {
      this.rules.forEach(rule => {
        rule.channels = rule.channels.map(channel => ({
          ...channel,
          config: { ...channel.config, emailTo }
        }));
      });
    }

    if (webhookUrl) {
      this.rules.forEach(rule => {
        rule.channels = rule.channels.map(channel => ({
          ...channel,
          config: { ...channel.config, webhookUrl }
        }));
      });
    }
  }
}

export const alertService = new AlertService();