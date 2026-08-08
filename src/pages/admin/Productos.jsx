import { useState, useEffect } from 'react'
import { AdminLayout } from './Dashboard'
import styles from './Admin.module.css'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProductos() }, [])

  async function fetchProductos() {
    setLoading(true)
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore')
      const snap = await getDocs(query(collection(db, 'productos'), orderBy('nombre')))
      setProductos(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  async function toggleActivo(id, activo) {
    const { db } = await import('../../lib/firebase')
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db, 'productos', id), { activo: !activo })
    fetchProductos()
  }

  const filtrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.sku?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <AdminLayout title="Productos">
      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Buscar producto o SKU..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className={styles.searchInput}
          aria-label="Buscar producto"
        />
        <button className={styles.addBtn}>+ Agregar producto</button>
      </div>
      {loading ? (
        <p style={{color:'rgba(255,255,255,0.4)'}} role="status">Cargando...</p>
      ) : productos.length === 0 ? (
        <p style={{color:'rgba(255,255,255,0.4)'}}>No hay productos cargados aún.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">SKU</th>
              <th scope="col">Categoría</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.sku}</td>
                <td>{p.categoria}</td>
                <td>
                  <span className={p.activo ? styles.badgeActive : styles.badgeInactive}>
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>Editar</button>
                  <button className={styles.actionBtn} onClick={() => toggleActivo(p.id, p.activo)}>
                    {p.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}
