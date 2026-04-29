import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Truck, Sparkles, Users } from 'lucide-react';
import { products, categories } from '../data/products';
import HeroSlider from '../components/HeroSlider';
import './Home.css';

const CATEGORY_IMAGES = {
  'robert-plant': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
  'macetas': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
  'bazar': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
  'mates': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  'iluminacion': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80',
  'soportes': 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80',
  'juguetes': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'mascotas': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
  'llaveros': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
  'vasos': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
};

const FEATURES = [
  { icon: <Sparkles size={28} />, title: 'Calidad Premium', desc: 'Impresión 3D de alta resolución con materiales certificados.' },
  { icon: <Leaf size={28} />, title: 'Eco-Friendly PLA', desc: 'Filamento biodegradable, responsable con el medio ambiente.' },
  { icon: <Truck size={28} />, title: 'Envíos a todo el país', desc: 'Mandamos a cualquier punto de Argentina con seguimiento.' },
  { icon: <Users size={28} />, title: 'Venta x Mayor', desc: 'Precios especiales para comercios y revendedores.' },
];

export default function Home() {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const featured = products.filter(p => p.featured);
  const displayCategories = categories.filter(c => c.id !== 'todos');

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <main className="home">

      {/* ── Hero slider ── */}
      <HeroSlider />

      {/* ── Features ── */}
      <section className="features section">
        <div className="container">
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories carousel ── */}
      <section className="categories section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Explorá nuestras categorías</h2>
              <p className="section-sub">Encontrá el regalo perfecto según tus intereses.</p>
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => scrollCarousel(-1)} aria-label="Anterior">
                <ChevronLeft size={20} />
              </button>
              <button className="carousel-btn" onClick={() => scrollCarousel(1)} aria-label="Siguiente">
                <ChevronRight size={20} />
              </button>
              <Link to="/catalogo" className="ver-todas">Ver todas →</Link>
            </div>
          </div>

          <div className="carousel" ref={carouselRef}>
            {displayCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/catalogo?cat=${cat.slug}`}
                className="category-card"
              >
                <img
                  src={CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES['bazar']}
                  alt={cat.name}
                  className="category-card__img"
                />
                <div className="category-card__overlay">
                  <span className="category-card__name">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="featured section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Productos destacados</h2>
              <p className="section-sub">Nuestras piezas más elegidas por nuestros clientes.</p>
            </div>
            <Link to="/catalogo" className="ver-todas">Ver todos →</Link>
          </div>

          <div className="featured__grid">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>

          <div className="featured__cta">
            <Link to="/catalogo" className="btn btn-primary">
              Ver catálogo completo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Banner mayorista ── */}
      <section className="banner">
        <div className="container banner__inner">
          <div>
            <h2 className="banner__title">¿Querés vender nuestros productos?</h2>
            <p className="banner__sub">Tenemos precios especiales para revendedores y comercios.</p>
          </div>
          <a
            href="https://wa.me/5491100000000?text=Hola!+Me+interesa+información+sobre+venta+por+mayor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn banner__btn"
          >
            Consultanos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product, navigate }) {
  return (
    <div className="product-card card" onClick={() => navigate(`/producto/${product.slug}`)}>
      <div className="product-card__img-wrap">
        <img src={product.images[0]} alt={product.name} className="product-card__img" loading="lazy" />
        <span className="product-card__badge">Destacado</span>
        {!product.inStock && <span className="product-card__stock">Sin stock</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price price">${product.price.toLocaleString('es-AR')}</p>
        <div className="product-card__actions">
          <button
            className="btn btn-primary product-card__btn"
            onClick={(e) => { e.stopPropagation(); navigate(`/producto/${product.slug}`); }}
          >
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}
