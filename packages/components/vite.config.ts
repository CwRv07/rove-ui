/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unocss from './uno.config'

const config = defineConfig({
  plugins: [react(), unocss()],
  build: {
    outDir: '../../dist',
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      name: 'RoveUi',
      fileName: 'rove-ui',
      formats: ['umd', 'es']
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})

export default config
