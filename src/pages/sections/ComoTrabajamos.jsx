import styles from './ComoTrabajamos.module.css'
const pasos = [
  { num: '01', title: 'Nos contactas', desc: 'Cuéntanos tu problema o requerimiento.' },
  { num: '02', title: 'Diagnóstico', desc: 'Evaluamos y diagnosticamos la falla o necesidad.' },
  { num: '03', title: 'Propuesta', desc: 'Entregamos solución y propuesta de trabajo.' },
  { num: '04', title: 'Ejecución', desc: 'Realizamos el trabajo con calidad y garantía.' },
  { num: '05', title: 'Entrega', desc: 'Te acompañamos en el post servicio.' },
]
export default function ComoTrabajamos() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Cómo trabajamos</p>
          <h2 className={styles.title}>Un proceso claro, eficiente y <span>transparente.</span></h2>
        </div>
        <div className={styles.pasos}>
          {pasos.map((p, i) => (
            <div key={i} className={styles.paso}>
              <span className={styles.num}>{p.num}</span>
              {i < pasos.length - 1 && <div className={styles.line} />}
              <h3 className={styles.pasoTitle}>{p.title}</h3>
              <p className={styles.pasoDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
