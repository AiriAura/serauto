import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import styles from './Catalogo.module.css'

export default function Catalogo() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    const { data: cats } = await supabase.from('categorias').select('*').eq('activa', true).order('orden')
    const { data: prods } = await supabase.from('productos').select('*, categorias(nombre)').eq('activo', true).order('orden')
    setCategorias(cats || [])
    setProductos(prods || [])
    setLoading(false)
  }

  const filtrados = productos.filter(p => {
    const matchCat = categoriaActiva === 'Todas' || p.categorias?.nombre === categoriaActiva
    const matchBus = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.sku.toLowerCase().includes(busqueda.toLowerCase())
    return matchCat && matchBus
  })

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Catálogo de repuestos</p>
          <h1 className={styles.heroTitle}>Repuestos originales y alternativos</h1>
          <p className={styles.heroDesc}>Stock actualizado. Compatibilidad garantizada. Despacho a todo Chile.</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.inner}>
          <aside className={styles.sidebar}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Buscar por nombre o SKU..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className={styles.search} />
            </div>
            <div className={styles.categorias}>
              <h3>Categorías</h3>
              <button onClick={() => setCategoriaActiva('Todas')} className={`${styles.catBtn} ${categoriaActiva === 'Todas' ? styles.catActive : ''}`}>
                Todas <span>{productos.length}</span>
              </button>
              {categorias.map(c => (
                <button key={c.id} onClick={() => setCategoriaActiva(c.nombre)} className={`${styles.catBtn} ${categoriaActiva === c.nombre ? styles.catActive : ''}`}>
                  {c.nombre} <span>{productos.filter(p => p.categorias?.nombre === c.nombre).length}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className={styles.main}>
            {loading ? (
              <div className={styles.empty}><span>⏳</span><p>Cargando productos...</p></div>
            ) : (
              <>
                <p className={styles.resultados}>{filtrados.length} producto{filtrados.length !== 1 ? 's' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}</p>
                <div className={styles.grid}>
                  {filtrados.map(p => (
                    <div key={p.id} className={styles.card}>
                      <div className={styles.imgPlaceholder}>
                        {p.imagen_url ? <img src={p.imagen_url} alt={p.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <span>📦</span>}
                      </div>
                      <div className={styles.info}>
                        <span className={styles.cat}>{p.categorias?.nombre}</span>
                        <h3 className={styles.nombre}>{p.nombre}</h3>
                        <p className={styles.desc}>{p.descripcion}</p>
                        <p className={styles.sku}>SKU: {p.sku}</p>
                        <Link to="/contacto" className={styles.btn}>Cotizar →</Link>
                      </div>
                    </div>
                  ))}
                </div>
                {filtrados.length === 0 && (
                  <div className={styles.empty}>
                    <span>🔍</span>
                    <p>No se encontraron productos.</p>
                    <Link to="/contacto" className={styles.emptyBtn}>Consultar disponibilidad →</Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
