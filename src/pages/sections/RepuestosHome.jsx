import { Link } from 'react-router-dom'
import styles from './RepuestosHome.module.css'

const repuestos = [
  { nombre: 'Alternador 24V 80A', categoria: 'Alternadores', sku: 'ALT-24V-80A', desc: 'Para camiones y maquinaria pesada.' },
  { nombre: 'Partidor 24V 7.5KW', categoria: 'Partidores', sku: 'PAR-24V-75KW', desc: 'Para camiones y maquinaria pesada.' },
  { nombre: 'Compresor A/C', categoria: 'Climatización', sku: 'COMP-A-C', desc: 'Compresor para sistema de aire acondicionado.' },
]

// Logos de marcas y proveedores
// Para agregar o quitar logos: edita este arreglo.
// Puedes usar imágenes propias en /public/marcas/ o URLs externas.
const marcas = [
  { nombre: 'Bosch',      logo: '/marcas/bosch.png' },
  { nombre: 'Denso',      logo: '/marcas/denso.png' },
  { nombre: 'Valeo',      logo: '/marcas/valeo.png' },
  { nombre: 'Delphi',     logo: '/marcas/delphi.png' },
  { nombre: 'NGK',        logo: '/marcas/ngk.png' },
  { nombre: 'Gates',      logo: '/marcas/gates.png' },
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
          {['Calidad garantizada', 'Despacho a todo Chile', 'Asesoría especializada', 'Cotiza en minutos'].map((g, i) => (
            <div key={i} className={styles.garantia}>
              <span className={styles.garantiaIcon}>✓</span>
              <span>{g}</span>
            </div>
          ))}
        </div>

        {/* Sección logos de marcas */}
        <div className={styles.marcasWrapper}>
          <p className={styles.marcasEyebrow}>Trabajamos con las mejores marcas</p>
          <div className={styles.marcasGrid}>
            {marcas.map((m, i) => (
              <div key={i} className={styles.marcaItem}>
                <img
                  src={m.logo}
                  alt={m.nombre}
                  className={styles.marcaImg}
                  onError={e => {
                    // Si la imagen no existe aún, muestra el nombre como texto
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <span className={styles.marcaFallback} style={{ display: 'none' }}>{m.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}