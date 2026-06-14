/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import '../styles/fadeIn.css'

const FadeInSection = ({ children, id }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '80px 0px', threshold: 0.08 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div id={id} ref={ref} className={`fade-in${visible ? ' visible' : ''}`}>
      {children}
    </div>
  )
}

export default FadeInSection
