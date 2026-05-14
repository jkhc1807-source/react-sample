import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function defaultStorePath() {
  return path.join(__dirname, '..', 'data', 'users.json')
}

function storePath() {
  return process.env.USERS_STORE_PATH || defaultStorePath()
}

function readDisk() {
  const p = storePath()
  try {
    const raw = fs.readFileSync(p, 'utf8')
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return new Map()
    const m = new Map()
    for (const u of arr) {
      if (u && typeof u.email === 'string') {
        m.set(u.email.toLowerCase(), u)
      }
    }
    return m
  } catch (e) {
    if (e && e.code === 'ENOENT') return new Map()
    throw e
  }
}

function writeDisk(map) {
  const p = storePath()
  fs.mkdirSync(path.dirname(p), { recursive: true })
  const arr = Array.from(map.values())
  fs.writeFileSync(p, JSON.stringify(arr, null, 2), 'utf8')
}

/** @type {Map<string, { id: string, email: string, passwordHash: string | null, role?: string }>} */
export const usersByEmail = readDisk()

export function persistUsers() {
  writeDisk(usersByEmail)
}
