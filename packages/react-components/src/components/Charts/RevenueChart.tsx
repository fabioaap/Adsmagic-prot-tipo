import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface RevenueData {
  name: string;
  value: number;
  color: string;
}

interface RevenueChartProps {
  data?: RevenueData[];
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

const pieChartStyle: CSSProperties = {
  display: 'flex',
  height: '12rem',
  width: '12rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `8px solid ${tokens.colors.primary500}`,
  backgroundColor: tokens.aliases.surface,
  color: tokens.colors.slate400,
};

const pieCenterStyle: CSSProperties = {
  textAlign: 'center',
};

const percentageStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXL,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
};

const labelStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
};

const bottomTextStyle: CSSProperties = {
  marginTop: tokens.spacing.lg,
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.slate500,
  textAlign: 'center',
};

const bottomValueStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXL,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  textAlign: 'center',
  margin: 0,
};

export function RevenueChart({ data = [] }: RevenueChartProps) {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Receita</h2>
          <p style={subtitleStyle}>Comparativo com meta</p>
        </div>
        <span style={badgeStyle}>+5,3%</span>
      </div>

      <div style={chartContainerStyle}>
        <div style={pieChartStyle}>
          <div style={pieCenterStyle}>
            <div style={percentageStyle}>82%</div>
            <div style={labelStyle}>Meta atingida</div>
          </div>
        </div>
        <p style={bottomTextStyle}>Meta mensal atingida em</p>
        <p style={bottomValueStyle}>82%</p>
      </div>
    </div>
  );
}