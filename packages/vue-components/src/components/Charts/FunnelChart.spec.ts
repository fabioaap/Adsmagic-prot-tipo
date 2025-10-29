import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FunnelChart from './FunnelChart.vue'

describe('FunnelChart', () => {
  const mockData = [
    { name: 'Leads', value: 1000, percentage: 100, color: '#6366f1' },
    { name: 'Contato', value: 750, percentage: 75, color: '#8b5cf6' },
    { name: 'Proposta', value: 300, percentage: 30, color: '#a855f7' },
    { name: 'Fechamento', value: 120, percentage: 12, color: '#c084fc' }
  ]

  it('renders correctly with data', () => {
    const wrapper = mount(FunnelChart, {
      props: { data: mockData }
    })

    expect(wrapper.text()).toContain('Funil de Vendas')
    expect(wrapper.text()).toContain('Conversão por etapa')
    expect(wrapper.text()).toContain('+8,2%')
    expect(wrapper.text()).toContain('Funil de Vendas')
  })

  it('renders with default empty data', () => {
    const wrapper = mount(FunnelChart)

    expect(wrapper.text()).toContain('Funil de Vendas')
    expect(wrapper.text()).toContain('Conversão por etapa')
  })

  it('has correct structure', () => {
    const wrapper = mount(FunnelChart, {
      props: { data: mockData }
    })

    expect(wrapper.classes()).toContain('card-shadow')
    expect(wrapper.classes()).toContain('rounded-3xl')
  })

  it('displays funnel steps', () => {
    const wrapper = mount(FunnelChart, {
      props: { data: mockData }
    })

    expect(wrapper.text()).toContain('Leads')
    expect(wrapper.text()).toContain('1.000')
    expect(wrapper.text()).toContain('Contato')
    expect(wrapper.text()).toContain('750')
    expect(wrapper.text()).toContain('Proposta')
    expect(wrapper.text()).toContain('300')
    expect(wrapper.text()).toContain('Fechamento')
    expect(wrapper.text()).toContain('120')
  })
})