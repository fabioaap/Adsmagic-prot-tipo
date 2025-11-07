import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { tokens } from '@adsmagic/tokens'
import InteractionsList from './InteractionsList.vue'

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const bigint = parseInt(normalized, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgb(${r}, ${g}, ${b})`
}

describe('InteractionsList', () => {
  const mockInteractions = [
    {
      id: '1',
      type: 'message' as const,
      contact: 'Joao Silva',
      time: '10:30',
      status: 'success' as const,
      message: 'Ola, gostaria de saber sobre os planos',
    },
    {
      id: '2',
      type: 'call' as const,
      contact: 'Maria Santos',
      time: '09:15',
      status: 'pending' as const,
    },
  ]

  it('renders recent interactions', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions },
    })

    expect(wrapper.text()).toContain('Interacoes Recentes')
    expect(wrapper.text()).toContain('Ultimas 24 horas')
    expect(wrapper.text()).toContain('Joao Silva')
    expect(wrapper.text()).toContain('Maria Santos')
  })

  it('renders empty state when there are no interactions', () => {
    const wrapper = mount(InteractionsList)

    expect(wrapper.text()).toContain('Interacoes Recentes')
    expect(wrapper.text()).toContain('Nenhuma interacao recente')
  })

  it('applies design tokens on container', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions },
    })

    const styleAttribute = wrapper.attributes('style') ?? ''

    expect(styleAttribute).toContain(`box-shadow: ${tokens.shadows.card}`)
    expect(styleAttribute).toContain(`border-radius: ${tokens.radii.lg}`)
    expect(styleAttribute).toContain(`background-color: ${tokens.aliases.surface}`)
  })

  it('displays interaction details', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions },
    })

    expect(wrapper.text()).toContain('10:30')
    expect(wrapper.text()).toContain('09:15')
    expect(wrapper.text()).toContain('Ola, gostaria de saber sobre os planos')
  })

  it('uses status colors for timestamps', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions },
    })

    const getTimeStyle = (time: string) =>
      wrapper
        .findAll('span')
        .find((node) => node.text() === time)
        ?.attributes('style') ?? ''

    expect(getTimeStyle('10:30')).toContain(hexToRgb(tokens.colors.success600))
    expect(getTimeStyle('09:15')).toContain(hexToRgb(tokens.colors.primary500))
  })
})
