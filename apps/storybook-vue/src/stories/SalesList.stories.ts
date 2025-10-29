import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DsSalesList } from '@adsmagic/vue'

const meta: Meta<typeof DsSalesList> = {
  title: 'Lists/SalesList',
  component: DsSalesList,
  tags: ['autodocs'],
  argTypes: {
    sales: {
      control: 'object',
      description: 'Lista de vendas'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sales: [
      {
        id: '1',
        client: 'João Silva',
        value: 2500,
        date: '15/10',
        status: 'completed',
        product: 'Plano Premium'
      },
      {
        id: '2',
        client: 'Maria Santos',
        value: 1800,
        date: '14/10',
        status: 'pending',
        product: 'Plano Básico'
      },
      {
        id: '3',
        client: 'Pedro Costa',
        value: 3200,
        date: '13/10',
        status: 'cancelled',
        product: 'Plano Empresarial'
      }
    ]
  }
}

export const Empty: Story = {
  args: {
    sales: []
  }
}