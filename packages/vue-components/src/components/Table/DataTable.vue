<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface TableRow {
  campaign: string;
  status: "Ativa" | "Pausada" | "Rascunho";
  budget: string;
  cpa: string;
  updatedAt: string;
}

interface Props {
  rows?: TableRow[];
}

const props = withDefaults(defineProps<Props>(), {
  rows: () => [
    { campaign: "Always-on Leads Latam", status: "Ativa", budget: "R$ 32.000", cpa: "R$ 28,50", updatedAt: "há 2h" },
    { campaign: "Black Friday Awareness", status: "Pausada", budget: "R$ 18.500", cpa: "R$ 35,20", updatedAt: "há 1d" },
    { campaign: "Retenção base CRM", status: "Ativa", budget: "R$ 12.000", cpa: "R$ 18,70", updatedAt: "há 4h" },
    { campaign: "Teste criativos short", status: "Rascunho", budget: "-", cpa: "-", updatedAt: "há 15min" },
  ],
});

const getStatusStyle = (status: TableRow["status"]) => {
  const styles = {
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
  return styles[status];
};
</script>

<template>
  <div :style="{
    borderRadius: tokens.radii.lg,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    overflow: 'hidden',
    backgroundColor: tokens.aliases.surface,
    boxShadow: tokens.shadows.card,
  }">
    <table :style="{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: tokens.typography.sizeSM,
    }">
      <thead>
        <tr>
          <th :style="{
            textAlign: 'left',
            fontSize: tokens.typography.sizeXS,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: tokens.colors.slate500,
            padding: tokens.spacing.sm,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            Campanha
          </th>
          <th :style="{
            textAlign: 'left',
            fontSize: tokens.typography.sizeXS,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: tokens.colors.slate500,
            padding: tokens.spacing.sm,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            Status
          </th>
          <th :style="{
            textAlign: 'left',
            fontSize: tokens.typography.sizeXS,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: tokens.colors.slate500,
            padding: tokens.spacing.sm,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            Orçamento
          </th>
          <th :style="{
            textAlign: 'left',
            fontSize: tokens.typography.sizeXS,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: tokens.colors.slate500,
            padding: tokens.spacing.sm,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            CPA
          </th>
          <th :style="{
            textAlign: 'left',
            fontSize: tokens.typography.sizeXS,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: tokens.colors.slate500,
            padding: tokens.spacing.sm,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            Atualização
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.campaign">
          <td :style="{
            padding: tokens.spacing.sm,
            fontWeight: Number(tokens.typography.weightMedium),
            color: tokens.colors.slate900,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            {{ row.campaign }}
          </td>
          <td :style="{
            padding: tokens.spacing.sm,
            color: tokens.colors.slate600,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            <span :style="{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingInline: tokens.spacing.sm,
              paddingBlock: tokens.spacing['2xs'],
              borderRadius: tokens.radii.full,
              fontSize: tokens.typography.sizeXS,
              fontWeight: Number(tokens.typography.weightMedium),
              ...getStatusStyle(row.status),
            }">
              {{ row.status }}
            </span>
          </td>
          <td :style="{
            padding: tokens.spacing.sm,
            color: tokens.colors.slate600,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            {{ row.budget }}
          </td>
          <td :style="{
            padding: tokens.spacing.sm,
            color: tokens.colors.slate600,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            {{ row.cpa }}
          </td>
          <td :style="{
            padding: tokens.spacing.sm,
            color: tokens.colors.slate600,
            borderBottom: `1px solid ${tokens.aliases.borderSoft}`,
          }">
            {{ row.updatedAt }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
