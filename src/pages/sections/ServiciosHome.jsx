import { Link } from 'react-router-dom'
import styles from './ServiciosHome.module.css'

const servicios = [
  { icon: '⚡', title: 'Electricidad Automotriz', desc: 'Diagnóstico y reparación de sistemas eléctricos en vehículos livianos, camiones y maquinaria.' },
  { icon: '❄️', title: 'Aire Acondicionado', desc: 'Mantención, diagnóstico y reparación de sistemas de climatización con refrigerante R134a.' },
  { icon: '🏗️', title: 'Maquinaria y Minería', desc: 'Servicios especializados para flotas, transporte, minería y maquinaria pesada.' },
  { icon: '📋', title: 'Mantención Preventiva', desc: 'Mantenciones programadas para empresas y flotas, con informes técnicos y presupuestos.' },
  { icon: '🔧', title: 'Venta de Repuestos', desc: 'Repuestos eléctricos y de climatización con asesoría técnica especializada.' },
  { icon: '🖥️', title: 'Diagnóstico Computarizado', desc: 'Scanner FCAN para identificar fallas con precisión en vehículos y equipos compatibles.' },
]

export default function ServiciosHome() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Servicios</p>
          <h2 className={styles.title}>Soluciones integrales para tu operación</h2>
          <p className={styles.desc}>
            Trabajamos con vehículos livianos, camionetas, camiones, buses, maquinaria pesada
            y equipos de minería con los más altos estándares técnicos.
          </p>
          <Link to="/servicios" className={styles.link}>Ver todos los servicios →</Link>
        </div>
        <div className={styles.grid}>
          {servicios.map((s, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon}>{s.icon}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
