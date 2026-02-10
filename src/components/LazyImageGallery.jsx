import { useState, useEffect, useRef, lazy, Suspense } from 'react'

const ImageGallery = lazy(() => import('react-image-gallery'))

const GALLERY_IMAGES = [
  {
    original: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    originalAlt: 'Desarrollo de soluciones BI',
    originalHeight: 420,
    originalWidth: 800,
    description: 'Desarrollo de soluciones BI'
  },
  {
    original: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    originalAlt: 'Herramientas propias para visualización de datos',
    originalHeight: 420,
    originalWidth: 800,
    description: 'Herramientas propias para visualización de datos'
  },
  {
    original: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    originalAlt: 'Asesoramiento estratégico sobre los datos',
    originalHeight: 420,
    originalWidth: 800,
    description: 'Asesoramiento estratégico sobre los datos'
  },
  {
    original: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    originalAlt: 'Transformación digital de la empresa',
    originalHeight: 420,
    originalWidth: 800,
    description: 'Transformación digital de la empresa'
  },
  {
    original: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    originalAlt: 'Leads cualificados: base de datos accionable y mailing con más del 40% de apertura',
    originalHeight: 420,
    originalWidth: 800,
    description: 'Leads cualificados: base de datos accionable y mailing con más del 40% de apertura'
  }
]

const GalleryPlaceholder = () => (
  <div style={{ aspectRatio: '16/9', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
    <div style={{ width: 28, height: 28, border: '2px solid var(--color-border)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
)

export default function LazyImageGallery() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('react-image-gallery/styles/css/image-gallery.css')
          setShouldLoad(true)
        }
      },
      { rootMargin: '150px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="gallery">
      {shouldLoad ? (
        <Suspense fallback={<GalleryPlaceholder />}>
          <ImageGallery
            items={GALLERY_IMAGES}
            infinite
            showFullscreenButton={false}
            showThumbnails={false}
            showBullets
            autoPlay
            slideInterval={4000}
            slideDuration={500}
            lazyLoad
          />
        </Suspense>
      ) : (
        <GalleryPlaceholder />
      )}
    </div>
  )
}
