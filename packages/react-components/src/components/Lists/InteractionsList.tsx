import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface Interaction {
  id: string;
  type: 'message' | 'call' | 'email';
  contact: string;
  time: string;
  status: 'success' | 'pending' | 'failed';
  message?: string;
}

interface InteractionsListProps {
  interactions?: Interaction[];
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  padding: tokens.spacing.xl,
  boxShadow: tokens.shadows.card,
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
};

const titleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const viewAllStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.primary600,
  cursor: 'pointer',
  textDecoration: 'underline',
};

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.md,
};

const itemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  padding: tokens.spacing.md,
  borderRadius: tokens.radii.md,
  backgroundColor: tokens.colors.slate50,
};

const iconStyle: CSSProperties = {
  fontSize: tokens.typography.sizeLG,
};

const contentStyle: CSSProperties = {
  flex: 1,
};

const contactStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const messageStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate600,
  margin: 0,
};

const timeStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'success':
      return tokens.colors.success600;
    case 'pending':
      return tokens.colors.primary500;
    case 'failed':
      return tokens.colors.danger500;
    default:
      return tokens.colors.slate500;
  }
};

const getTypeIcon = (type: string): string => {
  switch (type) {
    case 'message':
      return '💬';
    case 'call':
      return '📞';
    case 'email':
      return '✉️';
    default:
      return '📝';
  }
};

export function InteractionsList({ interactions = [] }: InteractionsListProps) {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Interações Recentes</h3>
        <span style={viewAllStyle}>Ver todas</span>
      </div>

      <div style={listStyle}>
        {interactions.length === 0 ? (
          <div style={{ textAlign: 'center', color: tokens.colors.slate400, padding: tokens.spacing.lg }}>
            Nenhuma interação recente
          </div>
        ) : (
          interactions.slice(0, 5).map((interaction) => (
            <div key={interaction.id} style={itemStyle}>
              <span style={iconStyle}>{getTypeIcon(interaction.type)}</span>
              <div style={contentStyle}>
                <p style={contactStyle}>{interaction.contact}</p>
                {interaction.message && (
                  <p style={messageStyle}>{interaction.message}</p>
                )}
              </div>
              <span style={{ ...timeStyle, color: getStatusColor(interaction.status) }}>
                {interaction.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}