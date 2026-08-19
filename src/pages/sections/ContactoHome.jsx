import { useState } from 'react'
import styles from './ContactoHome.module.css'

export default function ContactoHome() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', empresa: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { db } = await import('../../lib/firebase')
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      await addDoc(collection(db, 'cotizaciones'), {
        nombreCliente: form.nombre,
        email: form.email,
        telefono: form.telefono,
        empresa: form.empresa,
        mensaje: form.mensaje,
        tipo: 'contacto',
        estado: 'nueva',
        createdAt: serverTimestamp()
      })
      setSent(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Hablemos de tu proyecto</p>
          <h2 className={styles.title}>¿Listo para optimizar tu operación?</h2>
          <p className={styles.desc}>Completa el formulario y nuestro equipo te contactará a la brevedad.</p>
          <div className={styles.datos}>
            <div className={styles.dato}><span aria-hidden="true">📞</span><div><strong>Teléfonos</strong><p>+56 9 7774 7792<br/>+56 9 4596 9254<br/>+56 9 4282 9953</p></div></div>
            <div className={styles.dato}><span aria-hidden="true">✉️</span><div><strong>Email</strong><p>empresa@serauto.cl</p></div></div>
            <div className={styles.dato}><span aria-hidden="true">📍</span><div><strong>Dirección</strong><p>Av. Segunda Transversal 2600, Maipú, Santiago</p></div></div>
            <div className={styles.dato}>
              <span aria-hidden="true">🕐</span>
              <div>
                <strong>Horarios</strong>
                <p>Lun, Mar y Vie: 09:00–18:00<br/>Mié y Jue: 09:00–19:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {sent ? (
            <div className={styles.success} role="alert">
              <span aria-hidden="true">✓</span>
              <h3>¡Mensaje enviado!</h3>
              <p>Nos contactaremos contigo a la brevedad.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="ch-nombre">Nombre completo *</label>
                  <input id="ch-nombre" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" autoComplete="name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="ch-email">Correo electrónico *</label>
                  <input id="ch-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="correo@empresa.cl" autoComplete="email" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="ch-telefono">Teléfono</label>
                  <input id="ch-telefono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+56 9 ..." autoComplete="tel" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="ch-empresa">Empresa</label>
                  <input id="ch-empresa" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" autoComplete="organization" />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="ch-mensaje">Cuéntanos tu requerimiento *</label>
                <textarea id="ch-mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} required rows={4} placeholder="Describe el servicio o repuesto que necesitas..." />
              </div>
              <button type="submit" className={styles.btn} disabled={loading} aria-busy={loading}>
                {loading ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
