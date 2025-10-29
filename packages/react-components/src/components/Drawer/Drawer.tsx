import { tokens } from "@adsmagic/tokens";
import type {
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";

type DrawerVariant = "default" | "overlay";
type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: DrawerVariant;
  size?: DrawerSize;
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

const variantTokens: Record<DrawerVariant, CSSProperties> = {
  default: {
    backgroundColor: tokens.colors.white,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    boxShadow: tokens.shadows.card,
  },
  overlay: {
    backgroundColor: tokens.colors.white,
    boxShadow: tokens.shadows.pop,
  },
};

const sizeTokens: Record<DrawerSize, CSSProperties> = {
  sm: {
    width: "300px",
  },
  md: {
    width: "400px",
  },
  lg: {
    width: "500px",
  },
};

const baseStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  fontFamily: tokens.typography.familySans,
  transition: `transform ${tokens.transitions.base}`,
};

function DrawerInner(
  {
    children,
    variant = "default",
    size = "md",
    isOpen = false,
    onClose,
    style,
    ...rest
  }: DrawerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const composedStyle: CSSProperties = {
    ...baseStyle,
    ...sizeTokens[size],
    ...variantTokens[variant],
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    ...style,
  };

  return (
    <>
      {isOpen && variant === "overlay" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={onClose}
        />
      )}
      {isOpen && (
        <div ref={ref} style={composedStyle} {...rest}>
          {children}
        </div>
      )}
    </>
  );
}

export const Drawer = forwardRef(DrawerInner);
Drawer.displayName = "Drawer";