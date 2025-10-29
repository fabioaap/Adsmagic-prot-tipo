import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface SummaryCardProps {
  label: string;
  value: string;
  caption: string;
  badge: string;
  badgeType: "positive" | "negative";
  style?: CSSProperties;
}

const cardStyle: CSSProperties = {
  borderRadius: tokens.radii.lg,
  backgroundColor: tokens.aliases.surface,
  padding: tokens.spacing.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  boxShadow: tokens.shadows.card,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const labelStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: tokens.colors.slate500,
  margin: 0,
};

const badgeBaseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.full,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
};

const badgeVariants = {
  positive: {
    color: tokens.colors.success600,
    backgroundColor: tokens.colors.success100,
  },
  negative: {
    color: tokens.colors.danger500,
    backgroundColor: tokens.colors.danger100,
  },
} satisfies Record<string, CSSProperties>;

const valueStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXL,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const captionStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.slate600,
  margin: 0,
};

export function SummaryCard({
  label,
  value,
  caption,
  badge,
  badgeType,
  style = {}
}: SummaryCardProps) {
  const badgeStyle: CSSProperties = {
    ...badgeBaseStyle,
    ...badgeVariants[badgeType],
  };

  return (
    <article style={{ ...cardStyle, ...style }}>
      <header style={headerStyle}>
        <p style={labelStyle}>{label}</p>
        <span style={badgeStyle}>{badge}</span>
      </header>
      <p style={valueStyle}>{value}</p>
      <p style={captionStyle}>{caption}</p>
    </article>
  );
}