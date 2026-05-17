import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/js/[name].js`,
          chunkFileNames: `assets/js/[name].js`,
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || 'assets';
            const info = name.split('.');
            const ext = info[info.length - 1];
            if (ext === 'css') {
              return `assets/css/[name].[ext]`;
            }
            return `assets/[name].[ext]`;
          }
        }
      }
    }
});