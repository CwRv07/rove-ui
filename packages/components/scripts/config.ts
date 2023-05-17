import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const resolvePath = (...str: string[]) => path.resolve(__dirname, ...str)
export const getComponentsBuildConfig = (file: string) =>
  defineConfig({
    plugins: [react()],
    build: {
      outDir: resolvePath(`../../../dist/${file}`),
      minify: true,
      lib: {
        entry: resolvePath(`../src/${file}/index.ts`),
        name: file,
        fileName: 'index',
        formats: ['umd', 'es']
      }
    }
  })

export const getComponentsPackageConfig = (file: string) => {
  return `{
  "name": "@rove-ui/${file}",
  "main": "index.umd.js",
  "module": "index.mjs",
  "types": "index.d.ts",
  "exports": {
    "./style": "./../style.css"
  }
}`
}
