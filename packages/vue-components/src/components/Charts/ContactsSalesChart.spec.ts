import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactsSalesChart from './ContactsSalesChart.vue';

describe('ContactsSalesChart', () => {
  it('renders correctly with data', () => {
    const data = [
      { week: 'Fev', contacts: 200, sales: 50 },
      { week: 'Mar', contacts: 250, sales: 65 },
    ];

    const wrapper = mount(ContactsSalesChart, {
      props: { data },
    });

    expect(wrapper.text()).toContain('Contatos e Vendas');
    expect(wrapper.text()).toContain('Volume por semana');
    expect(wrapper.text()).toContain('Exportar CSV');
    expect(wrapper.text()).toContain('Contatos');
    expect(wrapper.text()).toContain('Vendas');
  });

  it('renders with empty data array', () => {
    const wrapper = mount(ContactsSalesChart, {
      props: { data: [] },
    });

    expect(wrapper.text()).toContain('Contatos e Vendas');
  });
});