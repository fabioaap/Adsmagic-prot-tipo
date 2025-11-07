import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { tokens } from '@adsmagic/tokens'
import RevenueChart from './RevenueChart.vue'

describe('RevenueChart', () => {
  const mockData = [
    { name: 'Meta', value: 82, color: '#6366f1' },
    { name: 'Restante', value: 18, color: '#e5e7eb' },
  ]

  it('renders correctly with data', () => {
    const wrapper = mount(RevenueChart, {
      props: { data: mockData },
    })

    expect(wrapper.text()).toContain('Receita')
    expect(wrapper.text()).toContain('Comparativo com meta')
    expect(wrapper.text()).toContain('+5,3%')
    expect(wrapper.text()).toContain('82%')
    expect(wrapper.text()).toContain('Meta atingida')
  })

  it('renders fallback content when data is empty', () => {
    const wrapper = mount(RevenueChart)

    expect(wrapper.text()).toContain('Receita')
    expect(wrapper.text()).toContain('Comparativo com meta')
    expect(wrapper.text()).toContain('Meta mensal atingida em')
  })

  it('applies design tokens on container', () => {
    const wrapper = mount(RevenueChart, {
      props: { data: mockData },
    })

    const styleAttribute = wrapper.attributes('style') ?? ''

    expect(styleAttribute).toContain(`box-shadow: ${tokens.shadows.card}`)
    expect(styleAttribute).toContain(`border-radius: ${tokens.radii.lg}`)
    expect(styleAttribute).toContain(`background-color: ${tokens.aliases.surface}`)
  })
})
