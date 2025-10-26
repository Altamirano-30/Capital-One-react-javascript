import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 🔹 Backend remoto (Vercel)
      '/api': {
        target: 'https://hack-mty-2025.vercel.app',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, '')
      },

      // ✅ 🔹 Tu backend local FastAPI
      // Mapea /ask → /api/text-chat
      '/ask': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/ask/, '/api/text-chat')
      }
    }
  }
})
