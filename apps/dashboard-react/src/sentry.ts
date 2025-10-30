import * as Sentry from '@sentry/react';

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN || 'https://your-dsn-here@sentry.io/project-id',
    integrations: [],
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Configurações de ambiente
    environment: process.env.NODE_ENV || 'development',
    release: process.env.REACT_APP_VERSION || '1.0.0',

    // Configurações de erro
    beforeSend(event, hint) {
      // Filtrar erros de desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.log('🚨 Sentry event (dev mode):', event);
        return null; // Não enviar em dev
      }

      // Adicionar contexto adicional
      if (event.exception) {
        event.tags = {
          ...event.tags,
          component_stack: hint.originalException?.componentStack,
        };
      }

      return event;
    },

    // Configurações de performance
    beforeSendTransaction(event) {
      // Filtrar transações desnecessárias
      if (event.transaction?.includes('healthcheck')) {
        return null;
      }
      return event;
    },
  });

  console.log('🔧 Sentry inicializado com sucesso');
};

// Função para capturar erros customizados
export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    tags: {
      error_type: 'custom_error',
    },
    extra: context,
  });
};

// Função para adicionar contexto do usuário
export const setUserContext = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
};

// Função para adicionar tags customizadas
export const setTags = (tags: Record<string, string>) => {
  Sentry.setTags(tags);
};

// Função para adicionar contexto extra
export const setExtra = (extra: Record<string, any>) => {
  Sentry.setExtra('context', extra);
};