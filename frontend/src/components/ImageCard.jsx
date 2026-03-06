import { useState } from 'react'

const SOURCE_DOT = {
  Unsplash: 'bg-ink',
  Pixabay:  'bg-emerald-500',
  Pexels:   'bg-green-500',
}

export default function ImageCard({ image, index, onClick }) {
  const [loaded,  setLoaded]  = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative cursor-pointer rounded-lg overflow-hidden bg-sand group animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 50, 500)}ms`, animationFillMode: 'both', opacity: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(image)}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="w-full shimmer-bg" style={{ paddingBottom: '70%' }} />
      )}

      {/* Image */}
      <img
        src={image.thumb}
        alt={image.title}
        className={`w-full h-auto block transition-transform duration-700 ease-out
                    ${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0 h-full object-cover'}
                    ${hovered ? 'scale-[1.04]' : 'scale-100'}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className={`absolute inset-0 transition-opacity duration-300
                       bg-gradient-to-t from-ink/80 via-ink/20 to-transparent
                       ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-cream font-body text-xs leading-snug line-clamp-2 mb-2.5">
            {image.title || 'Untitled'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${SOURCE_DOT[image.source] || 'bg-cream'}`} />
              <span className="font-mono text-xs text-cream/60">{image.source}</span>
            </div>
            <span className="font-body text-xs text-cream/50 truncate max-w-[100px]">
              {image.author}
            </span>
          </div>
        </div>
      </div>

      {/* Color swatch corner */}
      <div
        className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full ring-2 ring-cream/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: image.color }}
      />
    </div>
  )
}