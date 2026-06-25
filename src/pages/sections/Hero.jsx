import { Link } from 'react-router-dom'
import styles from './Hero.module.css'
import heroBg from '../../assets/images/hero-bg.jpg'

const stats = [
  { value: '15+',    label: 'Años de experiencia' },
  { value: '2.500+', label: 'Equipos intervenidos' },
  { value: '120+',   label: 'Clientes activos' },
  { value: '100%',   label: 'Cobertura nacional' },
]

export default function Hero() {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Expertos en electricidad automotriz y maquinaria</p>
        <h1 className={styles.title}>
          Mantenemos lo que<br />
          mueve tu <span className={styles.accent}>operación.</span>
        </h1>
        <p className={styles.subtitle}>
          Soluciones eléctricas y de climatización para maquinaria automotriz y minera.
          En terreno o en taller, donde nos necesites.
        </p>
        <div className={styles.buttons}>
          <Link to="/contacto" className={styles.btnPrimary}>Cotizar ahora →</Link>
          <Link to="/servicios" className={styles.btnSecondary}>Ver servicios</Link>
        </div>
        <div className={styles.stats}>
          {stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
