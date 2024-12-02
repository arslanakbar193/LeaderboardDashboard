import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/leaderboard/',
  plugins: [react()],
  build: {
    outDir: 'build' // Relative to the 'leaderboard' folder
  }
})
