import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { tokens } from '@adsmagic/tokens'
import ChannelsChart from './ChannelsChart.vue'

describe('ChannelsChart', () => {
  const mockData = [
    { name: 'WhatsApp', value: 45, color: '#25d366' },
    { name: 'Instagram', value: 30, color: '#e4405f' },
    { name: 'Facebook', value: 20, color: '#1877f2' },
    { name: 'Site', value: 5, color: '#6366f1' },
  ]

  it('renders correctly with data', () => {
    const wrapper = mount(ChannelsChart, {
      props: { data: mockData },
    })

    expect(wrapper.text()).toContain('Canais')
    expect(wrapper.text()).toContain('Performance por canal')
    expect(wrapper.text()).toContain('+12,5%')
    expect(wrapper.text()).toContain('Grafico de barras')
  })

  it('renders with default empty data', () => {
    const wrapper = mount(ChannelsChart)

    expect(wrapper.text()).toContain('Canais')
    expect(wrapper.text()).toContain('Performance por canal')
  })

  it('applies design tokens on container', () => {
    const wrapper = mount(ChannelsChart, {
      props: { data: mockData },
    })

    const styleAttribute = wrapper.attributes('style') ?? ''

    expect(styleAttribute).toContain(`box-shadow: ${tokens.shadows.card}`)
    expect(styleAttribute).toContain(`border-radius: ${tokens.radii.lg}`)
    expect(styleAttribute).toContain(`background-color: ${tokens.aliases.surface}`)
  })
})
