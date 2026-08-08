import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/images/logo.png'

const links = [
  { label: 'Inicio',    path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Repuestos', path: '/repuestos' },
  { label: 'Nosotros',  path: '/nosotros' },
  { label: 'Contacto',  path: '/contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Navegación principal">
        <Link to="/" className={styles.logo} aria-label="Serauto LTDA - Ir al inicio">
          <img
            src={logo}
            alt="Serauto LTDA - Electricidad Automotriz y Aire Acondicionado"
            className={styles.logoImg}
            width="180"
            height="64"
          />
        </Link>

        <ul className={styles.links} role="list">
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link to="/contacto" className={styles.cta}>Cotizar ahora →</Link>
          <button
            className={styles.hamburger}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span className={`${styles.bar} ${open ? styles.b1 : ''}`} />
            <span className={`${styles.bar} ${open ? styles.b2 : ''}`} />
            <span className={`${styles.bar} ${open ? styles.b3 : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}
        role="navigation"
        aria-label="Menú móvil"
      >
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`${styles.mobileLink} ${location.pathname === link.path ? styles.active : ''}`}
            aria-current={location.pathname === link.path ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contacto" className={styles.mobileCta}>Cotizar ahora →</Link>
      </div>
    </header>
  )
}
