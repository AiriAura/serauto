import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebaseAuth.js'
import { signOut } from 'firebase/auth'
import styles from './Admin.module.css'

const navItems = [
  { path: '/admin/dashboard',    label: 'Dashboard',    icon: '📊' },
  { path: '/admin/productos',    label: 'Productos',    icon: '📦' },
  { path: '/admin/cotizaciones', label: 'Cotizaciones', icon: '📋' },
]

export function AdminLayout({ children, title }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/admin')
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>Ser<span>Auto</span></div>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <Link to="/" className={styles.verSitio}>← Ver sitio</Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>Cerrar sesión</button>
      </aside>
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <h1 className={styles.pageTitle}>{title}</h1>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}

const stats = [
  { label: 'Productos activos',     value: '—', icon: '📦', color: '#0057FF' },
  { label: 'Cotizaciones nuevas',   value: '—', icon: '📋', color: '#00D47C' },
  { label: 'Cotizaciones este mes', value: '—', icon: '📈', color: '#FFD100' },
  { label: 'Categorías',            value: '—', icon: '🗂️',  color: '#A855F7' },
]

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statCard} style={{ borderTopColor: s.color }}>
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.quickLinks}>
        <h2>Acciones rápidas</h2>
        <div className={styles.quickGrid}>
          <Link to="/admin/productos" className={styles.quickCard}>
            <span>📦</span>
            <strong>Gestionar productos</strong>
            <p>Agregar, editar o desactivar repuestos del catálogo</p>
          </Link>
          <Link to="/admin/cotizaciones" className={styles.quickCard}>
            <span>📋</span>
            <strong>Ver cotizaciones</strong>
            <p>Revisar solicitudes recibidas de clientes</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
