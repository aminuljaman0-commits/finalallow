
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix: define __dirname for ESM environments as it's not available by default in Node.js ESM modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000
  }
});
