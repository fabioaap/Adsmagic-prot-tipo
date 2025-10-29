import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string;
  caption: string;
  badge: string;
  badgeType: 'positive' | 'negative';
  style?: React.CSSProperties;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, caption, badge, badgeType, style }) => (
  <article className="summary-card card-shadow" style={style}>
    <header className="summary-card-header">
      <p className="summary-card-label">{label}</p>
      <span className={`summary-card-badge summary-card-badge--${badgeType === 'positive' ? 'positive' : 'negative'}`}>
        {badge}
      </span>
    </header>
    <p className="summary-card-value">{value}</p>
    <p className="summary-card-caption">{caption}</p>
  </article>
);