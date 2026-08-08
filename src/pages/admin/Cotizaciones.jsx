import { useState, useEffect } from 'react'
import { AdminLayout } from './Dashboard'
import styles from './Admin.module.css'

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchCotizaciones() }, [])

  async function fetchCotizaciones() {
    setLoading(true)
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore')
      const snap = await getDocs(query(collection(db, 'cotizaciones'), orderBy('createdAt', 'desc')))
      setCotizaciones(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  async function marcarVista(id) {
    const { db } = await import('../../lib/firebase')
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db, 'cotizaciones', id), { estado: 'vista' })
    fetchCotizaciones()
  }

  const nuevas = cotizaciones.filter(c => c.estado === 'nueva').length

  return (
    <AdminLayout title="Cotizaciones">
      <div className={styles.toolbar}>
        <p role="status" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          {nuevas} cotización{nuevas !== 1 ? 'es' : ''} nueva{nuevas !== 1 ? 's' : ''}
        </p>
      </div>
      {loading ? (
        <p style={{color:'rgba(255,255,255,0.4)'}} role="status">Cargando...</p>
      ) : cotizaciones.length === 0 ? (
        <p style={{color:'rgba(255,255,255,0.4)'}}>No hay cotizaciones todavía.</p>
      ) : (
        cotizaciones.map(c => (
          <div key={c.id} className={styles.cotCard}>
            <div className={styles.cotInfo}>
              <strong>{c.nombreCliente}{c.empresa ? ` — ${c.empresa}` : ''}</strong>
              <span>{c.email} · {c.tipo} · {c.createdAt?.toDate?.().toLocaleDateString('es-CL') || '—'}</span>
              {c.mensaje && <span style={{display:'block',marginTop:4,color:'rgba(255,255,255,0.3)',fontSize:13}}>{c.mensaje}</span>}
            </div>
            <div className={styles.cotMeta}>
              <span className={c.estado === 'nueva' ? styles.badgeNueva : styles.badgeVista}>
                {c.estado === 'nueva' ? 'Nueva' : 'Vista'}
              </span>
              {c.estado === 'nueva' && (
                <button className={styles.verBtn} onClick={() => marcarVista(c.id)}>Marcar vista</button>
              )}
            </div>
          </div>
        ))
      )}
    </AdminLayout>
  )
}
