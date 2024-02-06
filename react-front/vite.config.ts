import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env)
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_APP_PORT) || 4000,
      host: true,
    },
    preview: {
      strictPort: true,
      host: true,
      port: parseInt(env.VITE_APP_PORT) || 4000,
      publicDir: 'public',
    },
  }
})