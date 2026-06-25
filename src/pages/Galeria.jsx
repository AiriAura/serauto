import styles from './Galeria.module.css'
const categorias = ['Todos','Electricidad','Aire Acondicionado','Diagnóstico','Minería']
const items = Array.from({ length: 12 }, (_, i) => ({ id: i+1, categoria: categorias[(i%4)+1], titulo: `Trabajo ${i+1}` }))
export default function Galeria() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Galería de trabajos</p>
          <h1 className={styles.heroTitle}>Nuestro trabajo habla por nosotros</h1>
          <p className={styles.heroDesc}>Fotos y videos de servicios realizados en vehículos, camiones y maquinaria.</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.filtros}>
            {categorias.map((c, i) => <button key={i} className={`${styles.filtro} ${i===0?styles.filtroActive:''}`}>{c}</button>)}
          </div>
          <div className={styles.grid}>
            {items.map(item => (
              <div key={item.id} className={styles.card}>
                <div className={styles.imgPlaceholder}><span>📷</span><p>{item.titulo}</p></div>
                <div className={styles.cardInfo}><span className={styles.cat}>{item.categoria}</span></div>
              </div>
            ))}
          </div>
          <p className={styles.nota}>Las fotos reales del taller serán cargadas próximamente.</p>
        </div>
      </section>
    </div>
  )
}
