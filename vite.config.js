import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function writePublicLlms() {
  const mod = await import(pathToFileURL(path.resolve(__dirname, 'src/data/llmsDocument.js')).href)
  const md = mod.buildLlmsSiteDocument()
  // UTF-8 BOM: 일부 브라우저가 text/plain에 charset 없이 줄 때 한글 깨짐 방지
  fs.writeFileSync(path.resolve(__dirname, 'public/llms.txt'), `\uFEFF${md}`, 'utf8')
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'geo-emit-llms-txt',
      buildStart() {
        return writePublicLlms()
      },
      configureServer() {
        return writePublicLlms()
      },
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
