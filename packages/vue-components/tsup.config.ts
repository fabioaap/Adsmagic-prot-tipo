import { defineConfig } from 'tsup';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['vue'],
  clean: true,
  // Usar uma abordagem mais simples para Vue
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});