import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

const badgeBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: tokens.radii.full,
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  lineHeight: 1.2,
};

const BADGE_VARIANTS = {
  primary: {
    backgroundColor: tokens.colors.primary100,
    color: tokens.colors.primary600,
  },
  success: {
    backgroundColor: tokens.colors.success100,
    color: tokens.colors.success600,
  },
  neutral: {
    backgroundColor: tokens.colors.slate100,
    color: tokens.colors.slate600,
  },
  danger: {
    backgroundColor: tokens.colors.danger100,
    color: tokens.colors.danger500,
  },
} satisfies Record<string, CSSProperties>;

const wrapperStyle: CSSProperties = {
  display: 'flex',
  gap: tokens.spacing.sm,
  flexWrap: 'wrap',
};

export function BadgeShowcase() {
  return (
    <div style={wrapperStyle}>
      <span style={{ ...badgeBase, ...BADGE_VARIANTS.primary }}>Campanha ativa</span>
      <span style={{ ...badgeBase, ...BADGE_VARIANTS.success }}>Conversao +12%</span>
      <span style={{ ...badgeBase, ...BADGE_VARIANTS.neutral }}>Em moderacao</span>
      <span style={{ ...badgeBase, ...BADGE_VARIANTS.danger }}>Pendencia SLA</span>
    </div>
  );
}

