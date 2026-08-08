import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    try {
      const { db } = await import('../lib/firebase')
      const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore')

      const catsSnap = await getDocs(query(collection(db, 'categorias'), where('activa', '==', true), orderBy('orden')))
      const cats = catsSnap.docs.map(d => ({ id: d.id, ...d.data() }))

      const prodsSnap = await getDocs(query(collection(db, 'productos'), where('activo', '==', true), orderBy('orden')))
      const prods = prodsSnap.docs.map(d => ({ id: d.id, ...d.data() }))

      setCategorias(cats)
      setProductos(prods)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const filtrados = productos.filter(p => {
    const matchCat = categoriaActiva === 'Todas' || p.categoria === categoriaActiva
    const matchBus = p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
                     p.sku?.toLowerCase().includes(busqueda.toLowerCase())
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
          <aside className={styles.sidebar} aria-label="Filtros del catálogo">
            <div className={styles.searchBox}>
              <label htmlFor="buscar-producto" className="sr-only">Buscar producto</label>
              <input
                id="buscar-producto"
                type="search"
                placeholder="Buscar por nombre o SKU..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className={styles.search}
              />
            </div>
            <nav className={styles.categorias} aria-label="Categorías de productos">
              <h2 className={styles.catTitle}>Categorías</h2>
              <button
                onClick={() => setCategoriaActiva('Todas')}
                className={`${styles.catBtn} ${categoriaActiva === 'Todas' ? styles.catActive : ''}`}
                aria-pressed={categoriaActiva === 'Todas'}
              >
                Todas <span aria-label={`${productos.length} productos`}>{productos.length}</span>
              </button>
              {categorias.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCategoriaActiva(c.nombre)}
                  className={`${styles.catBtn} ${categoriaActiva === c.nombre ? styles.catActive : ''}`}
                  aria-pressed={categoriaActiva === c.nombre}
                >
                  {c.nombre}
                  <span aria-label={`${productos.filter(p => p.categoria === c.nombre).length} productos`}>
                    {productos.filter(p => p.categoria === c.nombre).length}
                  </span>
                </button>
              ))}
            </nav>
          </aside>
          <div className={styles.main}>
            {loading ? (
              <div className={styles.empty} role="status" aria-live="polite">
                <span aria-hidden="true">⏳</span>
                <p>Cargando productos...</p>
              </div>
            ) : (
              <>
                <p className={styles.resultados} role="status" aria-live="polite">
                  {filtrados.length} producto{filtrados.length !== 1 ? 's' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}
                </p>
                <div className={styles.grid}>
                  {filtrados.map(p => (
                    <article key={p.id} className={styles.card}>
                      <div className={styles.imgPlaceholder} aria-hidden="true">
                        {p.imagenUrl
                          ? <img src={p.imagenUrl} alt={p.nombre} width="280" height="160" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                          : <span>📦</span>
                        }
                      </div>
                      <div className={styles.info}>
                        <span className={styles.cat}>{p.categoria}</span>
                        <h3 className={styles.nombre}>{p.nombre}</h3>
                        <p className={styles.desc}>{p.descripcion}</p>
                        <p className={styles.sku}>SKU: {p.sku}</p>
                        <Link to="/contacto" className={styles.btn} aria-label={`Cotizar ${p.nombre}`}>Cotizar →</Link>
                      </div>
                    </article>
                  ))}
                </div>
                {filtrados.length === 0 && (
                  <div className={styles.empty}>
                    <span aria-hidden="true">🔍</span>
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
