import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logo from '../../assets/images/logo.png'

const nav = [
  { label: 'Inicio',    path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Repuestos', path: '/repuestos' },
  { label: 'Nosotros',  path: '/nosotros' },
  { label: 'Contacto',  path: '/contacto' },
]

const servicios = [
  'Electricidad Automotriz',
  'Aire Acondicionado',
  'Maquinaria y Minería',
  'Mantención Preventiva',
  'Venta de Repuestos',
  'Diagnóstico Computarizado',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" aria-label="Serauto LTDA - Ir al inicio">
            <img src={logo} alt="Serauto LTDA" className={styles.logoImg} width="180" height="55" />
          </Link>
          <p className={styles.tagline}>
            Soluciones eléctricas y de climatización para maquinaria automotriz y minera.
            En terreno o en taller, donde nos necesites.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="https://wa.me/56977747792" aria-label="WhatsApp">wa</a>
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
            <li>📞 +56 9 7774 7792</li>
            <li>📞 +56 9 4596 9254</li>
            <li>📞 +56 9 4282 9953</li>
            <li>✉️ empresa@serauto.cl</li>
            <li>🕐 Lun, Mar y Vie: 09:00–18:00<br/>Mié y Jue: 09:00–19:00</li>
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
