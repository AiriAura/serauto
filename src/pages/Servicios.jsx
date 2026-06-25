import { Link } from 'react-router-dom'
import styles from './Servicios.module.css'
const servicios = [
  { icon: '⚡', title: 'Sistemas Eléctricos', desc: 'Diagnóstico y reparación de sistemas eléctricos en maquinaria y camiones.', detalles: ['Diagnóstico computarizado','Reparación de cableado','Instalación de accesorios','Revisión de fusibles y relés'] },
  { icon: '❄️', title: 'Aire Acondicionado', desc: 'Mantención, reparación y recarga de sistemas de climatización vehicular.', detalles: ['Recarga de gas refrigerante','Reparación de compresores','Cambio de filtros','Diagnóstico de fugas'] },
  { icon: '🔬', title: 'Diagnóstico Electrónico', desc: 'Escaneo avanzado, diagnóstico y programación de módulos.', detalles: ['Scanner profesional','Programación de ECU','Borrado de códigos','Análisis de fallas'] },
  { icon: '🔧', title: 'Partidores y Alternadores', desc: 'Reparación y reconstrucción de motores de partida y alternadores.', detalles: ['Bobinado de motores','Cambio de escobillas','Prueba de carga','Reconstrucción completa'] },
  { icon: '🔋', title: 'Sistemas de Carga', desc: 'Revisión y reparación de sistemas de carga y baterías.', detalles: ['Prueba de baterías','Revisión de reguladores','Carga rápida','Reemplazo de baterías'] },
  { icon: '📋', title: 'Mantención Preventiva', desc: 'Planes de mantención preventiva para reducir fallas y tiempos de paro.', detalles: ['Revisión periódica','Informe técnico','Plan de mantención','Seguimiento de flota'] },
]
export default function Servicios() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Nuestros servicios</p>
          <h1 className={styles.heroTitle}>Soluciones que dan respuesta</h1>
          <p className={styles.heroDesc}>Atendemos vehículos, camiones, maquinaria y equipos de minería con los más altos estándares técnicos.</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.grid}>
          {servicios.map((s, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon}>{s.icon}</span>
              <h2 className={styles.cardTitle}>{s.title}</h2>
              <p className={styles.cardDesc}>{s.desc}</p>
              <ul className={styles.detalles}>{s.detalles.map((d, j) => <li key={j}>✓ {d}</li>)}</ul>
              <Link to="/contacto" className={styles.btn}>Cotizar este servicio →</Link>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>¿Necesitas atención en terreno?</h2>
          <p>También nos desplazamos hasta donde estás. Consulta disponibilidad.</p>
          <Link to="/contacto" className={styles.ctaBtn}>Contactar ahora →</Link>
        </div>
      </section>
    </div>
  )
}
