import { useEffect, useState } from 'react'
import { fetchPageHeaders } from '../api/contentClient.js'
import { DEFAULT_PAGE_HEADERS } from '../data/defaultPageHeaders.js'

/** @param {'playground' | 'uiKit' | 'functions' | 'practice'} key */
export function usePageHeader(key) {
  const [header, setHeader] = useState(() => DEFAULT_PAGE_HEADERS[key])

  useEffect(() => {
    let cancelled = false
    void fetchPageHeaders().then((all) => {
      if (!cancelled && all[key]) setHeader(all[key])
    })
    return () => {
      cancelled = true
    }
  }, [key])

  return header
}
