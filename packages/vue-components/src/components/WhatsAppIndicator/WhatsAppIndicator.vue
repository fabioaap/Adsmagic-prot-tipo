<script setup lang="ts">
import { computed } from 'vue';
import { tokens } from '@adsmagic/tokens';

type TrendType = 'positive' | 'negative' | 'neutral';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    type: TrendType;
  };
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
});

const trendStyles: Record<TrendType, Record<string, string>> = {
  positive: {
    color: tokens.colors.success600,
  },
  negative: {
    color: tokens.colors.danger600,
  },
  neutral: {
    color: tokens.colors.slate600,
  },
};

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.sm,
  padding: tokens.spacing.md,
  backgroundColor: tokens.colors.white,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  boxShadow: tokens.shadows.card,
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const titleStyle = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: tokens.typography.weightMedium,
  color: tokens.colors.slate600,
};

const valueStyle = {
  fontSize: tokens.typography.sizeXL,
  fontWeight: tokens.typography.weightSemibold,
  color: tokens.colors.slate900,
};

const subtitleStyle = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

const trendStyle = {
  fontSize: tokens.typography.sizeXS,
  fontWeight: tokens.typography.weightMedium,
};

const computedTrendStyle = computed(() => ({
  ...trendStyle,
  ...(props.trend ? trendStyles[props.trend.type] : {}),
}));
</script>

<template>
  <div :style="baseStyle">
    <div :style="headerStyle">
      <span :style="titleStyle">{{ title }}</span>
      <slot name="icon" />
    </div>
    <div :style="valueStyle">{{ value }}</div>
    <div v-if="subtitle" :style="subtitleStyle">{{ subtitle }}</div>
    <div v-if="trend" :style="computedTrendStyle">
      {{ trend.value }}
    </div>
  </div>
</template>