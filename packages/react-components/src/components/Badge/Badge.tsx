import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface BadgeProps {
  variant?: "primary" | "success" | "neutral" | "danger";
  label: string;
}

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

const variantStyles = {
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

export function Badge({ variant = "primary", label }: BadgeProps) {
  const badgeStyle: CSSProperties = {
    ...badgeBase,
    ...variantStyles[variant],
  };

  return <span style={badgeStyle}>{label}</span>;
}