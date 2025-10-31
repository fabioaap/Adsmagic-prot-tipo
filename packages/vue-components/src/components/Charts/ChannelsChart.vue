<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface ChannelData {
  name: string;
  value: number;
  color: string;
}

withDefaults(
  defineProps<{
    data?: ChannelData[];
  }>(),
  {
    data: () => [],
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

const chartContainerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
};

const barChartStyle = {
  display: 'flex',
  height: '12rem',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.lg,
  backgroundColor: tokens.colors.slate50,
  color: tokens.colors.slate400,
  fontSize: tokens.typography.sizeSM,
  textAlign: 'center' as const,
};
</script>

<template>
  <section :style="containerStyle">
    <div :style="headerStyle">
      <div>
        <h2 :style="titleStyle">Canais</h2>
        <p :style="subtitleStyle">Performance por canal</p>
      </div>
      <span :style="badgeStyle">+12,5%</span>
    </div>

    <div :style="chartContainerStyle">
      <div :style="barChartStyle">
        Grafico de barras (implementar com biblioteca de chart)
      </div>
    </div>
  </section>
</template>
