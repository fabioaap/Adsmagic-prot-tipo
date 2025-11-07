import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { tokens } from '@adsmagic/tokens'
import FunnelChart from './FunnelChart.vue'

describe('FunnelChart', () => {
  const mockData = [
    { name: 'Leads', value: 1000, percentage: 100, color: '#6366f1' },
    { name: 'Contato', value: 750, percentage: 75, color: '#8b5cf6' },
  ]

  it('renders correctly with data', () => {
    const wrapper = mount(FunnelChart, {
      props: { data: mockData },
    })

    expect(wrapper.text()).toContain('Funil de Vendas')
    expect(wrapper.text()).toContain('Conversao por etapa')
    expect(wrapper.text()).toContain('+8,2%')
    expect(wrapper.text()).toContain('Grafico de funil')
  })

  it('renders fallback copy when data is empty', () => {
    const wrapper = mount(FunnelChart)

    expect(wrapper.text()).toContain('Funil de Vendas')
    expect(wrapper.text()).toContain('Conversao por etapa')
    expect(wrapper.text()).toContain('Grafico de funil')
  })

  it('applies design tokens on container', () => {
    const wrapper = mount(FunnelChart, {
      props: { data: mockData },
    })

    const styleAttribute = wrapper.attributes('style') ?? ''

    expect(styleAttribute).toContain(`box-shadow: ${tokens.shadows.card}`)
    expect(styleAttribute).toContain(`border-radius: ${tokens.radii.lg}`)
    expect(styleAttribute).toContain(`background-color: ${tokens.aliases.surface}`)
  })
})
