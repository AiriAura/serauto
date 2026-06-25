import styles from './StatsBar.module.css'
const stats = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '2.500+', label: 'Equipos intervenidos' },
  { value: '120+', label: 'Clientes activos' },
  { value: '100%', label: 'Cobertura nacional' },
]
export default function StatsBar() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
