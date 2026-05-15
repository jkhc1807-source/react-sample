import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
for (const dir of ['.vite', '.vite-temp']) {
  const target = path.join(root, 'node_modules', dir)
  try {
    fs.rmSync(target, { recursive: true, force: true })
    console.log('removed', target)
  } catch {
    /* ignore */
  }
}
console.log('Vite cache clear done.')
