import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface FunnelStep {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface FunnelChartProps {
  data?: FunnelStep[];
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  padding: tokens.spacing.xl,
  boxShadow: tokens.shadows.card,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
};

const titleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const subtitleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
  margin: 0,
};

const badgeStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.full,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
  color: tokens.colors.success600,
  backgroundColor: tokens.colors.success100,
};

const chartContainerStyle: CSSProperties = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const funnelChartStyle: CSSProperties = {
  display: 'flex',
  height: '12rem',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.lg,
  backgroundColor: tokens.colors.slate50,
  color: tokens.colors.slate400,
  fontSize: tokens.typography.sizeSM,
};

export function FunnelChart({ data = [] }: FunnelChartProps) {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Funil de Vendas</h2>
          <p style={subtitleStyle}>Conversão por etapa</p>
        </div>
        <span style={badgeStyle}>+8,2%</span>
      </div>

      <div style={chartContainerStyle}>
        <div style={funnelChartStyle}>
          Gráfico de funil (implementar com recharts ou similar)
        </div>
      </div>
    </div>
  );
}