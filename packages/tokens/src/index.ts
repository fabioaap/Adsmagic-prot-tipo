export type Scale<T extends Record<string, string>> = T;

export const typography = {
  familySans:
    '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  size2XS: '0.625rem',
  sizeXS: '0.75rem',
  sizeSM: '0.875rem',
  sizeMD: '1rem',
  sizeLG: '1.25rem',
  sizeXL: '1.5rem',
  size2XL: '2rem',
  size3XL: '2.5rem',
  weightRegular: '400',
  weightMedium: '500',
  weightSemibold: '600',
  weightBold: '700',
} as const;

export const colors = {
  white: '#ffffff',
  slate950: '#020617',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  primary600: '#2563eb',
  primary500: '#3b82f6',
  primary100: '#e0f2fe',
  indigo500: '#4f46e5',
  indigo100: '#e0e7ff',
  success600: '#059669',
  success500: '#22c55e',
  success100: '#d1fae5',
  warning600: '#d97706',
  warning500: '#f59e0b',
  warning100: '#fef3c7',
  danger600: '#b91c1c',
  danger500: '#f43f5e',
  danger200: '#fecdd3',
  danger700: '#991b1b',
  danger100: '#fee2e2',
  info600: '#0284c7',
  info500: '#0ea5e9',
  info100: '#e0f2fe',
  secondary600: '#6b7280',
  error500: '#f43f5e',
  gray600: '#4b5563',
  gray500: '#6b7280',
  gray100: '#f3f4f6',
} as const;

export const spacing = {
  '2xs': '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
} as const;

export const radii = {
  full: '999px',
  lg: '1.5rem',
  md: '1rem',
  sm: '0.75rem',
} as const;

export const borderRadius = {
  ...radii,
} as const;

export const shadows = {
  card: '0px 10px 32px rgba(15, 23, 42, 0.06)',
  pop: '0px 28px 50px -28px rgba(79, 70, 229, 0.25)',
  pill: '0px 8px 24px rgba(59, 130, 246, 0.35)',
} as const;

export const transitions = {
  base: '150ms ease',
} as const;

export const aliases = {
  fontSans: 'var(--font-family-sans)',
  pageBackground: 'var(--color-slate-100)',
  pageText: 'var(--color-slate-900)',
  surface: 'var(--color-white)',
  borderSoft: 'var(--color-slate-200)',
  borderStrong: '#cbd5e1',
} as const;

export const tokens = {
  typography,
  colors,
  spacing,
  radii,
  borderRadius,
  shadows,
  transitions,
  aliases,
};

export type Tokens = typeof tokens;

export default tokens;
