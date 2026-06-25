import { Link } from 'react-router-dom'
import styles from './ServiciosHome.module.css'

const servicios = [
  { icon: '⚡', title: 'Sistemas Eléctricos', desc: 'Diagnóstico y reparación de sistemas eléctricos en maquinaria y camiones.' },
  { icon: '❄️', title: 'Aire Acondicionado', desc: 'Mantención, reparación y recarga de sistemas de climatización vehicular.' },
  { icon: '🔬', title: 'Diagnóstico Electrónico', desc: 'Escaneo avanzado, diagnóstico y programación de módulos.' },
  { icon: '🔧', title: 'Partidores y Alternadores', desc: 'Reparación y reconstrucción de motores de partida y alternadores.' },
  { icon: '🔋', title: 'Sistemas de Carga', desc: 'Revisión y reparación de sistemas de carga y baterías.' },
  { icon: '📋', title: 'Mantención Preventiva', desc: 'Planes de mantención preventiva para reducir fallas y tiempos de paro.' },
]

export default function ServiciosHome() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Servicios</p>
          <h2 className={styles.title}>Soluciones integrales para tu operación</h2>
          <p className={styles.desc}>Trabajamos con los más altos estándares de calidad, seguridad y respaldo.</p>
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
