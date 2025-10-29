<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface SummaryCard {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "negative" | "neutral";
}

interface Props {
  cards?: SummaryCard[];
}

const props = withDefaults(defineProps<Props>(), {
  cards: () => [
    { label: "Receita gerada", value: "R$ 482k", delta: "+24%", tone: "positive" },
    { label: "Leads qualificados", value: "1.284", delta: "+9%", tone: "positive" },
    { label: "CPL médio", value: "R$ 32,10", delta: "-5%", tone: "positive" },
    { label: "Ticket de vendas", value: "R$ 1.120", delta: "+3%", tone: "neutral" },
  ],
});

const getDeltaStyle = (tone: SummaryCard["tone"]) => {
  const styles = {
    positive: {
      color: tokens.colors.success600,
      backgroundColor: tokens.colors.success100,
    },
    negative: {
      color: tokens.colors.danger500,
      backgroundColor: tokens.colors.danger100,
    },
    neutral: {
      color: tokens.colors.primary600,
      backgroundColor: tokens.colors.primary100,
    },
  };
  return styles[tone];
};
</script>

<template>
  <div :style="{
    display: 'grid',
    gap: tokens.spacing.lg,
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  }">
    <article
      v-for="card in cards"
      :key="card.label"
      :style="{
        borderRadius: tokens.radii.lg,
        backgroundColor: tokens.aliases.surface,
        padding: tokens.spacing.lg,
        border: `1px solid ${tokens.aliases.borderSoft}`,
        boxShadow: tokens.shadows.card,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.sm,
      }"
    >
      <span :style="{
        fontSize: tokens.typography.sizeXS,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: tokens.colors.slate500,
      }">
        {{ card.label }}
      </span>

      <h4 :style="{
        fontSize: tokens.typography.sizeXL,
        fontWeight: Number(tokens.typography.weightSemibold),
        color: tokens.colors.slate900,
        margin: 0,
      }">
        {{ card.value }}
      </h4>

      <span :style="{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radii.full,
        fontSize: tokens.typography.sizeXS,
        fontWeight: Number(tokens.typography.weightMedium),
        paddingInline: tokens.spacing.sm,
        paddingBlock: tokens.spacing['2xs'],
        ...getDeltaStyle(card.tone),
      }">
        {{ card.delta }} vs última semana
      </span>
    </article>
  </div>
</template>
