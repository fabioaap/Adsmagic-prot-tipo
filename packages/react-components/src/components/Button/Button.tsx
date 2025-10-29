import { tokens } from "@adsmagic/tokens";
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardedRef,
  ReactNode,
} from "react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const variantTokens: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: tokens.colors.primary600,
    color: tokens.colors.white,
    boxShadow: tokens.shadows.pill,
  },
  secondary: {
    backgroundColor: tokens.colors.primary100,
    color: tokens.colors.primary600,
    boxShadow: tokens.shadows.card,
  },
  ghost: {
    backgroundColor: "transparent",
    color: tokens.colors.slate600,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    boxShadow: "none",
  },
};

const sizeTokens: Record<ButtonSize, CSSProperties> = {
  sm: {
    fontSize: tokens.typography.sizeXS,
    paddingInline: tokens.spacing.md,
    paddingBlock: tokens.spacing.xs,
  },
  md: {
    fontSize: tokens.typography.sizeSM,
    paddingInline: tokens.spacing.lg,
    paddingBlock: tokens.spacing.sm,
  },
};

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.spacing.xs,
  borderRadius: tokens.radii.full,
  border: "none",
  fontFamily: tokens.typography.familySans,
  fontWeight: Number(tokens.typography.weightSemibold),
  lineHeight: 1.2,
  transition: `transform ${tokens.transitions.base}, box-shadow ${tokens.transitions.base}`,
  cursor: "pointer",
};

const iconStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
};

function ButtonInner(
  {
    children,
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    style,
    ...rest
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const composedStyle: CSSProperties = {
    ...baseStyle,
    ...sizeTokens[size],
    ...variantTokens[variant],
    ...style,
  };

  return (
    <button ref={ref} style={composedStyle} {...rest}>
      {leadingIcon ? <span style={iconStyle}>{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span style={iconStyle}>{trailingIcon}</span> : null}
    </button>
  );
}

export const Button = forwardRef(ButtonInner);
Button.displayName = "Button";
