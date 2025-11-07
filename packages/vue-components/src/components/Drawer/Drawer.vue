<script setup lang="ts">
import { computed } from 'vue';
import { tokens } from '@adsmagic/tokens';

type DrawerVariant = 'default' | 'overlay';
type DrawerSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    variant?: DrawerVariant;
    size?: DrawerSize;
    isOpen?: boolean;
  }>(),
  {
    variant: 'default',
    size: 'md',
    isOpen: false,
  },
);

const emit = defineEmits<{
  close: [];
}>();

const variantTokens: Record<DrawerVariant, Record<string, string>> = {
  default: {
    backgroundColor: tokens.colors.white,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    boxShadow: tokens.shadows.card,
  },
  overlay: {
    backgroundColor: tokens.colors.white,
    boxShadow: tokens.shadows.pop,
  },
};

const sizeTokens: Record<DrawerSize, Record<string, string>> = {
  sm: {
    width: '300px',
  },
  md: {
    width: '400px',
  },
  lg: {
    width: '500px',
  },
};

const baseStyle = {
  position: 'fixed',
  top: '0',
  right: '0',
  height: '100vh',
  zIndex: '1000',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: tokens.typography.familySans,
  transition: `transform ${tokens.transitions.base}`,
};

const drawerStyle = computed(() => ({
  ...baseStyle,
  ...sizeTokens[props.size],
  ...variantTokens[props.variant],
  transform: props.isOpen ? 'translateX(0)' : 'translateX(100%)',
}));

const overlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '999',
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen && variant === 'overlay'"
      :style="overlayStyle"
      data-testid="drawer-overlay"
      @click="$emit('close')"
    />
    <div v-if="isOpen" :style="drawerStyle" data-testid="drawer-panel">
      <slot />
    </div>
  </Teleport>
</template>
