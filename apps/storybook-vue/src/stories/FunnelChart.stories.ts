import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DsFunnelChart } from '@adsmagic/vue'

const meta: Meta<typeof DsFunnelChart> = {
  title: 'Charts/FunnelChart',
  component: DsFunnelChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Dados do gráfico de funil'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { name: 'Leads', value: 1000, percentage: 100, color: '#6366f1' },
      { name: 'Contato', value: 750, percentage: 75, color: '#8b5cf6' },
      { name: 'Proposta', value: 300, percentage: 30, color: '#a855f7' },
      { name: 'Fechamento', value: 120, percentage: 12, color: '#c084fc' }
    ]
  }
}

export const Empty: Story = {
  args: {
    data: []
  }
}