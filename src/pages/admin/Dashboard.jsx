import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Admin.module.css'

const navItems = [
  { path: '/admin/dashboard',    label: 'Dashboard',    icon: '📊' },
  { path: '/admin/productos',    label: 'Productos',    icon: '📦' },
  { path: '/admin/categorias',   label: 'Categorías',   icon: '🗂️' },
  { path: '/admin/cotizaciones', label: 'Cotizaciones', icon: '📋' },
]

export function AdminLayout({ children, title }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { auth } = await import('../../lib/firebase')
    const { signOut } = await import('firebase/auth')
    await signOut(auth)
    navigate('/admin')
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>Ser<span>Auto</span></div>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
            >
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

export default function Dashboard() {
  const [stats, setStats] = useState({
    productosActivos: '—',
    cotizacionesNuevas: '—',
    cotizacionesMes: '—',
    categorias: '—',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [])

  async function fetchStats() {
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, getDocs, query, where } = await import('firebase/firestore')

      const [prodsSnap, cotSnap, catsSnap] = await Promise.all([
        getDocs(query(collection(db, 'productos'), where('activo', '==', true))),
        getDocs(collection(db, 'cotizaciones')),
        getDocs(collection(db, 'categorias')),
      ])

      const ahora = new Date()
      const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1)
      const cotizaciones = cotSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      const nuevas = cotizaciones.filter(c => c.estado === 'nueva').length
      const esMes = cotizaciones.filter(c => {
        const fecha = c.createdAt?.toDate?.()
        return fecha && fecha >= inicioMes
      }).length

      setStats({
        productosActivos: prodsSnap.size,
        cotizacionesNuevas: nuevas,
        cotizacionesMes: esMes,
        categorias: catsSnap.size,
      })
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const statCards = [
    { label: 'Productos activos',     value: stats.productosActivos,   icon: '📦', color: '#0057FF' },
    { label: 'Cotizaciones nuevas',   value: stats.cotizacionesNuevas, icon: '📋', color: '#00D47C' },
    { label: 'Cotizaciones este mes', value: stats.cotizacionesMes,    icon: '📈', color: '#FFD100' },
    { label: 'Categorías',            value: stats.categorias,         icon: '🗂️', color: '#A855F7' },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className={styles.statsGrid}>
        {statCards.map((s, i) => (
          <div key={i} className={styles.statCard} style={{ borderTopColor: s.color }}>
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statValue}>{loading ? '...' : s.value}</span>
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
            <p>Agregar, editar o eliminar repuestos del catálogo</p>
          </Link>
          <Link to="/admin/categorias" className={styles.quickCard}>
            <span>🗂️</span>
            <strong>Gestionar categorías</strong>
            <p>Organizar las categorías del catálogo</p>
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