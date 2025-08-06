import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // ✅ required to simulate DOM
    setupFiles: './src/setupTests.js' // optional, see below
  },
  
})
