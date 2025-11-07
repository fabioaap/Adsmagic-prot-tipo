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
  loading?: boolean;
  loadingText?: string;
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
    loading = false,
    loadingText,
    style,
    disabled,
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

  // Determina se o botao possui texto acessivel
  const hasAccessibleText = Boolean(children || rest["aria-label"] || rest["aria-labelledby"]);

  // Se o botao tem apenas icones e nenhum texto, esconde os icones dos leitores de tela
  const iconAriaHidden = !hasAccessibleText && Boolean(leadingIcon || trailingIcon);

  return (
    <button
      ref={ref}
      style={composedStyle}
      disabled={disabled || loading}
      aria-disabled={disabled || loading ? true : undefined}
      {...rest}
    >
      {loading ? (
        <>
          <span style={iconStyle} aria-hidden={true}>⟳</span>
          <span>{loadingText || "Carregando..."}</span>
        </>
      ) : (
        <>
          {leadingIcon ? (
            <span style={iconStyle} aria-hidden={iconAriaHidden ? true : undefined}>
              {leadingIcon}
            </span>
          ) : null}
          <span>{children}</span>
          {trailingIcon ? (
            <span style={iconStyle} aria-hidden={iconAriaHidden ? true : undefined}>
              {trailingIcon}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
}

export const Button = forwardRef(ButtonInner);
Button.displayName = "Button";

