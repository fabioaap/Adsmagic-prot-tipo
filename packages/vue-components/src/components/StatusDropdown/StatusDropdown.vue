<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";
import { ref } from "vue";

interface Option {
  id: string;
  label: string;
  description: string;
}

interface Props {
  options?: Option[];
  initialValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [
    { id: "ready", label: "Pronto para subir", description: "Checklist concluido e copy validada" },
    { id: "review", label: "Revisar com cliente", description: "Aguardando feedback externo" },
    { id: "blocked", label: "Bloqueado", description: "Dependencias de integracao pendentes" },
  ],
  initialValue: "ready",
});

const open = ref(false);
const selected = ref(props.options.find((opt) => opt.id === props.initialValue) || props.options[0]);

const selectOption = (option: Option) => {
  selected.value = option;
  open.value = false;
};
</script>

<template>
  <div :style="{ position: 'relative', display: 'inline-block' }">
    <button
      type="button"
      :style="{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing.xs,
        paddingInline: tokens.spacing.md,
        paddingBlock: tokens.spacing.xs,
        borderRadius: tokens.radii.full,
        border: `1px solid ${tokens.aliases.borderSoft}`,
        backgroundColor: tokens.aliases.surface,
        cursor: 'pointer',
        fontSize: tokens.typography.sizeSM,
      }"
      @click="open = !open"
    >
      {{ selected.label }}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <div
      v-if="open"
      :style="{
        position: 'absolute',
        marginTop: tokens.spacing.xs,
        minWidth: '220px',
        borderRadius: tokens.radii.md,
        border: `1px solid ${tokens.aliases.borderSoft}`,
        backgroundColor: tokens.aliases.surface,
        boxShadow: tokens.shadows.pop,
        padding: tokens.spacing.xs,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing['2xs'],
        zIndex: 20,
      }"
      role="listbox"
    >
      <div
        v-for="option in options"
        :key="option.id"
        role="option"
        :style="{
          padding: tokens.spacing.sm,
          borderRadius: tokens.radii.md,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: tokens.typography.sizeSM,
          cursor: 'pointer',
          backgroundColor: option.id === selected.id ? tokens.colors.primary100 : 'transparent',
          color: option.id === selected.id ? tokens.colors.primary600 : tokens.colors.slate600,
        }"
        @click="selectOption(option)"
      >
        <div :style="{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }">
          <strong :style="{ fontSize: tokens.typography.sizeSM }">{{ option.label }}</strong>
          <span :style="{ fontSize: tokens.typography.sizeXS, color: tokens.colors.slate500 }">
            {{ option.description }}
          </span>
        </div>
        <svg
          v-if="option.id === selected.id"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    </div>
  </div>
</template>
