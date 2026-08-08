import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'

// Rutas públicas secundarias
const Servicios = lazy(() => import('./pages/Servicios'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Galeria = lazy(() => import('./pages/Galeria'))
const Catalogo = lazy(() => import('./pages/Catalogo'))
const Contacto = lazy(() => import('./pages/Contacto'))

// Rutas admin: Firebase solo debería entrar al bundle cuando se visiten
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Productos = lazy(() => import('./pages/admin/Productos'))
const Cotizaciones = lazy(() => import('./pages/admin/Cotizaciones'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      <main style={{ paddingTop: 'var(--navbar-height)' }}>
        {children}
      </main>

      <Footer />
    </>
  )
}

function Loading() {
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />

          <Route
            path="/servicios"
            element={
              <PublicLayout>
                <Servicios />
              </PublicLayout>
            }
          />

          <Route
            path="/nosotros"
            element={
              <PublicLayout>
                <Nosotros />
              </PublicLayout>
            }
          />

          <Route
            path="/galeria"
            element={
              <PublicLayout>
                <Galeria />
              </PublicLayout>
            }
          />

          <Route
            path="/repuestos"
            element={
              <PublicLayout>
                <Catalogo />
              </PublicLayout>
            }
          />

          <Route
            path="/contacto"
            element={
              <PublicLayout>
                <Contacto />
              </PublicLayout>
            }
          />

          <Route path="/admin" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute>
                <Productos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/cotizaciones"
            element={
              <ProtectedRoute>
                <Cotizaciones />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}