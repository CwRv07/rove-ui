/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs-extra'
import * as path from 'path'
import config from '../vite.config'
import { build, InlineConfig, defineConfig, UserConfig } from 'vite'

import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)

const buildAll = async () => {
  await build()

  const baseOutDir = (config as UserConfig)!.build!.outDir as string

  const srcDir = path.resolve(__dirname, '../src')

  const componentsDir = fs.readdirSync(srcDir).filter((name) => {
    const componentDir = path.resolve(srcDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })

  for (const name of componentsDir) {
    const outDir = path.resolve(baseOutDir, name)

    const custom = {
      lib: {
        entry: path.resolve(srcDir, 'index'),
        name, // 导出模块名
        fileName: `index`,
        formats: [`umd`]
      },
      outDir
    }

    const _config = {
      ...config,
      build: {
        ...(config as UserConfig).build,
        ...custom
      }
    }
    await build(defineConfig(_config as UserConfig) as InlineConfig)

    fs.outputFile(
      path.resolve(outDir, `package.json`),
      `{
  "name": "@rove-ui/${name}",
  "main": "index.umd.js",
  "module": "index.umd.js"
}`,
      `utf-8`
    )
  }
}

buildAll()
