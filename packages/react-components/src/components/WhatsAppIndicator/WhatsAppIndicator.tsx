import { tokens } from "@adsmagic/tokens";
import type {
  CSSProperties,
  ReactNode,
} from "react";

export interface WhatsAppIndicatorProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    type: "positive" | "negative" | "neutral";
  };
  icon?: ReactNode;
}

const trendStyles: Record<"positive" | "negative" | "neutral", CSSProperties> = {
  positive: {
    color: tokens.colors.success600,
  },
  negative: {
    color: tokens.colors.danger600,
  },
  neutral: {
    color: tokens.colors.slate600,
  },
};

const baseStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
  padding: tokens.spacing.md,
  backgroundColor: tokens.colors.white,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  boxShadow: tokens.shadows.card,
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const titleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: tokens.typography.weightMedium,
  color: tokens.colors.slate600,
};

const valueStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXL,
  fontWeight: tokens.typography.weightSemibold,
  color: tokens.colors.slate900,
};

const subtitleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

const trendStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  fontWeight: tokens.typography.weightMedium,
};

function WhatsAppIndicator({
  title,
  value,
  subtitle,
  trend,
  icon,
}: WhatsAppIndicatorProps) {
  return (
    <div style={baseStyle}>
      <div style={headerStyle}>
        <span style={titleStyle}>{title}</span>
        {icon && <div>{icon}</div>}
      </div>
      <div style={valueStyle}>{value}</div>
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
      {trend && (
        <div style={{ ...trendStyle, ...trendStyles[trend.type] }}>
          {trend.value}
        </div>
      )}
    </div>
  );
}

export { WhatsAppIndicator };