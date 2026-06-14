import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  build: {
    cssMinify: true,
    target: 'es2020',
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-markdown': ['react-markdown', 'remark-gfm'],
          'vendor-gallery': ['react-image-gallery']
        }
      }
    }
  }
})
