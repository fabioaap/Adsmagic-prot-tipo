import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InteractionsList from './InteractionsList.vue'

describe('InteractionsList', () => {
  const mockInteractions = [
    {
      id: '1',
      type: 'message' as const,
      contact: 'João Silva',
      time: '10:30',
      status: 'success' as const,
      message: 'Olá, gostaria de saber sobre os planos'
    },
    {
      id: '2',
      type: 'call' as const,
      contact: 'Maria Santos',
      time: '09:15',
      status: 'pending' as const
    }
  ]

  it('renders correctly with interactions', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions }
    })

    expect(wrapper.text()).toContain('Interações Recentes')
    expect(wrapper.text()).toContain('Últimas 24 horas')
    expect(wrapper.text()).toContain('João Silva')
    expect(wrapper.text()).toContain('Maria Santos')
  })

  it('renders with default empty interactions', () => {
    const wrapper = mount(InteractionsList)

    expect(wrapper.text()).toContain('Interações Recentes')
    expect(wrapper.text()).toContain('Nenhuma interação recente')
  })

  it('has correct structure', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions }
    })

    expect(wrapper.classes()).toContain('card-shadow')
    expect(wrapper.classes()).toContain('rounded-3xl')
  })

  it('displays interaction details', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions }
    })

    expect(wrapper.text()).toContain('10:30')
    expect(wrapper.text()).toContain('09:15')
    expect(wrapper.text()).toContain('Olá, gostaria de saber sobre os planos')
  })

  it('shows status indicators', () => {
    const wrapper = mount(InteractionsList, {
      props: { interactions: mockInteractions }
    })

    expect(wrapper.text()).toContain('success')
    expect(wrapper.text()).toContain('pending')
  })
})