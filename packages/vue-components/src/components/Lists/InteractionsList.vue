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

interface Props {
  interactions: Interaction[];
}

const props = withDefaults(defineProps<Props>(), {
  interactions: () => []
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return tokens.colors.success500;
    case 'pending':
      return tokens.colors.warning500;
    case 'failed':
      return tokens.colors.error500;
    default:
      return tokens.colors.gray500;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'message':
      return '💬';
    case 'call':
      return '📞';
    case 'email':
      return '✉️';
    default:
      return '📝';
  }
};
</script>

<template>
  <div class="card-shadow flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">Interações Recentes</h2>
        <p class="text-xs text-slate-500">Últimas 24 horas</p>
      </div>
      <span class="summary-card-badge summary-card-badge--neutral">24h</span>
    </div>
    <div class="flex flex-1 flex-col gap-3">
      <div
        v-for="interaction in interactions"
        :key="interaction.id"
        class="flex items-start gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm">
          {{ getTypeIcon(interaction.type) }}
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-900">{{ interaction.contact }}</span>
            <span class="text-xs text-slate-500">{{ interaction.time }}</span>
          </div>
          <p v-if="interaction.message" class="mt-1 text-xs text-slate-600 line-clamp-2">
            {{ interaction.message }}
          </p>
          <div class="mt-2 flex items-center gap-2">
            <div
              class="h-2 w-2 rounded-full"
              :style="{ backgroundColor: getStatusColor(interaction.status) }"
            ></div>
            <span class="text-xs capitalize text-slate-500">{{ interaction.status }}</span>
          </div>
        </div>
      </div>
      <div v-if="interactions.length === 0" class="flex flex-col items-center justify-center py-8 text-slate-400">
        <div class="text-2xl">📭</div>
        <p class="mt-2 text-sm">Nenhuma interação recente</p>
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
  color: v-bind('tokens.colors.gray600');
  background-color: v-bind('tokens.colors.gray100');
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>