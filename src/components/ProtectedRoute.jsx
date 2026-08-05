import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0A0A0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontFamily: 'Inter, sans-serif'
      }}>
        Verificando acceso...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return children
}
