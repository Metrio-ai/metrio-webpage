import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  build: {
    cssMinify: true,
    target: 'es2020',
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks (id) {
          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark-gfm')) {
            return 'vendor-markdown'
          }
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/jsx-runtime') ||
            id.includes('node_modules/react/index.js')
          ) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-router-dom')) return 'vendor-router'
          if (id.includes('react-image-gallery')) return 'vendor-gallery'
        }
      }
    }
  }
})
