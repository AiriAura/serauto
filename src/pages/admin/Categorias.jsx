import { useState, useEffect } from 'react'
import { AdminLayout } from './Dashboard'
import styles from './Admin.module.css'

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandida, setExpandida] = useState(null)

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

  function formatFecha(ts) {
    const d = ts?.toDate?.()
    if (!d) return '—'
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <AdminLayout title="Cotizaciones">
      <div className={styles.toolbar}>
        <p role="status" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          {nuevas} cotización{nuevas !== 1 ? 'es' : ''} nueva{nuevas !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }} role="status">Cargando...</p>
      ) : cotizaciones.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No hay cotizaciones todavía.</p>
      ) : (
        cotizaciones.map(c => {
          const abierta = expandida === c.id
          return (
            <div
              key={c.id}
              className={styles.cotCard}
              style={{ cursor: 'pointer', flexDirection: 'column', gap: 12 }}
              onClick={() => setExpandida(abierta ? null : c.id)}
            >
              {/* Fila superior — resumen */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div className={styles.cotInfo}>
                  <strong style={{ fontSize: 15 }}>
                    {c.nombreCliente || c.nombre || '(sin nombre)'}
                    {c.empresa ? ` — ${c.empresa}` : ''}
                  </strong>
                  <span style={{ marginTop: 2 }}>
                    {c.email || '—'}
                    {c.telefono ? ` · 📞 ${c.telefono}` : ''}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 }}>
                    {c.tipo ? `Tipo: ${c.tipo}` : ''}{c.tipo && c.createdAt ? ' · ' : ''}{formatFecha(c.createdAt)}
                  </span>
                </div>
                <div className={styles.cotMeta} style={{ flexShrink: 0 }}>
                  <span className={c.estado === 'nueva' ? styles.badgeNueva : styles.badgeVista}>
                    {c.estado === 'nueva' ? 'Nueva' : 'Vista'}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>
                    {abierta ? '▲ cerrar' : '▼ ver detalle'}
                  </span>
                </div>
              </div>

              {/* Detalle expandido */}
              {abierta && (
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  width: '100%'
                }}>
                  {/* Datos de contacto */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
                    <div className={styles.detalleCampo}>
                      <span className={styles.detalleLabel}>Nombre</span>
                      <span>{c.nombreCliente || c.nombre || '—'}</span>
                    </div>
                    <div className={styles.detalleCampo}>
                      <span className={styles.detalleLabel}>Empresa</span>
                      <span>{c.empresa || '—'}</span>
                    </div>
                    <div className={styles.detalleCampo}>
                      <span className={styles.detalleLabel}>Teléfono</span>
                      <span>
                        {c.telefono
                          ? <a href={`tel:${c.telefono}`} style={{ color: '#0057FF' }}>{c.telefono}</a>
                          : '—'}
                      </span>
                    </div>
                    <div className={styles.detalleCampo}>
                      <span className={styles.detalleLabel}>Email</span>
                      <span>
                        {c.email
                          ? <a href={`mailto:${c.email}`} style={{ color: '#0057FF' }}>{c.email}</a>
                          : '—'}
                      </span>
                    </div>
                    <div className={styles.detalleCampo}>
                      <span className={styles.detalleLabel}>Tipo</span>
                      <span>{c.tipo || '—'}</span>
                    </div>
                    <div className={styles.detalleCampo}>
                      <span className={styles.detalleLabel}>Fecha</span>
                      <span>{formatFecha(c.createdAt)}</span>
                    </div>
                  </div>

                  {/* Mensaje completo */}
                  {c.mensaje && (
                    <div className={styles.detalleCampo} style={{ marginTop: 4 }}>
                      <span className={styles.detalleLabel}>Mensaje</span>
                      <p style={{
                        margin: 0,
                        color: 'rgba(255,255,255,0.75)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap'
                      }}>{c.mensaje}</p>
                    </div>
                  )}

                  {/* Acciones */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    {c.telefono && (
                      <a
                        href={`https://wa.me/${c.telefono.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.verBtn}
                        style={{ background: '#25D366', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        onClick={e => e.stopPropagation()}
                      >
                        WhatsApp
                      </a>
                    )}
                    {c.email && (
                      <a
                        href={`mailto:${c.email}`}
                        className={styles.verBtn}
                        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        onClick={e => e.stopPropagation()}
                      >
                        Responder email
                      </a>
                    )}
                    {c.estado === 'nueva' && (
                      <button
                        className={styles.verBtn}
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                        onClick={e => { e.stopPropagation(); marcarVista(c.id) }}
                      >
                        Marcar vista
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })
      )}
    </AdminLayout>
  )
}