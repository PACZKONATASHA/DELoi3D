import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Mayoristas from './pages/Mayoristas';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - var(--nav-h))' }}>
        {children}
      </div>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/producto/:slug" element={<ProductDetail />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/mayoristas" element={<Mayoristas />} />
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>404 — Página no encontrada</h2>
                <a href="/" style={{ color: 'var(--red)', fontWeight: 700 }}>Volver al inicio</a>
              </div>
            } />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}
