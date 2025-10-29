<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface ChannelData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  data: ChannelData[];
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
});
</script>

<template>
  <div class="card-shadow flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">Canais</h2>
        <p class="text-xs text-slate-500">Performance por canal</p>
      </div>
      <span class="summary-card-badge summary-card-badge--positive">+12,5%</span>
    </div>
    <div class="flex flex-1 flex-col items-center justify-center">
      <!-- Placeholder para gráfico de barras - seria implementado com uma lib Vue -->
      <div class="flex h-48 w-full items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        <div class="text-center">
          <div class="text-2xl font-semibold text-slate-900">Gráfico de Barras</div>
          <div class="text-sm">Canais de comunicação</div>
        </div>
      </div>
      <div class="mt-4 flex w-full justify-between text-xs text-slate-500">
        <span>WhatsApp</span>
        <span>Instagram</span>
        <span>Facebook</span>
        <span>Site</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-card-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: v-bind('tokens.radii.full');
  font-size: v-bind('tokens.typography.sizeXS');
  font-weight: v-bind('tokens.typography.weightMedium');
  padding-inline: v-bind('tokens.spacing.sm');
  padding-block: v-bind('tokens.spacing["2xs"]');
  color: v-bind('tokens.colors.success600');
  background-color: v-bind('tokens.colors.success100');
}
</style>