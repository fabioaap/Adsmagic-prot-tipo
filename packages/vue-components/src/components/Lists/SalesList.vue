<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface Sale {
  id: string;
  client: string;
  value: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  product: string;
}

interface Props {
  sales: Sale[];
}

const props = withDefaults(defineProps<Props>(), {
  sales: () => []
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return tokens.colors.success500;
    case 'pending':
      return tokens.colors.warning500;
    case 'cancelled':
      return tokens.colors.error500;
    default:
      return tokens.colors.gray500;
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
</script>

<template>
  <div class="card-shadow flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">Vendas Recentes</h2>
        <p class="text-xs text-slate-500">Últimas transações</p>
      </div>
      <span class="summary-card-badge summary-card-badge--positive">R$ 45.230</span>
    </div>
    <div class="flex flex-1 flex-col gap-3">
      <div
        v-for="sale in sales"
        :key="sale.id"
        class="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm">
            💰
          </div>
          <div>
            <div class="text-sm font-medium text-slate-900">{{ sale.client }}</div>
            <div class="text-xs text-slate-500">{{ sale.product }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-semibold text-slate-900">{{ formatCurrency(sale.value) }}</div>
          <div class="text-xs text-slate-500">{{ sale.date }}</div>
          <div class="mt-1 flex items-center justify-end gap-1">
            <div
              class="h-2 w-2 rounded-full"
              :style="{ backgroundColor: getStatusColor(sale.status) }"
            ></div>
            <span class="text-xs capitalize text-slate-500">{{ sale.status }}</span>
          </div>
        </div>
      </div>
      <div v-if="sales.length === 0" class="flex flex-col items-center justify-center py-8 text-slate-400">
        <div class="text-2xl">💸</div>
        <p class="mt-2 text-sm">Nenhuma venda recente</p>
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