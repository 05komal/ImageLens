import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images..."
        className="flex-1 bg-cream border border-ink/10 rounded-full px-5 py-3 font-body text-sm
                   placeholder-warm/50 focus:outline-none focus:ring-2 focus:ring-scarlet/20 focus:border-scarlet/40
                   transition-all duration-200"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="bg-ink hover:bg-charcoal disabled:opacity-30 text-cream font-body font-medium
                   text-sm px-6 py-2.5 rounded-full transition-all duration-200
                   disabled:cursor-not-allowed shrink-0 flex items-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
            <span className="text-cream">Searching</span>
          </>
        ) : <span className="text-cream">Search</span>}
      </button>
    </form>
  )
}