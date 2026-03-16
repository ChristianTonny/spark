import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    exclude: ['tests/e2e/**'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
