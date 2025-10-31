<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface RevenueData {
  name: string;
  value: number;
  color: string;
}

withDefaults(
  defineProps<{
    data?: RevenueData[];
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
  gap: tokens.spacing.sm,
};

const pieChartStyle = {
  display: 'flex',
  height: '12rem',
  width: '12rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `8px solid ${tokens.colors.primary500}`,
  backgroundColor: tokens.aliases.surface,
  color: tokens.colors.slate400,
  textAlign: 'center' as const,
};

const percentageStyle = {
  fontSize: tokens.typography.sizeXL,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
};

const pieLabelStyle = {
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.slate600,
};

const bottomTextStyle = {
  margin: 0,
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.slate500,
  textAlign: 'center' as const,
};

const bottomValueStyle = {
  margin: 0,
  fontSize: tokens.typography.sizeXL,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  textAlign: 'center' as const,
};
</script>

<template>
  <section :style="containerStyle">
    <div :style="headerStyle">
      <div>
        <h2 :style="titleStyle">Receita</h2>
        <p :style="subtitleStyle">Comparativo com meta</p>
      </div>
      <span :style="badgeStyle">+5,3%</span>
    </div>

    <div :style="chartContainerStyle">
      <div :style="pieChartStyle">
        <div>
          <div :style="percentageStyle">82%</div>
          <div :style="pieLabelStyle">Meta atingida</div>
        </div>
      </div>
      <p :style="bottomTextStyle">Meta mensal atingida em</p>
      <p :style="bottomValueStyle">82%</p>
    </div>
  </section>
</template>
