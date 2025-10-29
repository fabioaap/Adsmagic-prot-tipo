import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DsChannelsChart } from '@adsmagic/vue'

const meta: Meta<typeof DsChannelsChart> = {
  title: 'Charts/ChannelsChart',
  component: DsChannelsChart,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Dados do gráfico de canais'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { name: 'WhatsApp', value: 45, color: '#25d366' },
      { name: 'Instagram', value: 30, color: '#e4405f' },
      { name: 'Facebook', value: 20, color: '#1877f2' },
      { name: 'Site', value: 5, color: '#6366f1' }
    ]
  }
}

export const Empty: Story = {
  args: {
    data: []
  }
}