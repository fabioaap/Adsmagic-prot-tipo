<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface Props {
  workspaceName?: string;
  workspaceDescription?: string;
  avatarInitials?: string;
  statusLabel?: string;
  campaignsCount?: string;
  conversionsRate?: string;
  integrationsCount?: string;
}

const props = withDefaults(defineProps<Props>(), {
  workspaceName: "Central de operações Adsmagic",
  workspaceDescription: "Orquestre campanhas, integracoes e automatizacoes em um unico painel.",
  avatarInitials: "AG",
  statusLabel: "Workspace ativo",
  campaignsCount: "128 ativas",
  conversionsRate: "+18% semana",
  integrationsCount: "9 conectadas",
});
</script>

<template>
  <header :style="{
    width: '100%',
    backgroundColor: tokens.aliases.surface,
    borderRadius: tokens.radii.lg,
    boxShadow: tokens.shadows.card,
    border: `1px solid ${tokens.aliases.borderSoft}`,
    padding: tokens.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.lg,
  }">
    <div :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: tokens.spacing.lg,
      flexWrap: 'wrap',
    }">
      <!-- Left Side: Avatar + Info -->
      <div :style="{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }">
        <span :style="{
          height: '3rem',
          width: '3rem',
          borderRadius: tokens.radii.full,
          background: tokens.colors.primary100,
          color: tokens.colors.primary600,
          fontWeight: Number(tokens.typography.weightSemibold),
          fontSize: tokens.typography.sizeSM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }">
          {{ avatarInitials }}
        </span>

        <div :style="{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }">
          <div :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: tokens.spacing['2xs'],
            paddingInline: tokens.spacing.sm,
            paddingBlock: tokens.spacing['2xs'],
            borderRadius: tokens.radii.full,
            backgroundColor: tokens.colors.success100,
            color: tokens.colors.success600,
            fontSize: tokens.typography.sizeXS,
            fontWeight: Number(tokens.typography.weightMedium),
            letterSpacing: '0.04em',
            width: 'fit-content',
          }">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l2 7h7l-5.5 4 2 7L12 15l-5.5 5 2-7L3 9h7z"/>
            </svg>
            {{ statusLabel }}
          </div>

          <h2 :style="{
            margin: 0,
            fontSize: tokens.typography.sizeLG,
            fontWeight: Number(tokens.typography.weightSemibold),
            color: tokens.colors.slate900,
          }">
            {{ workspaceName }}
          </h2>

          <p :style="{
            margin: 0,
            fontSize: tokens.typography.sizeSM,
            color: tokens.colors.slate600,
          }">
            {{ workspaceDescription }}
          </p>
        </div>
      </div>

      <!-- Right Side: Stats + Actions -->
      <div :style="{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm, alignItems: 'flex-end' }">
        <div :style="{ display: 'flex', gap: tokens.spacing.lg, flexWrap: 'wrap' }">
          <div :style="{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }">
            <span :style="{
              fontSize: tokens.typography.sizeXS,
              color: tokens.colors.slate500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }">Campanhas</span>
            <span :style="{
              fontSize: tokens.typography.sizeLG,
              fontWeight: Number(tokens.typography.weightSemibold),
              color: tokens.colors.slate900,
            }">{{ campaignsCount }}</span>
          </div>

          <div :style="{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }">
            <span :style="{
              fontSize: tokens.typography.sizeXS,
              color: tokens.colors.slate500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }">Conversões</span>
            <span :style="{
              fontSize: tokens.typography.sizeLG,
              fontWeight: Number(tokens.typography.weightSemibold),
              color: tokens.colors.slate900,
            }">{{ conversionsRate }}</span>
          </div>

          <div :style="{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }">
            <span :style="{
              fontSize: tokens.typography.sizeXS,
              color: tokens.colors.slate500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }">Integrações</span>
            <span :style="{
              fontSize: tokens.typography.sizeLG,
              fontWeight: Number(tokens.typography.weightSemibold),
              color: tokens.colors.slate900,
            }">{{ integrationsCount }}</span>
          </div>
        </div>

        <div :style="{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
</template>
