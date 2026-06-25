import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/images/logo.jpg'

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
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="SerAuto LTDA" className={styles.logoImg} />
        </Link>
        <ul className={styles.links}>
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link to="/contacto" className={styles.cta}>Cotizar ahora →</Link>
          <button className={styles.hamburger} onClick={() => setOpen(!open)} aria-label="Menú">
            <span className={`${styles.bar} ${open ? styles.b1 : ''}`} />
            <span className={`${styles.bar} ${open ? styles.b2 : ''}`} />
            <span className={`${styles.bar} ${open ? styles.b3 : ''}`} />
          </button>
        </div>
      </nav>
      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`${styles.mobileLink} ${location.pathname === link.path ? styles.active : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contacto" className={styles.mobileCta}>Cotizar ahora →</Link>
      </div>
    </header>
  )
}
