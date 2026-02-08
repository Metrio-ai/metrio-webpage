import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// Para GitLab Pages: define BASE_PATH=/nombre-repo/ al hacer build
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/'
})
