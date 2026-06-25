import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './ContactoHome.module.css'

export default function ContactoHome() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', empresa: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('cotizaciones')
      .insert([{
        nombre_cliente: form.nombre,
        email: form.email,
        telefono: form.telefono,
        empresa: form.empresa,
        mensaje: form.mensaje,
        tipo: 'contacto',
        estado: 'nueva'
      }])

    setLoading(false)
    if (error) { console.error(error); return }
    setSent(true)
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Hablemos de tu proyecto</p>
          <h2 className={styles.title}>¿Listo para optimizar tu operación?</h2>
          <p className={styles.desc}>Completa el formulario y nuestro equipo te contactará a la brevedad.</p>
          <div className={styles.datos}>
            <div className={styles.dato}><span>📞</span><div><strong>Teléfono</strong><p>+56 2 3123 4567</p></div></div>
            <div className={styles.dato}><span>💬</span><div><strong>WhatsApp</strong><p>+56 9 1234 5678</p></div></div>
            <div className={styles.dato}><span>✉️</span><div><strong>Email</strong><p>contacto@serauto.cl</p></div></div>
            <div className={styles.dato}><span>📍</span><div><strong>Dirección</strong><p>Av. Segunda Transversal 2600, Maipú, Santiago</p></div></div>
          </div>
        </div>
        <div className={styles.right}>
          {sent ? (
            <div className={styles.success}>
              <span>✓</span>
              <h3>¡Mensaje enviado!</h3>
              <p>Nos contactaremos contigo a la brevedad.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
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
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
