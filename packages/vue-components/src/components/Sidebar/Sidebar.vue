<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface NavItem {
  label: string;
  active?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface Props {
  brandName?: string;
  brandInitials?: string;
  navGroups?: NavGroup[];
  footNote?: string;
}

const props = withDefaults(defineProps<Props>(), {
  brandName: "Adsmagic Platform",
  brandInitials: "AG",
  footNote: "Workspace premium com sincronizacao ativa e monitoramento de eventos em tempo real.",
  navGroups: () => [
    {
      title: "Principal",
      items: [
        { label: "Visão geral", active: true },
        { label: "Contatos" },
        { label: "Campanhas" },
      ],
    },
    {
      title: "Insights",
      items: [
        { label: "Relatórios" },
        { label: "Oportunidades" },
      ],
    },
    {
      title: "Sistema",
      items: [
        { label: "Configurações" },
        { label: "Suporte" },
      ],
    },
  ],
});
</script>

<template>
  <aside :style="{
    width: '280px',
    backgroundColor: tokens.colors.slate50,
    borderRadius: tokens.radii.lg,
    padding: tokens.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.lg,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    boxShadow: tokens.shadows.card,
  }">
    <!-- Logo/Brand -->
    <div :style="{
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      fontWeight: Number(tokens.typography.weightSemibold),
      fontSize: tokens.typography.sizeSM,
      color: tokens.colors.slate900,
    }">
      <span :style="{
        height: '2.5rem',
        width: '2.5rem',
        borderRadius: tokens.radii.md,
        background: tokens.colors.primary600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: tokens.colors.white,
        fontWeight: Number(tokens.typography.weightSemibold),
      }">
        {{ brandInitials }}
      </span>
      <span>{{ brandName }}</span>
    </div>

    <!-- Navigation Groups -->
    <nav
      v-for="group in navGroups"
      :key="group.title"
      :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing['2xs'],
      }"
    >
      <span :style="{
        fontSize: tokens.typography.sizeXS,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: tokens.colors.slate500,
      }">
        {{ group.title }}
      </span>

      <div
        v-for="item in group.items"
        :key="item.label"
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
          borderRadius: tokens.radii.md,
          fontSize: tokens.typography.sizeSM,
          color: item.active ? tokens.colors.primary600 : tokens.colors.slate600,
          backgroundColor: item.active ? tokens.colors.primary100 : 'transparent',
          fontWeight: item.active ? Number(tokens.typography.weightMedium) : 'normal',
          cursor: 'pointer',
          transition: `background-color ${tokens.transitions.base}`,
        }"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        {{ item.label }}
      </div>
    </nav>

    <!-- Footer Note -->
    <p :style="{
      marginTop: 'auto',
      fontSize: tokens.typography.sizeXS,
      color: tokens.colors.slate500,
      lineHeight: 1.4,
    }">
      {{ footNote }}
    </p>
  </aside>
</template>
