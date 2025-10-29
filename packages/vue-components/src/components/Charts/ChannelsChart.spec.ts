import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChannelsChart from './ChannelsChart.vue'

describe('ChannelsChart', () => {
  const mockData = [
    { name: 'WhatsApp', value: 45, color: '#25d366' },
    { name: 'Instagram', value: 30, color: '#e4405f' },
    { name: 'Facebook', value: 20, color: '#1877f2' },
    { name: 'Site', value: 5, color: '#6366f1' }
  ]

  it('renders correctly with data', () => {
    const wrapper = mount(ChannelsChart, {
      props: { data: mockData }
    })

    expect(wrapper.text()).toContain('Canais')
    expect(wrapper.text()).toContain('Performance por canal')
    expect(wrapper.text()).toContain('+12,5%')
    expect(wrapper.text()).toContain('Gráfico de Barras')
  })

  it('renders with default empty data', () => {
    const wrapper = mount(ChannelsChart)

    expect(wrapper.text()).toContain('Canais')
    expect(wrapper.text()).toContain('Performance por canal')
  })

  it('has correct structure', () => {
    const wrapper = mount(ChannelsChart, {
      props: { data: mockData }
    })

    expect(wrapper.classes()).toContain('card-shadow')
    expect(wrapper.classes()).toContain('rounded-3xl')
  })
})