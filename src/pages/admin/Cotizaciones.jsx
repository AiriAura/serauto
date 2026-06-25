import { useState, useEffect } from 'react'
import { AdminLayout } from './Dashboard'
import { supabase } from '../../lib/supabase'
import styles from './Admin.module.css'

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchCotizaciones() }, [])

  async function fetchCotizaciones() {
    setLoading(true)
    const { data } = await supabase
      .from('cotizaciones')
      .select('*')
      .order('created_at', { ascending: false })
    setCotizaciones(data || [])
    setLoading(false)
  }

  async function marcarVista(id) {
    await supabase.from('cotizaciones').update({ estado: 'vista' }).eq('id', id)
    fetchCotizaciones()
  }

  const nuevas = cotizaciones.filter(c => c.estado === 'nueva').length

  return (
    <AdminLayout title="Cotizaciones">
      <div className={styles.toolbar}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          {nuevas} cotización{nuevas !== 1 ? 'es' : ''} nueva{nuevas !== 1 ? 's' : ''}
        </span>
      </div>
      {loading ? (
        <p style={{color:'rgba(255,255,255,0.4)'}}>Cargando...</p>
      ) : cotizaciones.length === 0 ? (
        <p style={{color:'rgba(255,255,255,0.4)'}}>No hay cotizaciones todavía.</p>
      ) : (
        cotizaciones.map(c => (
          <div key={c.id} className={styles.cotCard}>
            <div className={styles.cotInfo}>
              <strong>{c.nombre_cliente} {c.empresa ? `— ${c.empresa}` : ''}</strong>
              <span>{c.email} · {c.tipo} · {new Date(c.created_at).toLocaleDateString('es-CL')}</span>
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
