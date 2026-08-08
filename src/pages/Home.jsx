import { lazy, Suspense } from 'react'
import Hero from './sections/Hero'

// Todo lo que está debajo del Hero se divide en chunks separados
const ServiciosHome = lazy(() => import('./sections/ServiciosHome'))
const StatsBar = lazy(() => import('./sections/StatsBar'))
const RepuestosHome = lazy(() => import('./sections/RepuestosHome'))
const ComoTrabajamos = lazy(() => import('./sections/ComoTrabajamos'))
const ContactoHome = lazy(() => import('./sections/ContactoHome'))

export default function Home() {
  return (
    <>
      <Hero />

      <Suspense fallback={null}>
        <ServiciosHome />
        <StatsBar />
        <RepuestosHome />
        <ComoTrabajamos />
        <ContactoHome />
      </Suspense>
    </>
  )
}