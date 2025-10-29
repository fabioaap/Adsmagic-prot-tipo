import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface ContactsSalesData {
  week: string;
  contacts: number;
  sales: number;
}

interface ContactsSalesChartProps {
  data?: ContactsSalesData[];
}

const containerStyle: CSSProperties = {
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  padding: tokens.spacing.lg,
  boxShadow: tokens.shadows.card,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: tokens.spacing.xl,
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

const exportButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  paddingInline: tokens.spacing.md,
  paddingBlock: tokens.spacing.sm,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  color: tokens.colors.slate600,
  backgroundColor: 'transparent',
  cursor: 'pointer',
};

const exportButtonHoverStyle: CSSProperties = {
  ...exportButtonStyle,
  backgroundColor: tokens.colors.slate50,
};

const contentStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: tokens.spacing.xl,
};

const chartContainerStyle: CSSProperties = {
  flex: 1,
  height: '14rem',
  overflow: 'auto',
};

const chartPlaceholderStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.colors.slate400,
  fontSize: tokens.typography.sizeSM,
};

const xAxisStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate400,
  marginTop: tokens.spacing.lg,
};

const statsContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
  width: '9rem',
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

const statItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing['2xs'],
};

const statLabelStyle: CSSProperties = {
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const statValueStyle: CSSProperties = {
  fontSize: tokens.typography.sizeMD,
  fontWeight: Number(tokens.typography.weightSemibold),
  margin: 0,
};

export function ContactsSalesChart({ data = [] }: ContactsSalesChartProps) {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Contatos e Vendas</h2>
          <p style={subtitleStyle}>Volume por semana</p>
        </div>
        <button
          style={exportButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = tokens.colors.slate50;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Exportar CSV
        </button>
      </div>

      <div style={contentStyle}>
        <div style={chartContainerStyle}>
          <div style={chartPlaceholderStyle}>
            Gráfico de linha (implementar com recharts ou similar)
          </div>
          <div style={xAxisStyle}>
            <span>Fev</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>Mai</span>
          </div>
        </div>

        <div style={statsContainerStyle}>
          <div style={statItemStyle}>
            <p style={statLabelStyle}>Contatos</p>
            <p>Semana atual</p>
            <p style={{ ...statValueStyle, color: tokens.colors.primary600 }}>273</p>
          </div>
          <div style={statItemStyle}>
            <p style={statLabelStyle}>Vendas</p>
            <p>Semana atual</p>
            <p style={{ ...statValueStyle, color: tokens.colors.success600 }}>78</p>
          </div>
        </div>
      </div>
    </div>
  );
}