<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface Props {
  label: string;
  value: string;
  caption: string;
  badge: string;
  badgeType: "positive" | "negative";
  style?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
});

const getBadgeStyle = (badgeType: Props["badgeType"]) => {
  const styles = {
    positive: {
      color: tokens.colors.success600,
      backgroundColor: tokens.colors.success100,
    },
    negative: {
      color: tokens.colors.danger500,
      backgroundColor: tokens.colors.danger100,
    },
  };
  return styles[badgeType];
};
</script>

<template>
  <article
    class="summary-card card-shadow"
    :style="props.style"
  >
    <header class="summary-card-header">
      <p class="summary-card-label">{{ label }}</p>
      <span
        class="summary-card-badge"
        :class="`summary-card-badge--${badgeType === 'positive' ? 'positive' : 'negative'}`"
        :style="getBadgeStyle(badgeType)"
      >
        {{ badge }}
      </span>
    </header>
    <p class="summary-card-value">{{ value }}</p>
    <p class="summary-card-caption">{{ caption }}</p>
  </article>
</template>

<style scoped>
.summary-card {
  border-radius: v-bind('tokens.radii.lg');
  background-color: v-bind('tokens.aliases.surface');
  padding: v-bind('tokens.spacing.lg');
  border: 1px solid v-bind('tokens.aliases.borderSoft');
  box-shadow: v-bind('tokens.shadows.card');
  display: flex;
  flex-direction: column;
  gap: v-bind('tokens.spacing.sm');
}

.summary-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-card-label {
  font-size: v-bind('tokens.typography.sizeXS');
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: v-bind('tokens.colors.slate500');
  margin: 0;
}

.summary-card-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: v-bind('tokens.radii.full');
  font-size: v-bind('tokens.typography.sizeXS');
  font-weight: v-bind('tokens.typography.weightMedium');
  padding-inline: v-bind('tokens.spacing.sm');
  padding-block: v-bind('tokens.spacing["2xs"]');
}

.summary-card-value {
  font-size: v-bind('tokens.typography.sizeXL');
  font-weight: v-bind('tokens.typography.weightSemibold');
  color: v-bind('tokens.colors.slate900');
  margin: 0;
}

.summary-card-caption {
  font-size: v-bind('tokens.typography.sizeSM');
  color: v-bind('tokens.colors.slate600');
  margin: 0;
}
</style>