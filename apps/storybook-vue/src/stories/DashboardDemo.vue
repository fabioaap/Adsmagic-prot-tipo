<script setup lang="ts">
import { DsSummaryCardGrid, DsContactsSalesChart, DsRevenueChart, DsChannelsChart, DsFunnelChart, DsInteractionsList, DsSalesList } from '@adsmagic/vue'

// Dados mockados para demonstração
const summaryCards = [
  { title: 'Contatos', value: '1.247', change: '+12,5%', changeType: 'positive' as const },
  { title: 'Conversões', value: '89', change: '+8,2%', changeType: 'positive' as const },
  { title: 'Receita', value: 'R$ 45.230', change: '+15,3%', changeType: 'positive' as const },
  { title: 'Tickets', value: '23', change: '-2,1%', changeType: 'negative' as const }
]

const contactsSalesData = [
  { name: 'Jan', contacts: 120, sales: 12 },
  { name: 'Fev', contacts: 150, sales: 18 },
  { name: 'Mar', contacts: 180, sales: 22 },
  { name: 'Abr', contacts: 200, sales: 28 },
  { name: 'Mai', contacts: 250, sales: 35 },
  { name: 'Jun', contacts: 220, sales: 32 }
]

const revenueData = [
  { name: 'Meta', value: 82, color: '#6366f1' },
  { name: 'Restante', value: 18, color: '#e5e7eb' }
]

const channelsData = [
  { name: 'WhatsApp', value: 45, color: '#25d366' },
  { name: 'Instagram', value: 30, color: '#e4405f' },
  { name: 'Facebook', value: 20, color: '#1877f2' },
  { name: 'Site', value: 5, color: '#6366f1' }
]

const funnelData = [
  { name: 'Leads', value: 1000, percentage: 100, color: '#6366f1' },
  { name: 'Contato', value: 750, percentage: 75, color: '#8b5cf6' },
  { name: 'Proposta', value: 300, percentage: 30, color: '#a855f7' },
  { name: 'Fechamento', value: 120, percentage: 12, color: '#c084fc' }
]

const interactions = [
  {
    id: '1',
    type: 'message' as const,
    contact: 'João Silva',
    time: '10:30',
    status: 'success' as const,
    message: 'Olá, gostaria de saber sobre os planos'
  },
  {
    id: '2',
    type: 'call' as const,
    contact: 'Maria Santos',
    time: '09:15',
    status: 'pending' as const
  },
  {
    id: '3',
    type: 'email' as const,
    contact: 'Pedro Costa',
    time: '08:45',
    status: 'failed' as const,
    message: 'Proposta enviada para análise'
  }
]

const sales = [
  {
    id: '1',
    client: 'João Silva',
    value: 2500,
    date: '15/10',
    status: 'completed' as const,
    product: 'Plano Premium'
  },
  {
    id: '2',
    client: 'Maria Santos',
    value: 1800,
    date: '14/10',
    status: 'pending' as const,
    product: 'Plano Básico'
  },
  {
    id: '3',
    client: 'Pedro Costa',
    value: 3200,
    date: '13/10',
    status: 'cancelled' as const,
    product: 'Plano Empresarial'
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">Dashboard Adsmagic</h1>
        <p class="text-slate-600">Visão geral do seu negócio</p>
      </div>

      <!-- Cards de resumo -->
      <DsSummaryCardGrid :cards="summaryCards" class="mb-8" />

      <!-- Gráficos -->
      <div class="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DsContactsSalesChart :data="contactsSalesData" class="md:col-span-2" />
        <DsRevenueChart :data="revenueData" />
        <DsChannelsChart :data="channelsData" />
        <DsFunnelChart :data="funnelData" />
      </div>

      <!-- Listas -->
      <div class="grid gap-6 lg:grid-cols-2">
        <DsInteractionsList :interactions="interactions" />
        <DsSalesList :sales="sales" />
      </div>
    </div>
  </div>
</template>

<style>
/* Estilos globais podem ser adicionados aqui */
</style>