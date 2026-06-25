import { useState } from 'react'
import { supabase } from '../lib/supabase'
import styles from './Contacto.module.css'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', empresa: '', tipo: '', mensaje: '' })
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
        tipo: form.tipo || 'contacto',
        estado: 'nueva'
      }])

    setLoading(false)
    if (error) { console.error(error); return }
    setSent(true)
  }

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Contacto</p>
          <h1 className={styles.heroTitle}>Hablemos de tu operación</h1>
          <p className={styles.heroDesc}>Completa el formulario y te contactamos a la brevedad.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.formWrap}>
            {sent ? (
              <div className={styles.success}>
                <span>✓</span>
                <h3>¡Mensaje enviado!</h3>
                <p>Nos contactaremos contigo pronto.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Envíanos tu consulta</h2>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="nombre">Nombre completo *</label>
                    <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" autoComplete="name" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Correo electrónico *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="correo@empresa.cl" autoComplete="email" />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="telefono">Teléfono / WhatsApp</label>
                    <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+56 9 ..." autoComplete="tel" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="empresa">Empresa</label>
                    <input id="empresa" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" autoComplete="organization" />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="tipo">Tipo de consulta</label>
                  <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="">Selecciona una opción</option>
                    <option value="servicio">Cotizar un servicio</option>
                    <option value="repuesto">Cotizar un repuesto</option>
                    <option value="otro">Otra consulta</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="mensaje">Cuéntanos tu requerimiento *</label>
                  <textarea id="mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} required rows={5} placeholder="Describe el servicio o repuesto que necesitas..." />
                </div>
                <button type="submit" className={styles.btn} disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar mensaje →'}
                </button>
              </form>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3>Información de contacto</h3>
              <div className={styles.datos}>
                <div className={styles.dato}><span>📍</span><div><strong>Dirección</strong><p>Av. Segunda Transversal 2600, Maipú, Santiago</p></div></div>
                <div className={styles.dato}><span>📞</span><div><strong>Teléfono</strong><p>+56 2 3123 4567</p></div></div>
                <div className={styles.dato}><span>💬</span><div><strong>WhatsApp</strong><p>+56 9 1234 5678</p></div></div>
                <div className={styles.dato}><span>✉️</span><div><strong>Email</strong><p>contacto@serauto.cl</p></div></div>
                <div className={styles.dato}><span>🕐</span><div><strong>Horarios</strong><p>Lun–Vie: 09:00–18:00<br/>Sáb: 09:00–13:00</p></div></div>
              </div>
            </div>
            <div className={styles.mapPlaceholder}>
              <span>🗺️</span>
              <p>Av. Segunda Transversal 2600, Maipú</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
