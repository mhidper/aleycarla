import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// El build se publica en ale/proyectos/your-ideal-breakfast/ (GitHub Pages, rama main).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
  build: {
    outDir: '../../ale/proyectos/your-ideal-breakfast',
    emptyOutDir: true,
  },
})
