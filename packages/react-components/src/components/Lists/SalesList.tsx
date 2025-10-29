import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface Sale {
  id: string;
  client: string;
  value: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  product: string;
}

interface SalesListProps {
  sales?: Sale[];
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
  justifyContent: 'space-between',
  padding: tokens.spacing.md,
  borderRadius: tokens.radii.md,
  backgroundColor: tokens.colors.slate50,
};

const leftContentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing['2xs'],
};

const clientStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const productStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate600,
  margin: 0,
};

const rightContentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: tokens.spacing['2xs'],
};

const valueStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const dateStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
  margin: 0,
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return tokens.colors.success600;
    case 'pending':
      return tokens.colors.primary500;
    case 'cancelled':
      return tokens.colors.danger500;
    default:
      return tokens.colors.slate500;
  }
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export function SalesList({ sales = [] }: SalesListProps) {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Vendas Recentes</h3>
        <span style={viewAllStyle}>Ver todas</span>
      </div>

      <div style={listStyle}>
        {sales.length === 0 ? (
          <div style={{ textAlign: 'center', color: tokens.colors.slate400, padding: tokens.spacing.lg }}>
            Nenhuma venda recente
          </div>
        ) : (
          sales.slice(0, 5).map((sale) => (
            <div key={sale.id} style={itemStyle}>
              <div style={leftContentStyle}>
                <p style={clientStyle}>{sale.client}</p>
                <p style={productStyle}>{sale.product}</p>
              </div>
              <div style={rightContentStyle}>
                <p style={valueStyle}>{formatCurrency(sale.value)}</p>
                <p style={{ ...dateStyle, color: getStatusColor(sale.status) }}>
                  {sale.date}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}