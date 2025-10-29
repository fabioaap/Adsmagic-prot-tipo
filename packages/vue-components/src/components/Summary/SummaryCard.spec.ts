import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SummaryCard from './SummaryCard.vue';
import { tokens } from '@adsmagic/tokens';

describe('SummaryCard', () => {
  it('renders correctly with positive badge', () => {
    const wrapper = mount(SummaryCard, {
      props: {
        label: 'Receita',
        value: 'R$ 6.060,00',
        caption: 'Receita total atribuída.',
        badge: '+9,8%',
        badgeType: 'positive' as const,
      },
    });

    expect(wrapper.text()).toContain('Receita');
    expect(wrapper.text()).toContain('R$ 6.060,00');
    expect(wrapper.text()).toContain('Receita total atribuída.');
    expect(wrapper.text()).toContain('+9,8%');
  });

  it('renders correctly with negative badge', () => {
    const wrapper = mount(SummaryCard, {
      props: {
        label: 'Custo por venda',
        value: 'R$ 98,00',
        caption: 'Aquisição média por venda.',
        badge: '-3,1%',
        badgeType: 'negative' as const,
      },
    });

    expect(wrapper.text()).toContain('Custo por venda');
    expect(wrapper.text()).toContain('R$ 98,00');
    expect(wrapper.text()).toContain('Aquisição média por venda.');
    expect(wrapper.text()).toContain('-3,1%');
  });

  it('applies custom style when provided', () => {
    const customStyle = { gridColumn: 'span 2' };
    const wrapper = mount(SummaryCard, {
      props: {
        label: 'Test',
        value: 'Test',
        caption: 'Test',
        badge: 'Test',
        badgeType: 'positive' as const,
        style: customStyle,
      },
    });

    expect(wrapper.attributes('style')).toContain('grid-column: span 2');
  });
});