import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    css: false,
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
