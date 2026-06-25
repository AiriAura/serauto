import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const nav = [
  { label: 'Inicio',    path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Repuestos', path: '/repuestos' },
  { label: 'Nosotros',  path: '/nosotros' },
  { label: 'Contacto',  path: '/contacto' },
]

const servicios = ['Sistemas Eléctricos','Aire Acondicionado','Diagnóstico Electrónico','Partidores y Alternadores','Sistemas de Carga','Mantención Preventiva']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>Ser<span>Auto</span> <small>LTDA</small></Link>
          <p className={styles.tagline}>Soluciones eléctricas y de climatización para maquinaria automotriz y minera.</p>
          <div className={styles.social}>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="https://wa.me/56231234567" aria-label="WhatsApp">wa</a>
          </div>
        </div>
        <div className={styles.col}>
          <h4>Navegación</h4>
          <ul>{nav.map(l => <li key={l.path}><Link to={l.path}>{l.label}</Link></li>)}</ul>
        </div>
        <div className={styles.col}>
          <h4>Servicios</h4>
          <ul>{servicios.map(s => <li key={s}><span>{s}</span></li>)}</ul>
        </div>
        <div className={styles.col}>
          <h4>Contacto</h4>
          <ul className={styles.contact}>
            <li>📍 Av. Segunda Transversal 2600, Maipú, Santiago</li>
            <li>📞 +56 2 3123 4567</li>
            <li>✉️ contacto@serauto.cl</li>
            <li>🕐 Lun–Vie: 09:00–18:00 / Sáb: 09:00–13:00</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2026 Serauto LTDA. Todos los derechos reservados.</p>
        <p>Desarrollo web por <a href="#">Geraldine Garcés</a></p>
      </div>
    </footer>
  )
}
