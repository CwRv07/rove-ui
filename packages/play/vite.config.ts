import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export const config = defineConfig({
  plugins: [react()],
})

export default config
