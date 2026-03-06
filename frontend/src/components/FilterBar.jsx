const SOURCES = [
  { id: 'unsplash', label: 'Unsplash' },
  { id: 'pixabay',  label: 'Pixabay'  },
  { id: 'pexels',   label: 'Pexels'   },
]

export default function FilterBar({ selected, onChange, meta }) {
  const toggle = (id) => {
    if (selected.includes(id)) onChange(selected.filter(s => s !== id))
    else onChange([...selected, id])
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs text-warm/60 uppercase tracking-widest">Source</span>
        <div className="w-px h-3 bg-ink/10 mx-1" />

        <button
          onClick={() => onChange([])}
          className={`font-body text-xs px-4 py-1.5 rounded-full border transition-all duration-200
            ${selected.length === 0
              ? 'bg-ink text-cream border-ink'
              : 'border-ink/15 text-warm hover:border-ink/30 hover:text-ink'}`}
        >
          All
        </button>

        {SOURCES.map(src => (
          <button
            key={src.id}
            onClick={() => toggle(src.id)}
            className={`font-body text-xs px-4 py-1.5 rounded-full border transition-all duration-200
              ${selected.includes(src.id)
                ? 'bg-scarlet text-cream border-scarlet'
                : 'border-ink/15 text-warm hover:border-scarlet/40 hover:text-scarlet'}`}
          >
            {src.label}
          </button>
        ))}
      </div>

      {meta && (
        <p className="font-mono text-xs text-warm">
          <span className="text-ink font-bold">{meta.count}</span> images for{' '}
          <span className="text-scarlet italic font-display text-sm">"{meta.query}"</span>
        </p>
      )}
    </div>
  )
}