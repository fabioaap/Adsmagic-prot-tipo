import { tokens } from '@adsmagic/tokens';
import { Bell, MessageCircle, Plus, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Button } from '../Button/Button';

const containerStyle: CSSProperties = {
  width: '100%',
  backgroundColor: tokens.aliases.surface,
  borderRadius: tokens.radii.lg,
  boxShadow: `${tokens.shadows.card}`,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  padding: tokens.spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.lg,
  flexWrap: 'wrap',
};

const avatarStyle: CSSProperties = {
  height: '3rem',
  width: '3rem',
  borderRadius: tokens.radii.full,
  background: tokens.colors.primary100,
  color: tokens.colors.primary600,
  fontWeight: Number(tokens.typography.weightSemibold),
  fontSize: tokens.typography.sizeSM,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const statusPillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.spacing['2xs'],
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
  borderRadius: tokens.radii.full,
  backgroundColor: tokens.colors.success100,
  color: tokens.colors.success600,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  letterSpacing: '0.04em',
};

const activityListStyle: CSSProperties = {
  display: 'flex',
  gap: tokens.spacing.lg,
  flexWrap: 'wrap',
};

const activityCardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing['2xs'],
};

const activityLabelStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const activityValueStyle: CSSProperties = {
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
};

const buttonGroupStyle: CSSProperties = {
  display: 'flex',
  gap: tokens.spacing.sm,
  flexWrap: 'wrap',
};

export function Header() {
  return (
    <header style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
          <span style={avatarStyle}>AG</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }}>
            <div style={statusPillStyle}>
              <Sparkles size={14} />
              Workspace ativo
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: tokens.typography.sizeLG,
                fontWeight: Number(tokens.typography.weightSemibold),
                color: tokens.colors.slate900,
              }}
            >
              Central de operacoes Adsmagic
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: tokens.typography.sizeSM,
                color: tokens.colors.slate600,
              }}
            >
              Orquestre campanhas, integracoes e automatizacoes em um unico painel.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm, alignItems: 'flex-end' }}>
          <div style={activityListStyle}>
            <div style={activityCardStyle}>
              <span style={activityLabelStyle}>Campanhas</span>
              <span style={activityValueStyle}>128 ativas</span>
            </div>
            <div style={activityCardStyle}>
              <span style={activityLabelStyle}>Conversoes</span>
              <span style={activityValueStyle}>+18% semana</span>
            </div>
            <div style={activityCardStyle}>
              <span style={activityLabelStyle}>Integracoes</span>
              <span style={activityValueStyle}>9 conectadas</span>
            </div>
          </div>

          <div style={buttonGroupStyle}>
            <Button size="sm" variant="ghost" leadingIcon={<Bell size={16} />}>
              Alertas
            </Button>
            <Button size="sm" variant="ghost" leadingIcon={<MessageCircle size={16} />}>
              Caixa de entrada
            </Button>
            <Button size="sm" variant="secondary" leadingIcon={<Plus size={16} />}>
              Nova campanha
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

