import { Link } from 'react-router-dom'
import styles from './Nosotros.module.css'
const valores = [
  { icon: '🎯', title: 'Precisión', desc: 'Cada diagnóstico y reparación se ejecuta con máxima rigurosidad técnica.' },
  { icon: '🤝', title: 'Confianza', desc: 'Transparencia total en cada proceso. El cliente sabe qué se hace y por qué.' },
  { icon: '⚡', title: 'Rapidez', desc: 'Entendemos que tu operación no puede detenerse. Respondemos rápido.' },
  { icon: '🛡️', title: 'Garantía', desc: 'Todos nuestros trabajos cuentan con garantía de calidad y respaldo.' },
]
export default function Nosotros() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Quiénes somos</p>
          <h1 className={styles.heroTitle}>Más que un taller,<br />un aliado técnico.</h1>
          <p className={styles.heroDesc}>Somos un equipo especializado en electricidad automotriz y sistemas de climatización para vehículos, camiones y equipos de minería.</p>
        </div>
      </section>
      <section className={styles.historia}>
        <div className={styles.historiaInner}>
          <div className={styles.historiaTexto}>
            <p className={styles.eyebrowDark}>Nuestra historia</p>
            <h2 className={styles.historiaTitle}>Más de 15 años de experiencia en el rubro</h2>
            <p>Serauto nació con la convicción de que la industria automotriz y minera de Chile necesitaba un servicio técnico especializado, confiable y de alto estándar.</p>
            <p>A lo largo de los años hemos atendido flotas de transporte, maquinaria de minería y vehículos particulares en todo el país, consolidándonos como un referente en diagnóstico eléctrico y climatización vehicular.</p>
            <p>Hoy contamos con tecnología de diagnóstico de última generación y un equipo de técnicos altamente capacitados, listos para responder donde y cuando nos necesites.</p>
          </div>
          <div className={styles.historiaNums}>
            <div className={styles.historiaNum}><span>15+</span><p>Años en el rubro</p></div>
            <div className={styles.historiaNum}><span>2.500+</span><p>Equipos intervenidos</p></div>
            <div className={styles.historiaNum}><span>120+</span><p>Clientes activos</p></div>
            <div className={styles.historiaNum}><span>100%</span><p>Cobertura nacional</p></div>
          </div>
        </div>
      </section>
      <section className={styles.valores}>
        <div className={styles.valoresInner}>
          <div className={styles.valoresHeader}>
            <p className={styles.eyebrow}>Nuestros valores</p>
            <h2 className={styles.valoresTitle}>Lo que nos define</h2>
          </div>
          <div className={styles.valoresGrid}>
            {valores.map((v, i) => (
              <div key={i} className={styles.valorCard}>
                <span className={styles.valorIcon}>{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>¿Tienes un equipo que necesita atención?</h2>
          <p>Contáctanos y te responderemos a la brevedad.</p>
          <Link to="/contacto" className={styles.ctaBtn}>Cotizar ahora →</Link>
        </div>
      </section>
    </div>
  )
}
