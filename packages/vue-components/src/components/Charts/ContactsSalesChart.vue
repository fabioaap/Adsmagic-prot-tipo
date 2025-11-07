<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface ContactsSalesData {
  week: string;
  contacts: number;
  sales: number;
}

withDefaults(
  defineProps<{
    data?: ContactsSalesData[];
  }>(),
  {
    data: () => [],
  },
);

const containerStyle = {
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  padding: tokens.spacing.lg,
  boxShadow: tokens.shadows.card,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing.lg,
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

const exportButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  paddingInline: tokens.spacing.md,
  paddingBlock: tokens.spacing.sm,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  color: tokens.colors.slate600,
  backgroundColor: 'transparent',
  cursor: 'pointer',
};

const contentStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: tokens.spacing.xl,
};

const chartContainerStyle = {
  flex: 1,
  height: '14rem',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing.lg,
};

const chartPlaceholderStyle = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.colors.slate400,
  fontSize: tokens.typography.sizeSM,
};

const xAxisStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate400,
};

const statsContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing.lg,
  width: '9rem',
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

const statItemStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing['2xs'],
};

const statLabelStyle = {
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const statValueStyle = {
  fontSize: tokens.typography.sizeMD,
  fontWeight: Number(tokens.typography.weightSemibold),
  margin: 0,
};
</script>

<template>
  <section :style="containerStyle">
    <div :style="headerStyle">
      <div>
        <h2 :style="titleStyle">Contatos e Vendas</h2>
        <p :style="subtitleStyle">Volume por semana</p>
      </div>
      <button
        type="button"
        :style="exportButtonStyle"
        @mouseenter="(event) => (event.currentTarget as HTMLButtonElement).style.backgroundColor = tokens.colors.slate50"
        @mouseleave="(event) => (event.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'"
      >
        Exportar CSV
      </button>
    </div>

    <div :style="contentStyle">
      <div :style="chartContainerStyle">
        <div :style="chartPlaceholderStyle">
          Grafico de linha (implementar com biblioteca de chart)
        </div>
        <div :style="xAxisStyle">
          <span>Fev</span>
          <span>Mar</span>
          <span>Abr</span>
          <span>Mai</span>
        </div>
      </div>

      <aside :style="statsContainerStyle">
        <div :style="statItemStyle">
          <p :style="statLabelStyle">Contatos</p>
          <p>Semana atual</p>
          <p :style="{ ...statValueStyle, color: tokens.colors.primary600 }">273</p>
        </div>
        <div :style="statItemStyle">
          <p :style="statLabelStyle">Vendas</p>
          <p>Semana atual</p>
          <p :style="{ ...statValueStyle, color: tokens.colors.success600 }">78</p>
        </div>
      </aside>
    </div>
  </section>
</template>
