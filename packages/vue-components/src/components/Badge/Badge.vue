<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";
import { computed } from "vue";

interface Props {
  variant?: "primary" | "success" | "neutral" | "danger";
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const badgeBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: tokens.radii.full,
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  lineHeight: 1.2,
};

const variantStyles = {
  primary: {
    backgroundColor: tokens.colors.primary100,
    color: tokens.colors.primary600,
  },
  success: {
    backgroundColor: tokens.colors.success100,
    color: tokens.colors.success600,
  },
  neutral: {
    backgroundColor: tokens.colors.slate100,
    color: tokens.colors.slate600,
  },
  danger: {
    backgroundColor: tokens.colors.danger100,
    color: tokens.colors.danger500,
  },
};

const badgeStyle = computed(() => ({
  ...badgeBase,
  ...variantStyles[props.variant],
}));
</script>

<template>
  <span :style="badgeStyle">
    {{ label }}
  </span>
</template>
