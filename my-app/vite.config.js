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
      // 🔹 Tu servidor local RAG/Ollama
      '/ask': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      // (opcional) si usaras el alias /chat
      // '/chat': {
      //   target: 'http://localhost:3001',
      //   changeOrigin: true,
      //   secure: false
      // }
    }
  }
})
