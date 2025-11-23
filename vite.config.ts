import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Garante que 'global' exista (algumas libs antigas usam)
      global: 'window',
      // Injeta a API Key
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Previne crash se algo verificar process.env.NODE_ENV
      'process.env.NODE_ENV': JSON.stringify(mode),
    }
  }
})