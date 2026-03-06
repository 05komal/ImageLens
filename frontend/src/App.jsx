import { useState, useMemo } from 'react'
import SearchBar   from './components/SearchBar'
import FilterBar   from './components/FilterBar'
import MasonryGrid from './components/MasonryGrid'
import ImageModal  from './components/ImageModal'
import { useImageSearch } from './hooks/useImageSearch'

function SkeletonGrid() {
  const heights = [65, 85, 55, 75, 90, 60, 70, 80, 65]
  const columns = [[], [], []]
  heights.forEach((h, i) => columns[i % 3].push(h))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {columns.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-2">
          {col.map((h, i) => (
            <div key={i} className="shimmer-bg rounded-lg" style={{ paddingBottom: `${h}%` }} />
          ))}
        </div>
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Big decorative text */}
      <div className="absolute -top-8 left-0 right-0 flex justify-center pointer-events-none select-none">
        <span className="font-display text-[18vw] font-light text-ink/[0.03] leading-none whitespace-nowrap">
          DISCOVER
        </span>
      </div>

      <div className="relative py-20 md:py-28 text-center">
        {/* Issue label */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-scarlet" />
          <span className="font-mono text-xs text-scarlet tracking-[0.2em] uppercase">Visual Discovery Platform</span>
          <div className="w-8 h-px bg-scarlet" />
        </div>

        {/* Hero headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-ink leading-[0.9] mb-4">
          Find Images
          <br />
          <span className="italic text-scarlet">Legally.</span>
        </h1>

        <p className="font-body text-warm text-base md:text-lg max-w-lg mx-auto mt-8 leading-relaxed font-light">
          Search millions of high-resolution photos from Unsplash, Pixabay & Pexels — 
          all via official APIs with proper licensing.
        </p>

        {/* Source stats */}
        <div className="mt-14 inline-grid grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-xl overflow-hidden">
          {[
            { name: 'Unsplash', stat: '5M+',    label: 'photos' },
            { name: 'Pixabay',  stat: 'CC0',     label: 'licensed' },
            { name: 'Pexels',   stat: '∞',       label: 'free use' },
          ].map((s, i) => (
            <div key={i} className="bg-cream px-6 py-4 text-center">
              <p className="font-display text-2xl font-light text-ink">{s.stat}</p>
              <p className="font-mono text-xs text-warm mt-1 uppercase tracking-wider">{s.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="editorial-line" />
    </div>
  )
}

export default function App() {
  const { images, loading, error, meta, hasMore, search, loadMore } = useImageSearch()
  const [selectedSources, setSelectedSources] = useState([])
  const [selectedImage,   setSelectedImage]   = useState(null)
  const [hasSearched,     setHasSearched]     = useState(false)

  const handleSearch = (query) => {
    setHasSearched(true)
    search(query, selectedSources)
  }

  const filteredImages = useMemo(() => {
    if (!selectedSources.length) return images
    return images.filter(img => selectedSources.includes(img.source.toLowerCase()))
  }, [images, selectedSources])

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Top Bar ──────────────────────────────────────────── */}
      <div className="border-b border-ink/8 bg-cream/95 backdrop-blur-md sticky top-0 z-40">
        {/* Masthead */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-scarlet rounded flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <span className="font-display text-xl tracking-tight text-ink">ImageLens</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-warm">3 sources active</span>
          </div>
        </div>

        {/* Search bar row */}
        <div className="border-t border-ink/6 bg-fog/60">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-3">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8">

        {!hasSearched ? (
          <HeroSection />
        ) : (
          <div className="py-8">
            {/* Filter bar */}
            {(images.length > 0 || loading) && (
              <div className="mb-8 pb-5 editorial-line">
                <FilterBar selected={selectedSources} onChange={setSelectedSources} meta={meta} />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-20 animate-fade-in">
                <p className="font-display text-2xl italic text-scarlet mb-2">Something went wrong</p>
                <p className="font-body text-warm text-sm">{error}</p>
              </div>
            )}

            {/* Grid */}
            {loading && images.length === 0 ? (
              <SkeletonGrid />
            ) : filteredImages.length === 0 && !loading ? (
              <div className="text-center py-28 animate-fade-in">
                <p className="font-display text-5xl font-light italic text-ink/30 mb-3">No results</p>
                <p className="font-body text-warm text-sm">Try a different keyword or enable more sources</p>
              </div>
            ) : (
              <MasonryGrid images={filteredImages} onImageClick={setSelectedImage} />
            )}

            {/* Load more */}
            {hasMore && !loading && (
              <div className="flex justify-center mt-14">
                <button
                  onClick={loadMore}
                  className="group flex items-center gap-3 border border-ink/15 hover:border-scarlet
                             text-warm hover:text-scarlet font-body text-sm px-8 py-3.5 rounded-full
                             transition-all duration-300"
                >
                  <span>Load more images</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                       className="group-hover:translate-y-0.5 transition-transform duration-200">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                </button>
              </div>
            )}

            {loading && images.length > 0 && (
              <div className="flex justify-center mt-14">
                <div className="w-5 h-5 border-2 border-ink/10 border-t-scarlet rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(14,14,14,0.1)', marginTop: '5rem' }}>

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#c8372d' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <span className="font-display text-lg italic" style={{ color: '#0e0e0e' }}>ImageLens</span>
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: '#7a6e64' }}>
              A legal image discovery platform aggregating millions of free photos from the world's best sources.
            </p>
          </div>

          {/* Sources */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: '#7a6e64' }}>Sources</p>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Unsplash', url: 'https://unsplash.com', desc: 'Free high-res photos' },
                { name: 'Pixabay',  url: 'https://pixabay.com',  desc: 'CC0 licensed images' },
                { name: 'Pexels',   url: 'https://pexels.com',   desc: 'Free stock photos' },
              ].map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm transition-colors"
                  style={{ color: '#5a4f47' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c8372d'}
                  onMouseLeave={e => e.currentTarget.style.color = '#5a4f47'}
                >
                  <span>{s.name}</span>
                  <span className="font-mono text-xs" style={{ color: '#b5a898' }}>— {s.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: '#7a6e64' }}>Contact</p>
            <p className="font-body text-sm" style={{ color: '#7a6e64' }}>
              Have questions, feedback, or want to collaborate?
            </p>
            <a
              href="mailto:zenertrizz@gmail.com"
              className="inline-flex items-center gap-2 font-body text-sm font-medium transition-colors"
              style={{ color: '#c8372d' }}
              onMouseEnter={e => e.currentTarget.style.color = '#0e0e0e'}
              onMouseLeave={e => e.currentTarget.style.color = '#c8372d'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              zenertrizz@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid rgba(14,14,14,0.08)' }}
        >
          <p className="font-mono text-xs" style={{ color: '#b5a898' }}>
            © {new Date().getFullYear()} ImageLens. All images belong to their respective owners.
          </p>
          <p className="font-mono text-xs" style={{ color: '#b5a898' }}>
            Built with Django · React · Tailwind
          </p>
        </div>

      </footer>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  )
}