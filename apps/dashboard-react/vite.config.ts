import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    // Compressão Gzip
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Compressão Brotli
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React e React DOM
          'react-vendor': ['react', 'react-dom'],
          // Separar React Router
          'router': ['react-router-dom'],
          // Separar biblioteca de gráficos
          'charts': ['recharts'],
          // Separar componentes do design system
          'design-system': ['@adsmagic/react', '@adsmagic/tokens'],
        },
      },
    },
    // Aumentar limite de chunk para reduzir warnings
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});