<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface Sale {
  id: string;
  client: string;
  value: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  product: string;
}

const props = withDefaults(
  defineProps<{
    sales?: Sale[];
  }>(),
  {
    sales: () => [],
  },
);

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing.lg,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  padding: tokens.spacing.xl,
  boxShadow: tokens.shadows.card,
};

const headerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
};

const titleStyle = {
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const subtitleStyle = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
  margin: 0,
};

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.full,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
  color: tokens.colors.success600,
  backgroundColor: tokens.colors.success100,
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing.md,
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: tokens.spacing.md,
  borderRadius: tokens.radii.md,
  backgroundColor: tokens.colors.slate50,
};

const leftContentStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing['2xs'],
};

const clientStyle = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const productStyle = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate600,
  margin: 0,
};

const rightContentStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'flex-end',
  gap: tokens.spacing['2xs'],
};

const valueStyle = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const dateStyle = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
  margin: 0,
};

const emptyStateStyle = {
  textAlign: 'center' as const,
  color: tokens.colors.slate400,
  padding: tokens.spacing.lg,
};

const getStatusColor = (status: string) => {
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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
</script>

<template>
  <section :style="containerStyle">
    <div :style="headerStyle">
      <div>
        <h3 :style="titleStyle">Vendas Recentes</h3>
        <p :style="subtitleStyle">Ultimas transacoes</p>
      </div>
      <span :style="badgeStyle">R$ 45.230</span>
    </div>

    <div :style="listStyle">
      <template v-if="props.sales.length === 0">
        <div :style="emptyStateStyle">Nenhuma venda recente</div>
      </template>
      <template v-else>
        <div
          v-for="sale in props.sales.slice(0, 5)"
          :key="sale.id"
          :style="itemStyle"
        >
          <div :style="leftContentStyle">
            <p :style="clientStyle">{{ sale.client }}</p>
            <p :style="productStyle">{{ sale.product }}</p>
          </div>
          <div :style="rightContentStyle">
            <p :style="valueStyle">{{ formatCurrency(sale.value) }}</p>
            <p :style="{ ...dateStyle, color: getStatusColor(sale.status) }">
              {{ sale.date }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
