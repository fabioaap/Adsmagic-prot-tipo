<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface Props {
  name?: string;
  role?: string;
  email?: string;
  badge?: string;
  stats?: string;
  avatarUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "Veronica Guedes - Head de Growth",
  role: "Responsavel pelos squads de aquisicao e expansao Latam.",
  email: "veronica@adsmagic.com",
  badge: "Parceria premium",
  stats: "32 lancamentos entregues",
  avatarUrl: "",
});

const getInitials = (name: string): string => {
  const words = name.split(" ");
  if (words.length >= 2) {
    return words[0][0] + words[1][0];
  }
  return name.substring(0, 2);
};
</script>

<template>
  <section :style="{
    display: 'flex',
    gap: tokens.spacing.md,
    alignItems: 'center',
    padding: tokens.spacing.lg,
    borderRadius: tokens.radii.lg,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    backgroundColor: tokens.aliases.surface,
    boxShadow: tokens.shadows.card,
  }">
    <!-- Avatar -->
    <div :style="{
      height: '4rem',
      width: '4rem',
      borderRadius: tokens.radii.full,
      background: avatarUrl ? `url(${avatarUrl}) center/cover` : `linear-gradient(135deg, ${tokens.colors.primary500}, ${tokens.colors.indigo500})`,
      color: tokens.colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: tokens.typography.sizeLG,
      fontWeight: Number(tokens.typography.weightSemibold),
    }">
      <span v-if="!avatarUrl">{{ getInitials(name) }}</span>
    </div>

    <!-- Content -->
    <div :style="{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }">
      <!-- Badge -->
      <span v-if="badge" :style="{
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacing['2xs'],
        paddingInline: tokens.spacing.sm,
        paddingBlock: tokens.spacing['2xs'],
        borderRadius: tokens.radii.full,
        fontSize: tokens.typography.sizeXS,
        color: tokens.colors.primary600,
        backgroundColor: tokens.colors.primary100,
        width: 'fit-content',
      }">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15 20H9l1.5-3h3z"/>
        </svg>
        {{ badge }}
      </span>

      <!-- Name and Role -->
      <div>
        <h3 :style="{
          margin: 0,
          fontSize: tokens.typography.sizeLG,
          fontWeight: Number(tokens.typography.weightSemibold),
          color: tokens.colors.slate900,
        }">
          {{ name }}
        </h3>
        <p :style="{ margin: 0, fontSize: tokens.typography.sizeSM, color: tokens.colors.slate600 }">
          {{ role }}
        </p>
      </div>

      <!-- Meta Info -->
      <div :style="{
        display: 'flex',
        gap: tokens.spacing.md,
        fontSize: tokens.typography.sizeXS,
        color: tokens.colors.slate500,
      }">
        <span v-if="email" :style="{ display: 'flex', alignItems: 'center', gap: tokens.spacing['2xs'] }">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <path d="M3 7l9 6 9-6"/>
          </svg>
          {{ email }}
        </span>
        <span v-if="stats" :style="{ display: 'flex', alignItems: 'center', gap: tokens.spacing['2xs'] }">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 12l-3 9 9-3 9 3-3-9 3-9-9 3-9-3z"/>
          </svg>
          {{ stats }}
        </span>
      </div>
    </div>
  </section>
</template>
