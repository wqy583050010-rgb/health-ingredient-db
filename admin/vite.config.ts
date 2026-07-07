import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react(), viteSingleFile()],
  server: {
    port: 5199,
    strictPort: false,
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
  build: {
    outDir: 'admin-dist',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
  },
});
