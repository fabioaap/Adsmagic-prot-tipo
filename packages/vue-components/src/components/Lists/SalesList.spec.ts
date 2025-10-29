import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SalesList from './SalesList.vue'

describe('SalesList', () => {
  const mockSales = [
    {
      id: '1',
      client: 'João Silva',
      value: 2500,
      date: '15/10',
      status: 'completed' as const,
      product: 'Plano Premium'
    },
    {
      id: '2',
      client: 'Maria Santos',
      value: 1800,
      date: '14/10',
      status: 'pending' as const,
      product: 'Plano Básico'
    }
  ]

  it('renders correctly with sales', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales }
    })

    expect(wrapper.text()).toContain('Vendas Recentes')
    expect(wrapper.text()).toContain('Últimas transações')
    expect(wrapper.text()).toContain('João Silva')
    expect(wrapper.text()).toContain('Maria Santos')
  })

  it('renders with default empty sales', () => {
    const wrapper = mount(SalesList)

    expect(wrapper.text()).toContain('Vendas Recentes')
    expect(wrapper.text()).toContain('Nenhuma venda recente')
  })

  it('has correct structure', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales }
    })

    expect(wrapper.classes()).toContain('card-shadow')
    expect(wrapper.classes()).toContain('rounded-3xl')
  })

  it('displays sale details', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales }
    })

    expect(wrapper.text()).toContain('R$')
    expect(wrapper.text()).toContain('2.500')
    expect(wrapper.text()).toContain('1.800')
    expect(wrapper.text()).toContain('15/10')
    expect(wrapper.text()).toContain('14/10')
    expect(wrapper.text()).toContain('Plano Premium')
    expect(wrapper.text()).toContain('Plano Básico')
  })

  it('shows status indicators', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales }
    })

    expect(wrapper.text()).toContain('completed')
    expect(wrapper.text()).toContain('pending')
  })
})