import { useState, useCallback, useRef } from 'react'
import { searchImages } from '../utils/api'

export function useImageSearch() {
  const [images,  setImages]  = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [meta,    setMeta]    = useState(null)
  const [page,    setPage]    = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const currentQuery   = useRef('')
  const currentSources = useRef([])

  const search = useCallback(async (query, sources = []) => {
    if (!query.trim()) return
    currentQuery.current   = query
    currentSources.current = sources
    setLoading(true)
    setError(null)
    setPage(1)
    setImages([])
    setHasMore(false)

    try {
      const data = await searchImages(query, { sources, page: 1 })
      setImages(data.results)
      setMeta({ query: data.query, sources: data.sources, count: data.count })
      setHasMore(data.results.length >= 20)
      setPage(2)
    } catch (e) {
      setError(e?.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (loading || !currentQuery.current) return
    setLoading(true)
    try {
      const data = await searchImages(currentQuery.current, {
        sources: currentSources.current,
        page,
      })
      setImages(prev => [...prev, ...data.results])
      setHasMore(data.results.length >= 20)
      setPage(p => p + 1)
    } catch (e) {
      setError('Failed to load more images.')
    } finally {
      setLoading(false)
    }
  }, [loading, page])

  return { images, loading, error, meta, hasMore, search, loadMore }
}