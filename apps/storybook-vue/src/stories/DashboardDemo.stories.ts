import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DashboardDemo from './DashboardDemo.vue'

const meta: Meta<typeof DashboardDemo> = {
  title: 'Pages/DashboardDemo',
  component: DashboardDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}