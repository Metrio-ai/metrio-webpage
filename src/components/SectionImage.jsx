import './SectionImage.css'

const BASE = import.meta.env.BASE_URL

function resolveSrc (src) {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('data:')) return src
  if (src.startsWith('/')) return BASE + src.slice(1)
  return BASE + src
}

function SectionImage ({
  src,
  alt,
  width = 800,
  height = 560,
  className = '',
  priority = false,
  caption
}) {
  return (
    <figure className={`sectionImage ${className}`.trim()}>
      <img
        src={resolveSrc(src)}
        alt={alt}
        width={width}
        height={height}
        className="sectionImageImg"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
      {caption && <figcaption className="sectionImageCaption">{caption}</figcaption>}
    </figure>
  )
}

export default SectionImage
