import { useState, useEffect } from 'react'
import { AdminLayout } from './Dashboard'
import { supabase } from '../../lib/supabase'
import styles from './Admin.module.css'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProductos() }, [])

  async function fetchProductos() {
    setLoading(true)
    const { data } = await supabase
      .from('productos')
      .select('*, categorias(nombre)')
      .order('created_at', { ascending: false })
    setProductos(data || [])
    setLoading(false)
  }

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.sku.toLowerCase().includes(busqueda.toLowerCase())
  )

  async function toggleActivo(id, activo) {
    await supabase.from('productos').update({ activo: !activo }).eq('id', id)
    fetchProductos()
  }

  return (
    <AdminLayout title="Productos">
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Buscar producto o SKU..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addBtn}>+ Agregar producto</button>
      </div>
      {loading ? (
        <p style={{color:'rgba(255,255,255,0.4)'}}>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.sku}</td>
                <td>{p.categorias?.nombre}</td>
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
