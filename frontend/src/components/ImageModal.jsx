import { useEffect } from 'react'

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!image) return null

  const handleDownload = async () => {
    try {
      const res = await fetch(image.download_url)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${image.source.toLowerCase()}-${image.id}.jpg`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      window.open(image.download_url, '_blank')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        style={{ backgroundColor: '#f7f3ee', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >

        {/* Image side */}
        <div
          className="lg:flex-1 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#e8ddd0', minHeight: '300px', maxHeight: '90vh' }}
        >
          <img
            src={image.regular}
            alt={image.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info side */}
        <div
          className="w-full lg:w-72 flex flex-col shrink-0 overflow-y-auto"
          style={{ backgroundColor: '#f7f3ee' }}
        >

          {/* Top strip */}
          <div
            className="flex items-center justify-between px-5 py-3 shrink-0"
            style={{ borderBottom: '1px solid rgba(14,14,14,0.1)' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: '#6b5f55' }}
              >
                {image.source}
              </span>
              <span style={{ color: 'rgba(14,14,14,0.2)' }}>·</span>
              {image.width && (
                <span className="font-mono text-xs" style={{ color: '#6b5f55' }}>
                  {image.width}×{image.height}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center font-body text-sm transition-all duration-200"
              style={{ backgroundColor: '#e8ddd0', color: '#5a4f47' }}
              onMouseEnter={e => { e.target.style.backgroundColor = '#0e0e0e'; e.target.style.color = '#f7f3ee' }}
              onMouseLeave={e => { e.target.style.backgroundColor = '#e8ddd0'; e.target.style.color = '#b5a898' }}
            >
              X
            </button>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-5 flex-1">

            {/* Title */}
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-1.5"
                style={{ color: '#7a6e64' }}
              >
                Title
              </p>
              <p
                className="font-display text-xl font-light leading-snug capitalize italic"
                style={{ color: '#0e0e0e' }}
              >
                {image.title || 'Untitled'}
              </p>
            </div>

            {/* Author */}
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-1.5"
                style={{ color: '#7a6e64' }}
              >
                Photographer
              </p>
              
                <a href={image.author_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm transition-colors"
                style={{ color: '#0e0e0e', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                onMouseEnter={e => e.target.style.color = '#c8372d'}
                onMouseLeave={e => e.target.style.color = '#0e0e0e'}
              >
                {image.author}
              </a>
            </div>

            {/* Tags */}
            {image.tags?.length > 0 && (
              <div>
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-2"
                  style={{ color: '#7a6e64' }}
                >
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {image.tags.slice(0, 6).map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 rounded-full"
                      style={{ color: '#5a4f47', border: '1px solid rgba(14,14,14,0.1)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div
              className="mt-auto flex flex-col gap-2 pt-4"
              style={{ borderTop: '1px solid rgba(14,14,14,0.1)' }}
            >
              <button
                onClick={handleDownload}
                className="w-full font-body font-medium text-sm py-3 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#c8372d', color: '#f7f3ee' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b02f27'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#c8372d'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Free
              </button>

              
                <a href={image.page_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-body text-sm py-3 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
                style={{ border: '1px solid rgba(14,14,14,0.15)', color: '#5a4f47' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(14,14,14,0.4)'; e.currentTarget.style.color = '#0e0e0e' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(14,14,14,0.15)'; e.currentTarget.style.color = '#b5a898' }}
              >
                View on {image.source}
              </a>
            </div>

            <p
              className="font-mono text-xs leading-relaxed text-center"
              style={{ color: '#8a7d73' }}
            >
              Free to use · No sign-in required
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}