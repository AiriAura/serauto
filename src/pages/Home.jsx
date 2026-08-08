import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Hero from './sections/Hero'

// Lazy load all below-fold sections
const ServiciosHome  = lazy(() => import('./sections/ServiciosHome'))
const StatsBar       = lazy(() => import('./sections/StatsBar'))
const RepuestosHome  = lazy(() => import('./sections/RepuestosHome'))
const ComoTrabajamos = lazy(() => import('./sections/ComoTrabajamos'))
const ContactoHome   = lazy(() => import('./sections/ContactoHome'))

function LazySection({ children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {visible ? (
        <Suspense fallback={<div style={{ minHeight: 200 }} aria-hidden="true" />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight: 200 }} aria-hidden="true" />
      )}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <LazySection><ServiciosHome /></LazySection>
      <LazySection><StatsBar /></LazySection>
      <LazySection><RepuestosHome /></LazySection>
      <LazySection><ComoTrabajamos /></LazySection>
      <LazySection><ContactoHome /></LazySection>
    </>
  )
}
