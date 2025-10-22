import { tokens } from '@adsmagic/tokens';
import type { CSSProperties, ReactNode } from 'react';

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.lg,
  backgroundColor: tokens.aliases.surface,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  boxShadow: tokens.shadows.card,
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightMedium),
  color: tokens.colors.slate600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const valueStyle: CSSProperties = {
  margin: 0,
  fontSize: tokens.typography.sizeXL,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
};

const metaStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing['2xs'],
  fontSize: tokens.typography.sizeXS,
};

const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

export interface CardBaseProps {
  title: string;
  value: string;
  meta?: ReactNode;
  caption?: string;
  footerNote?: string;
  actions?: ReactNode;
}

export function CardBase({ title, value, meta, caption, footerNote, actions }: CardBaseProps) {
  return (
    <article style={containerStyle}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <div>
          <h3 style={titleStyle}>{title}</h3>
          <p style={valueStyle}>{value}</p>
        </div>
        {actions}
      </header>

      {meta ? <div style={metaStyle}>{meta}</div> : null}

      {caption ? (
        <p
          style={{
            margin: 0,
            fontSize: tokens.typography.sizeSM,
            color: tokens.colors.slate600,
            lineHeight: 1.5,
          }}
        >
          {caption}
        </p>
      ) : null}

      {footerNote ? <footer style={footerStyle}>{footerNote}</footer> : null}
    </article>
  );
}
