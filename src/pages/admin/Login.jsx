import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import styles from './Login.module.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Correo o contraseña incorrectos')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>Ser<span>Auto</span> <small>LTDA</small></div>
        <h1 className={styles.title}>Panel de Administración</h1>
        <p className={styles.sub}>Acceso restringido al personal autorizado</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.field}>
            <label htmlFor="le">Correo electrónico</label>
            <input id="le" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="admin@serauto.cl" autoComplete="email" />
          </div>
          <div className={styles.field}>
            <label htmlFor="lp">Contraseña</label>
            <input id="lp" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" autoComplete="current-password" />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar →'}</button>
        </form>
        <a href="/" className={styles.back}>← Volver al sitio</a>
      </div>
    </div>
  )
}
