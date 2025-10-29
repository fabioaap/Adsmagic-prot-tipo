import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': '/src',
      '@adsmagic/react': '../../packages/react-components/src',
      '@adsmagic/tokens': '../../packages/tokens/src'
    }
  }
});