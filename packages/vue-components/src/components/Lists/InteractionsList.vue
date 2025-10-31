<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface Interaction {
  id: string;
  type: 'message' | 'call' | 'email';
  contact: string;
  time: string;
  status: 'success' | 'pending' | 'failed';
  message?: string;
}

const props = withDefaults(
  defineProps<{
    interactions?: Interaction[];
  }>(),
  {
    interactions: () => [],
  },
);

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing.lg,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  padding: tokens.spacing.xl,
  boxShadow: tokens.shadows.card,
};

const headerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
};

const titleStyle = {
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const subtitleStyle = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
  margin: 0,
};

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.full,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
  color: tokens.colors.primary600,
  backgroundColor: tokens.colors.primary100,
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing.md,
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.md,
  padding: tokens.spacing.md,
  borderRadius: tokens.radii.md,
  backgroundColor: tokens.colors.slate50,
};

const iconStyle = {
  fontSize: tokens.typography.sizeLG,
  width: '2rem',
  height: '2rem',
  borderRadius: tokens.radii.full,
  backgroundColor: tokens.colors.slate100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: tokens.spacing['2xs'],
};

const headerRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const contactStyle = {
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const messageStyle = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate600,
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
};

const timeStyle = {
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

const emptyStateStyle = {
  textAlign: 'center' as const,
  color: tokens.colors.slate400,
  padding: tokens.spacing.lg,
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return tokens.colors.success600;
    case 'pending':
      return tokens.colors.primary500;
    case 'failed':
      return tokens.colors.danger500;
    default:
      return tokens.colors.slate500;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'message':
      return '�Y'�';
    case 'call':
      return '�Y"z';
    case 'email':
      return '�o%��?';
    default:
      return '�Y"?';
  }
};
</script>

<template>
  <section :style="containerStyle">
    <div :style="headerStyle">
      <div>
        <h3 :style="titleStyle">Interacoes Recentes</h3>
        <p :style="subtitleStyle">Ultimas 24 horas</p>
      </div>
      <span :style="badgeStyle">24h</span>
    </div>

    <div :style="listStyle">
      <template v-if="props.interactions.length === 0">
        <div :style="emptyStateStyle">Nenhuma interacao recente</div>
      </template>
      <template v-else>
        <div
          v-for="interaction in props.interactions.slice(0, 5)"
          :key="interaction.id"
          :style="itemStyle"
        >
          <span :style="iconStyle">{{ getTypeIcon(interaction.type) }}</span>
          <div :style="contentStyle">
            <div :style="headerRowStyle">
              <p :style="contactStyle">{{ interaction.contact }}</p>
              <span :style="{ ...timeStyle, color: getStatusColor(interaction.status) }">
                {{ interaction.time }}
              </span>
            </div>
            <p
              v-if="interaction.message"
              :style="messageStyle"
            >
              {{ interaction.message }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
