import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebaseAuth'
import styles from './Login.module.css'

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      )

      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      console.error('Error de inicio de sesión:', err)
      setError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          Ser<span>Auto</span> <small>LTDA</small>
        </div>

        <h1 className={styles.title}>
          Panel de Administración
        </h1>

        <p className={styles.sub}>
          Acceso restringido al personal autorizado
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          {error && (
            <div
              className={styles.error}
              role="alert"
            >
              {error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="login-email">
              Correo electrónico
            </label>

            <input
              id="login-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@serauto.cl"
              autoComplete="email"
              inputMode="email"
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="login-password">
              Contraseña
            </label>

            <input
              id="login-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar →'}
          </button>
        </form>

        <Link
          to="/"
          className={styles.back}
        >
          ← Volver al sitio
        </Link>
      </div>
    </div>
  )
}