<script setup lang="ts">
import { computed } from 'vue';
import { tokens } from '@adsmagic/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
);

const variantTokens: Record<ButtonVariant, Record<string, string>> = {
  primary: {
    backgroundColor: tokens.colors.primary600,
    color: tokens.colors.white,
    boxShadow: tokens.shadows.pill,
    border: 'none',
  },
  secondary: {
    backgroundColor: tokens.colors.primary100,
    color: tokens.colors.primary600,
    boxShadow: tokens.shadows.card,
    border: 'none',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: tokens.colors.slate600,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    boxShadow: 'none',
  },
};

const sizeTokens: Record<ButtonSize, Record<string, string>> = {
  sm: {
    fontSize: tokens.typography.sizeXS,
    paddingInline: tokens.spacing.md,
    paddingBlock: tokens.spacing.xs,
  },
  md: {
    fontSize: tokens.typography.sizeSM,
    paddingInline: tokens.spacing.lg,
    paddingBlock: tokens.spacing.sm,
  },
};

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.spacing.xs,
  borderRadius: tokens.radii.full,
  fontFamily: tokens.typography.familySans,
  fontWeight: tokens.typography.weightSemibold,
  lineHeight: '1.2',
  transition: `transform ${tokens.transitions.base}, box-shadow ${tokens.transitions.base}`,
  cursor: 'pointer',
};

const iconStyle = {
  display: 'inline-flex',
  alignItems: 'center',
};

const buttonStyle = computed(() => ({
  ...baseStyle,
  ...sizeTokens[props.size],
  ...variantTokens[props.variant],
  opacity: props.disabled ? 0.45 : 1,
  cursor: props.disabled ? 'not-allowed' : baseStyle.cursor,
}));
</script>

<template>
  <button :style="buttonStyle" :disabled="props.disabled">
    <span v-if="$slots.leading" :style="iconStyle">
      <slot name="leading" />
    </span>
    <span><slot /></span>
    <span v-if="$slots.trailing" :style="iconStyle">
      <slot name="trailing" />
    </span>
  </button>
</template>
