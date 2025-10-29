import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";

interface TableRow {
  campaign: string;
  status: 'Ativa' | 'Pausada' | 'Rascunho';
  budget: string;
  cpa: string;
  updatedAt: string;
}

const rows: TableRow[] = [
  { campaign: 'Always-on Leads Latam', status: 'Ativa', budget: 'R$ 32.000', cpa: 'R$ 28,50', updatedAt: 'ha 2h' },
  { campaign: 'Black Friday Awareness', status: 'Pausada', budget: 'R$ 18.500', cpa: 'R$ 35,20', updatedAt: 'ha 1d' },
  { campaign: 'Retencao base CRM', status: 'Ativa', budget: 'R$ 12.000', cpa: 'R$ 18,70', updatedAt: 'ha 4h' },
  { campaign: 'Teste criativos short', status: 'Rascunho', budget: '-', cpa: '-', updatedAt: 'ha 15min' },
];

const containerStyle: CSSProperties = {
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  overflow: 'hidden',
  backgroundColor: tokens.aliases.surface,
  boxShadow: tokens.shadows.card,
};

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: tokens.typography.sizeSM,
};

const headCellStyle: CSSProperties = {
  textAlign: 'left',
  fontSize: tokens.typography.sizeXS,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: tokens.colors.slate500,
  padding: tokens.spacing.sm,
  borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
};

const cellStyle: CSSProperties = {
  padding: tokens.spacing.sm,
  color: tokens.colors.slate600,
  borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
};

const statusStyles: Record<TableRow['status'], CSSProperties> = {
  Ativa: {
    color: tokens.colors.success600,
    backgroundColor: tokens.colors.success100,
  },
  Pausada: {
    color: tokens.colors.danger500,
    backgroundColor: tokens.colors.danger100,
  },
  Rascunho: {
    color: tokens.colors.primary600,
    backgroundColor: tokens.colors.primary100,
  },
};

export function DataTable() {
  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headCellStyle}>Campanha</th>
            <th style={headCellStyle}>Status</th>
            <th style={headCellStyle}>Orcamento</th>
            <th style={headCellStyle}>CPA</th>
            <th style={headCellStyle}>Atualizacao</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.campaign}>
              <td style={{ ...cellStyle, fontWeight: Number(tokens.typography.weightMedium), color: tokens.colors.slate900 }}>{row.campaign}</td>
              <td style={cellStyle}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingInline: tokens.spacing.sm,
                    paddingBlock: tokens.spacing['2xs'],
                    borderRadius: tokens.radii.full,
                    fontSize: tokens.typography.sizeXS,
                    fontWeight: Number(tokens.typography.weightMedium),
                    ...statusStyles[row.status],
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td style={cellStyle}>{row.budget}</td>
              <td style={cellStyle}>{row.cpa}</td>
              <td style={cellStyle}>{row.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

