import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Backend remoto (lo dejas igual si lo usas)
      '/api': {
        target: 'https://hack-mty-2025.vercel.app',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, '')
      },

      // 🔹 Texto -> Texto (ya configurado antes)
      '/ask': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/ask/, '/api/text-chat')
      },

      // 🔹 Voz -> Voz (nuevo)
      '/voice': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/voice/, '/api/voice-chat')
      }
    }
  }
})
