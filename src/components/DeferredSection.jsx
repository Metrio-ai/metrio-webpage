/* eslint-disable react/prop-types */
import { Suspense, useEffect, useRef, useState } from 'react'

function DeferredSection ({ children, minHeight = 160, rootMargin = '320px 0px' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref}>
      {active ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight }} aria-hidden="true" />
      )}
    </div>
  )
}

export default DeferredSection
