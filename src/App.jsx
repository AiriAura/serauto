import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home        from './pages/Home'
import Servicios   from './pages/Servicios'
import Nosotros    from './pages/Nosotros'
import Galeria     from './pages/Galeria'
import Catalogo    from './pages/Catalogo'
import Contacto    from './pages/Contacto'
import Login        from './pages/admin/Login'
import Dashboard    from './pages/admin/Dashboard'
import Productos    from './pages/admin/Productos'
import Cotizaciones from './pages/admin/Cotizaciones'
import ProtectedRoute from './components/ProtectedRoute'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--navbar-height)' }}>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/servicios" element={<PublicLayout><Servicios /></PublicLayout>} />
        <Route path="/nosotros"  element={<PublicLayout><Nosotros /></PublicLayout>} />
        <Route path="/galeria"   element={<PublicLayout><Galeria /></PublicLayout>} />
        <Route path="/repuestos" element={<PublicLayout><Catalogo /></PublicLayout>} />
        <Route path="/contacto"  element={<PublicLayout><Contacto /></PublicLayout>} />
        <Route path="/admin"              element={<Login />} />
        <Route path="/admin/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/productos"    element={<ProtectedRoute><Productos /></ProtectedRoute>} />
        <Route path="/admin/cotizaciones" element={<ProtectedRoute><Cotizaciones /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
