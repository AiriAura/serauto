import Hero           from './sections/Hero'
import ServiciosHome  from './sections/ServiciosHome'
import StatsBar       from './sections/StatsBar'
import RepuestosHome  from './sections/RepuestosHome'
import ComoTrabajamos from './sections/ComoTrabajamos'
import ContactoHome   from './sections/ContactoHome'

export default function Home() {
  return (
    <>
      <Hero />
      <ServiciosHome />
      <StatsBar />
      <RepuestosHome />
      <ComoTrabajamos />
      <ContactoHome />
    </>
  )
}
