import { useState, useEffect } from 'react'
import { AdminLayout } from './Dashboard'
import styles from './Admin.module.css'

const EMPTY_PRODUCT = { nombre: '', descripcion: '', sku: '', categoria: '', imagenUrl: '', activo: true, destacado: false, orden: 0 }

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore')
      const [prodsSnap, catsSnap] = await Promise.all([
        getDocs(query(collection(db, 'productos'), orderBy('nombre'))),
        getDocs(query(collection(db, 'categorias'), orderBy('orden')))
      ])
      setProductos(prodsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setCategorias(catsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  function abrirNuevo() {
    setEditando(null)
    setForm(EMPTY_PRODUCT)
    setModal(true)
  }

  function abrirEditar(p) {
    setEditando(p.id)
    setForm({ nombre: p.nombre || '', descripcion: p.descripcion || '', sku: p.sku || '', categoria: p.categoria || '', imagenUrl: p.imagenUrl || '', activo: p.activo ?? true, destacado: p.destacado ?? false, orden: p.orden ?? 0 })
    setModal(true)
  }

  function cerrarModal() { setModal(false); setEditando(null); setForm(EMPTY_PRODUCT) }

  async function guardar() {
    if (!form.nombre || !form.sku) return alert('Nombre y SKU son obligatorios')
    setSaving(true)
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, doc, addDoc, updateDoc, serverTimestamp } = await import('firebase/firestore')
      if (editando) {
        await updateDoc(doc(db, 'productos', editando), { ...form, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'productos'), { ...form, createdAt: serverTimestamp() })
      }
      cerrarModal()
      fetchData()
    } catch (err) { console.error(err) }
    setSaving(false)
  }

  async function toggleActivo(id, activo) {
    const { db } = await import('../../lib/firebase')
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db, 'productos', id), { activo: !activo })
    fetchData()
  }

  async function eliminar(id) {
    const { db } = await import('../../lib/firebase')
    const { doc, deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, 'productos', id))
    setConfirmDelete(null)
    fetchData()
  }

  const filtrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.sku?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <AdminLayout title="Productos">
      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className={styles.overlay}>
          <div className={styles.confirmBox}>
            <h3>¿Eliminar producto?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className={styles.confirmActions}>
              <button className={styles.cancelBtn} onClick={() => setConfirmDelete(null)}>Cancelar</button>
              <button className={styles.deleteBtn} onClick={() => eliminar(confirmDelete)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal agregar/editar */}
      {modal && (
        <div className={styles.overlay}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>{editando ? 'Editar producto' : 'Agregar producto'}</h3>
            <div className={styles.modalForm}>
              <div className={styles.modalRow}>
                <div className={styles.modalField}>
                  <label>Nombre *</label>
                  <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Ej: Alternador 24V 80A" />
                </div>
                <div className={styles.modalField}>
                  <label>SKU *</label>
                  <input value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} placeholder="Ej: ALT-24V-80A" />
                </div>
              </div>
              <div className={styles.modalField}>
                <label>Descripción</label>
                <textarea rows={3} value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} placeholder="Descripción breve del producto" />
              </div>
              <div className={styles.modalRow}>
                <div className={styles.modalField}>
                  <label>Categoría</label>
                  <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})}>
                    <option value="">Seleccionar categoría</option>
                    {categorias.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                  </select>
                </div>
                <div className={styles.modalField}>
                  <label>Orden</label>
                  <input type="number" value={form.orden} onChange={e => setForm({...form, orden: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div className={styles.modalField}>
                <label>URL de imagen</label>
                <input value={form.imagenUrl} onChange={e => setForm({...form, imagenUrl: e.target.value})} placeholder="https://..." />
              </div>
              <div className={styles.modalChecks}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.activo} onChange={e => setForm({...form, activo: e.target.checked})} />
                  Activo (visible en el catálogo)
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.destacado} onChange={e => setForm({...form, destacado: e.target.checked})} />
                  Destacado (aparece en el Home)
                </label>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={cerrarModal}>Cancelar</button>
              <button className={styles.saveBtn} onClick={guardar} disabled={saving}>{saving ? 'Guardando...' : editando ? 'Guardar cambios' : 'Agregar producto'}</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.toolbar}>
        <input type="search" placeholder="Buscar producto o SKU..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className={styles.searchInput} aria-label="Buscar producto" />
        <button className={styles.addBtn} onClick={abrirNuevo}>+ Agregar producto</button>
      </div>

      {loading ? (
        <p style={{color:'rgba(255,255,255,0.4)'}} role="status">Cargando...</p>
      ) : productos.length === 0 ? (
        <p style={{color:'rgba(255,255,255,0.4)'}}>No hay productos. Agrega el primero.</p>
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
                <td><span className={p.activo ? styles.badgeActive : styles.badgeInactive}>{p.activo ? 'Activo' : 'Inactivo'}</span></td>
                <td>
                  <button className={styles.actionBtn} onClick={() => abrirEditar(p)}>Editar</button>
                  <button className={styles.actionBtn} onClick={() => toggleActivo(p.id, p.activo)}>{p.activo ? 'Desactivar' : 'Activar'}</button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={() => setConfirmDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}
