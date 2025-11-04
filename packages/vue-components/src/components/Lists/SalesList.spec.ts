import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { tokens } from '@adsmagic/tokens'
import SalesList from './SalesList.vue'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const bigint = parseInt(normalized, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgb(${r}, ${g}, ${b})`
}

describe('SalesList', () => {
  const mockSales = [
    {
      id: '1',
      client: 'Joao Silva',
      value: 2500,
      date: '15/10',
      status: 'completed' as const,
      product: 'Plano Premium',
    },
    {
      id: '2',
      client: 'Maria Santos',
      value: 1800,
      date: '14/10',
      status: 'pending' as const,
      product: 'Plano Basico',
    },
  ]

  it('renders correctly with sales data', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales },
    })

    expect(wrapper.text()).toContain('Vendas Recentes')
    expect(wrapper.text()).toContain('Ultimas transacoes')
    expect(wrapper.text()).toContain('Joao Silva')
    expect(wrapper.text()).toContain('Maria Santos')
  })

  it('renders empty state when there are no sales', () => {
    const wrapper = mount(SalesList)

    expect(wrapper.text()).toContain('Vendas Recentes')
    expect(wrapper.text()).toContain('Nenhuma venda recente')
  })

  it('applies design tokens on container', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales },
    })

    const styleAttribute = wrapper.attributes('style') ?? ''

    expect(styleAttribute).toContain(`box-shadow: ${tokens.shadows.card}`)
    expect(styleAttribute).toContain(`border-radius: ${tokens.radii.lg}`)
    expect(styleAttribute).toContain(`background-color: ${tokens.aliases.surface}`)
  })

  it('displays formatted sale information', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales },
    })

    expect(wrapper.text()).toContain(formatCurrency(mockSales[0].value))
    expect(wrapper.text()).toContain(formatCurrency(mockSales[1].value))
    expect(wrapper.text()).toContain(mockSales[0].date)
    expect(wrapper.text()).toContain(mockSales[1].date)
    expect(wrapper.text()).toContain(mockSales[0].product)
    expect(wrapper.text()).toContain(mockSales[1].product)
  })

  it('uses status colors for each sale', () => {
    const wrapper = mount(SalesList, {
      props: { sales: mockSales },
    })

    const getDateStyle = (date: string) =>
      wrapper
        .findAll('p')
        .find((paragraph) => paragraph.text() === date)
        ?.attributes('style') ?? ''

    expect(getDateStyle('15/10')).toContain(hexToRgb(tokens.colors.success600))
    expect(getDateStyle('14/10')).toContain(hexToRgb(tokens.colors.primary500))
  })
})
