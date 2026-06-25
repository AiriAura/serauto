import { Link } from 'react-router-dom'
import styles from './RepuestosHome.module.css'

const repuestos = [
  { nombre: 'Alternador 24V 80A', categoria: 'Alternadores', sku: 'ALT-24V-80A', desc: 'Para camiones y maquinaria pesada.' },
  { nombre: 'Partidor 24V 7.5KW', categoria: 'Partidores', sku: 'PAR-24V-75KW', desc: 'Para camiones y maquinaria pesada.' },
  { nombre: 'Compresor A/C', categoria: 'Climatización', sku: 'COMP-A-C', desc: 'Compresor para sistema de aire acondicionado.' },
]

export default function RepuestosHome() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Repuestos originales y alternativos</p>
            <h2 className={styles.title}>Encuentra lo que necesitas, rápido.</h2>
          </div>
          <Link to="/repuestos" className={styles.verTodo}>Ver catálogo completo →</Link>
        </div>
        <div className={styles.grid}>
          {repuestos.map((r, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imgPlaceholder}><span>📦</span></div>
              <div className={styles.info}>
                <span className={styles.categoria}>{r.categoria}</span>
                <h3 className={styles.nombre}>{r.nombre}</h3>
                <p className={styles.desc}>{r.desc}</p>
                <p className={styles.sku}>SKU: {r.sku}</p>
                <Link to="/contacto" className={styles.cotizar}>Cotizar →</Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.garantias}>
          {['Calidad garantizada','Despacho a todo Chile','Asesoría especializada','Cotiza en minutos'].map((g, i) => (
            <div key={i} className={styles.garantia}>
              <span className={styles.garantiaIcon}>✓</span>
              <span>{g}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
