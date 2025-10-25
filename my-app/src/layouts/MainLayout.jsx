import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '24px 0' }}>
        {/* Importante: NO envolver en .container.
           El Dashboard ya controla su propio layout a ancho completo */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
