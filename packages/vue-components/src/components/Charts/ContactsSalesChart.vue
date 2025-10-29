<script setup lang="ts">
import { tokens } from "@adsmagic/tokens";

interface ContactsSalesData {
  week: string;
  contacts: number;
  sales: number;
}

interface Props {
  data: ContactsSalesData[];
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
});
</script>

<template>
  <div class="card-shadow rounded-3xl border border-slate-200 bg-white p-6">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">Contatos e Vendas</h2>
        <p class="text-xs text-slate-500">Volume por semana</p>
      </div>
      <button class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
        Exportar CSV
      </button>
    </div>
    <div class="mt-6 flex items-end gap-6">
      <div class="flex-1">
        <div class="h-56 overflow-auto">
          <!-- Placeholder para gráfico - seria implementado com uma lib Vue -->
          <div class="flex h-full items-center justify-center text-slate-400">
            Gráfico de linha (implementar com vue-chartjs ou similar)
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Fev</span>
          <span>Mar</span>
          <span>Abr</span>
          <span>Mai</span>
        </div>
      </div>
      <div class="flex w-36 flex-col gap-4 text-xs text-slate-500">
        <div>
          <p class="font-semibold text-slate-900">Contatos</p>
          <p>Semana atual</p>
          <p class="text-base font-semibold text-indigo-600">273</p>
        </div>
        <div>
          <p class="font-semibold text-slate-900">Vendas</p>
          <p>Semana atual</p>
          <p class="text-base font-semibold text-emerald-500">78</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos inline conforme necessário */
</style>