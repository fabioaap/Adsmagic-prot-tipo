import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DsRevenueChart } from '@adsmagic/vue'

const meta: Meta<typeof DsRevenueChart> = {
  title: 'Charts/RevenueChart',
  component: DsRevenueChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Dados do gráfico de receita'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { name: 'Meta', value: 82, color: '#6366f1' },
      { name: 'Restante', value: 18, color: '#e5e7eb' }
    ]
  }
}

export const Empty: Story = {
  args: {
    data: []
  }
}