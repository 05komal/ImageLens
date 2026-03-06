import ImageCard from './ImageCard'

export default function MasonryGrid({ images, onImageClick }) {
  if (!images.length) return null

  const columns = [[], [], []]
  images.forEach((img, i) => columns[i % 3].push({ img, originalIndex: i }))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-2">
          {col.map(({ img, originalIndex }) => (
            <ImageCard key={img.id} image={img} index={originalIndex} onClick={onImageClick} />
          ))}
        </div>
      ))}
    </div>
  )
}