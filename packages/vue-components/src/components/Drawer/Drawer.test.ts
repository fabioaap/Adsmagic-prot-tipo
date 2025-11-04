import { render, cleanup } from '@testing-library/vue'
import { afterEach, describe, it, expect } from 'vitest'
import DsDrawer from './Drawer.vue'

const renderOptions = {
  global: {
    stubs: {
      teleport: false,
    },
  },
}

afterEach(() => {
  cleanup()
  document.body.innerHTML = ''
})

describe('DsDrawer', () => {
  it('renders drawer panel when open', () => {
    const { getByTestId } = render(DsDrawer, {
      props: { isOpen: true },
      slots: { default: '<div>Content</div>' },
      ...renderOptions,
    })

    expect(getByTestId('drawer-panel')).toBeInTheDocument()
  })

  it('does not render drawer when closed', () => {
    const { queryByTestId } = render(DsDrawer, {
      props: { isOpen: false },
      slots: { default: '<div>Content</div>' },
      ...renderOptions,
    })

    expect(queryByTestId('drawer-panel')).toBeNull()
  })

  it('applies correct width for large size', () => {
    const { getByTestId } = render(DsDrawer, {
      props: { isOpen: true, size: 'lg' },
      slots: { default: '<div>Content</div>' },
      ...renderOptions,
    })

    expect(getByTestId('drawer-panel')).toHaveStyle({ width: '500px' })
  })

  it('renders overlay when variant is overlay', () => {
    const { getByTestId } = render(DsDrawer, {
      props: { isOpen: true, variant: 'overlay' },
      slots: { default: '<div>Content</div>' },
      ...renderOptions,
    })

    expect(getByTestId('drawer-overlay')).toBeInTheDocument()
  })
})
