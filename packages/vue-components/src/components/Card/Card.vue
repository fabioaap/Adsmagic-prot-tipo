<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface Props {
  title: string;
  value: string;
  meta?: string;
  caption?: string;
  footerNote?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <article :style="{
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.lg,
    backgroundColor: tokens.aliases.surface,
    borderRadius: tokens.radii.lg,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    boxShadow: tokens.shadows.card,
  }">
    <header :style="{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      gap: tokens.spacing.sm 
    }">
      <div>
        <h3 :style="{
          margin: 0,
          fontSize: tokens.typography.sizeSM,
          fontWeight: Number(tokens.typography.weightMedium),
          color: tokens.colors.slate600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }">
          {{ title }}
        </h3>
        <p :style="{
          margin: 0,
          fontSize: tokens.typography.sizeXL,
          fontWeight: Number(tokens.typography.weightSemibold),
          color: tokens.colors.slate900,
        }">
          {{ value }}
        </p>
      </div>
      <slot name="actions" />
    </header>

    <div v-if="meta" :style="{
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing['2xs'],
      fontSize: tokens.typography.sizeXS,
    }">
      {{ meta }}
    </div>

    <p v-if="caption" :style="{
      margin: 0,
      fontSize: tokens.typography.sizeSM,
      color: tokens.colors.slate600,
      lineHeight: 1.5,
    }">
      {{ caption }}
    </p>

    <footer v-if="footerNote" :style="{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: tokens.typography.sizeXS,
      color: tokens.colors.slate500,
    }">
      {{ footerNote }}
    </footer>
  </article>
</template>
