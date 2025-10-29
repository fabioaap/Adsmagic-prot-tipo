import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RevenueChart from './RevenueChart.vue'

describe('RevenueChart', () => {
  const mockData = [
    { name: 'Meta', value: 82, color: '#6366f1' },
    { name: 'Restante', value: 18, color: '#e5e7eb' }
  ]

  it('renders correctly with data', () => {
    const wrapper = mount(RevenueChart, {
      props: { data: mockData }
    })

    expect(wrapper.text()).toContain('Receita')
    expect(wrapper.text()).toContain('Comparativo com meta')
    expect(wrapper.text()).toContain('+5,3%')
    expect(wrapper.text()).toContain('82%')
    expect(wrapper.text()).toContain('Meta atingida')
  })

  it('renders with default empty data', () => {
    const wrapper = mount(RevenueChart)

    expect(wrapper.text()).toContain('Receita')
    expect(wrapper.text()).toContain('Comparativo com meta')
  })

  it('has correct structure', () => {
    const wrapper = mount(RevenueChart, {
      props: { data: mockData }
    })

    expect(wrapper.classes()).toContain('card-shadow')
    expect(wrapper.classes()).toContain('rounded-3xl')
  })
})