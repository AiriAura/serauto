import { useState, useEffect } from 'react'
import { AdminLayout } from './Dashboard'
import styles from './Admin.module.css'

const EMPTY_CAT = { nombre: '', slug: '', icono: '', orden: 0, activa: true }

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(EMPTY_CAT)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => { fetchCategorias() }, [])

  async function fetchCategorias() {
    setLoading(true)
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore')
      const snap = await getDocs(query(collection(db, 'categorias'), orderBy('orden')))
      setCategorias(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  function abrirNuevo() { setEditando(null); setForm(EMPTY_CAT); setModal(true) }

  function abrirEditar(c) {
    setEditando(c.id)
    setForm({ nombre: c.nombre || '', slug: c.slug || '', icono: c.icono || '', orden: c.orden ?? 0, activa: c.activa ?? true })
    setModal(true)
  }

  function cerrarModal() { setModal(false); setEditando(null); setForm(EMPTY_CAT) }

  function generarSlug(nombre) {
    return nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  async function guardar() {
    if (!form.nombre) return alert('El nombre es obligatorio')
    setSaving(true)
    const slug = form.slug || generarSlug(form.nombre)
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, doc, addDoc, updateDoc } = await import('firebase/firestore')
      if (editando) {
        await updateDoc(doc(db, 'categorias', editando), { ...form, slug })
      } else {
        await addDoc(collection(db, 'categorias'), { ...form, slug })
      }
      cerrarModal()
      fetchCategorias()
    } catch (err) { console.error(err) }
    setSaving(false)
  }

  async function eliminar(id) {
    const { db } = await import('../../lib/firebase')
    const { doc, deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, 'categorias', id))
    setConfirmDelete(null)
    fetchCategorias()
  }

  return (
    <AdminLayout title="Categorías">
      {confirmDelete && (
        <div className={styles.overlay}>
          <div className={styles.confirmBox}>
            <h3>¿Eliminar categoría?</h3>
            <p>Los productos de esta categoría no se eliminarán, pero quedarán sin categoría asignada.</p>
            <div className={styles.confirmActions}>
              <button className={styles.cancelBtn} onClick={() => setConfirmDelete(null)}>Cancelar</button>
              <button className={styles.deleteBtn} onClick={() => eliminar(confirmDelete)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className={styles.overlay}>
          <div className={styles.modalBox}>
            <h3 className={styles.modalTitle}>{editando ? 'Editar categoría' : 'Agregar categoría'}</h3>
            <div className={styles.modalForm}>
              <div className={styles.modalRow}>
                <div className={styles.modalField}>
                  <label>Nombre *</label>
                  <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value, slug: generarSlug(e.target.value)})} placeholder="Ej: Alternadores" />
                </div>
                <div className={styles.modalField}>
                  <label>Ícono (emoji)</label>
                  <input value={form.icono} onChange={e => setForm({...form, icono: e.target.value})} placeholder="Ej: ⚡" />
                </div>
              </div>
              <div className={styles.modalRow}>
                <div className={styles.modalField}>
                  <label>Slug (URL)</label>
                  <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="Ej: alternadores" />
                </div>
                <div className={styles.modalField}>
                  <label>Orden</label>
                  <input type="number" value={form.orden} onChange={e => setForm({...form, orden: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div className={styles.modalChecks}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={form.activa} onChange={e => setForm({...form, activa: e.target.checked})} />
                  Activa (visible en el catálogo)
                </label>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={cerrarModal}>Cancelar</button>
              <button className={styles.saveBtn} onClick={guardar} disabled={saving}>{saving ? 'Guardando...' : editando ? 'Guardar cambios' : 'Agregar categoría'}</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.toolbar}>
        <span style={{color:'rgba(255,255,255,0.4)',fontSize:14}}>{categorias.length} categoría{categorias.length !== 1 ? 's' : ''}</span>
        <button className={styles.addBtn} onClick={abrirNuevo}>+ Agregar categoría</button>
      </div>

      {loading ? (
        <p style={{color:'rgba(255,255,255,0.4)'}} role="status">Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Ícono</th>
              <th scope="col">Nombre</th>
              <th scope="col">Slug</th>
              <th scope="col">Orden</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id}>
                <td style={{fontSize:24}}>{c.icono}</td>
                <td>{c.nombre}</td>
                <td style={{color:'rgba(255,255,255,0.4)',fontSize:13}}>{c.slug}</td>
                <td>{c.orden}</td>
                <td><span className={c.activa ? styles.badgeActive : styles.badgeInactive}>{c.activa ? 'Activa' : 'Inactiva'}</span></td>
                <td>
                  <button className={styles.actionBtn} onClick={() => abrirEditar(c)}>Editar</button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={() => setConfirmDelete(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  )
}
