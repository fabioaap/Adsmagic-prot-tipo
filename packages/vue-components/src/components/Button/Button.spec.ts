import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Button from './Button.vue';

describe('DsButton', () => {
  it('renders default slot text', () => {
    render(Button, {
      slots: { default: 'Criar campanha' },
    });

    expect(screen.getByRole('button', { name: 'Criar campanha' })).toBeTruthy();
  });

  it('renders leading and trailing slots', () => {
    render(Button, {
      slots: {
        default: 'Exportar',
        leading: '<span data-testid="leading" />',
        trailing: '<span data-testid="trailing" />',
      },
    });

    expect(screen.getByTestId('leading')).toBeTruthy();
    expect(screen.getByTestId('trailing')).toBeTruthy();
  });
});
