import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      // Przechwytuj wszystkie zapytania do /api i przekierowuj je
      '/api': {
        target: 'http://backend:5001', // 'backend' to nazwa serwisu z docker-compose
        changeOrigin: true,
      }
    }
  }
})