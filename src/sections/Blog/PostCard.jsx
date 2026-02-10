import { useState } from 'react'
import { Link } from 'react-router-dom'

const FALLBACK_IMAGE = '/blog/transformacion-digital.webp'

function toAbsoluteUrl (path) {
  if (!path || !path.startsWith('/')) return path
  const base = import.meta.env.BASE_URL
  return base + path.slice(1)
}

function PostCard ({ slug, title, description, author, date, image, imageAlt }) {
  const [imgSrc, setImgSrc] = useState(toAbsoluteUrl(image))

  const handleImageError = () => {
    setImgSrc(toAbsoluteUrl(FALLBACK_IMAGE))
  }

  return (
    <article className="postCard">
      <Link to={`/blog/${slug}`} className="postCardLink">
        <div className="postCardImageWrap">
          <img
            src={imgSrc}
            alt={imageAlt || title || 'Imagen del artículo'}
            className="postCardImage"
            width={600}
            height={320}
            loading="lazy"
            onError={handleImageError}
          />
          <span className="postCardOverlay" aria-hidden="true" />
        </div>
        <div className="postCardBody">
          <h2 className="postCardTitle">{title}</h2>
          <p className="postCardDate">{date}</p>
          <p className="postCardAuthor">{author}</p>
          <p className="postCardDescription">{description}</p>
          <span className="postCardCta">
            Leer artículo
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </span>
        </div>
      </Link>
    </article>
  )
}

export default PostCard
