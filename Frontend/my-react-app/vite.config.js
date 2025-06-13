import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/auth': 'http://localhost:8080', // Proxy backend
    }
  },
  plugins: [tailwindcss(),react()],
})
