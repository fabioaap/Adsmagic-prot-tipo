import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DsInteractionsList } from '@adsmagic/vue'

const meta: Meta<typeof DsInteractionsList> = {
  title: 'Lists/InteractionsList',
  component: DsInteractionsList,
  tags: ['autodocs'],
  argTypes: {
    interactions: {
      control: 'object',
      description: 'Lista de interações'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    interactions: [
      {
        id: '1',
        type: 'message',
        contact: 'João Silva',
        time: '10:30',
        status: 'success',
        message: 'Olá, gostaria de saber sobre os planos'
      },
      {
        id: '2',
        type: 'call',
        contact: 'Maria Santos',
        time: '09:15',
        status: 'pending'
      },
      {
        id: '3',
        type: 'email',
        contact: 'Pedro Costa',
        time: '08:45',
        status: 'failed',
        message: 'Proposta enviada para análise'
      }
    ]
  }
}

export const Empty: Story = {
  args: {
    interactions: []
  }
}