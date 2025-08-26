import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@Pages': path.resolve(__dirname, './src/components/Pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@svg': path.resolve(__dirname, './src/assets/svg'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@src': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './src/store'),
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
