import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle, PenLine, Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { products, categories } from '../data/products';
import HeroSlider from '../components/HeroSlider';
import ReviewsCarousel from '../components/ReviewsCarousel';
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

const CUSTOM_STEPS = [
  {
    icon: <MessageCircle size={32} />,
    titleKey: 'contaTuIdea',
    descKey: 'contaTuIdeaDesc',
  },
  {
    icon: <PenLine size={32} />,
    titleKey: 'diseñamos3D',
    descKey: 'diseñamos3DDesc',
  },
  {
    icon: <Package size={32} />,
    titleKey: 'fabricamosEnviamos',
    descKey: 'fabricamosEnvíamosDesc',
  },
];

const OCCASIONS = [
  {
    key: 'pascua',
    label: 'Pascua',
    items: [
      { img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80', name: 'Porta Huevos 3D', price: 'desde $5.500', colors: ['#F5F5F5', '#F8BBD0', '#7EC8E3', '#F9A825'] },
      { img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80', name: 'Conejito Impreso 3D', price: 'desde $6.000', colors: ['#F5F5F5', '#F8BBD0', '#C8E6C9', '#FFF9C4'] },
      { img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', name: 'Figura Pascual 3D', price: 'desde $8.500', colors: ['#F5F5F5', '#8A9179', '#F8BBD0', '#7EC8E3'] },
      { img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80', name: 'Canasta Deco 3D', price: 'desde $7.000', colors: ['#F5F5F5', '#C8E6C9', '#F9A825', '#F8BBD0'] },
    ],
  },
  {
    key: 'navidad',
    label: 'Navidad',
    items: [
      { img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80', name: 'Adorno Navideño 3D', price: 'desde $3.500', colors: ['#F5F5F5', '#D32F2F', '#2E7D32', '#B87333'] },
      { img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80', name: 'Figura Navideña 3D', price: 'desde $8.000', colors: ['#1A1A1A', '#F5F5F5', '#D32F2F', '#B87333'] },
      { img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80', name: 'Estrella Impresa 3D', price: 'desde $5.000', colors: ['#B87333', '#F5F5F5', '#D32F2F', '#9E9E9E'] },
      { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', name: 'Muñeco de Nieve 3D', price: 'desde $7.500', colors: ['#F5F5F5', '#1A1A1A', '#D32F2F', '#2E7D32'] },
    ],
  },
  {
    key: 'san-valentin',
    label: 'San Valentín',
    items: [
      { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80', name: 'Corazón Personalizado 3D', price: 'desde $4.500', colors: ['#D32F2F', '#F5F5F5', '#E88EA8', '#1A1A1A'] },
      { img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', name: 'Mate del Amor 3D', price: 'desde $11.000', colors: ['#D32F2F', '#E88EA8', '#F5F5F5', '#1A1A1A'] },
      { img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80', name: 'Caja Romántica 3D', price: 'desde $6.500', colors: ['#E88EA8', '#D32F2F', '#F5F5F5', '#9575CD'] },
      { img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80', name: 'Figura Pareja 3D', price: 'desde $9.000', colors: ['#D32F2F', '#F5F5F5', '#E88EA8', '#B87333'] },
    ],
  },
  {
    key: 'cumpleanos',
    label: 'Cumpleaños',
    items: [
      { img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80', name: 'Figura Personalizada 3D', price: 'desde $7.000', colors: ['#7EC8E3', '#E88EA8', '#9575CD', '#F9A825'] },
      { img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', name: 'Souvenir con Nombre 3D', price: 'desde $3.000', colors: ['#F5F5F5', '#7EC8E3', '#E88EA8', '#9575CD'] },
      { img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', name: 'Topper para Torta 3D', price: 'desde $4.500', colors: ['#F5F5F5', '#B87333', '#E88EA8', '#7EC8E3'] },
      { img: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&q=80', name: 'Llavero Recordatorio 3D', price: 'desde $2.500', colors: ['#7EC8E3', '#E88EA8', '#F5F5F5', '#9575CD'] },
    ],
  },
];

export default function Home() {
  const { t } = useLanguage();
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [activeOccasion, setActiveOccasion] = useState('pascua');
  const featured = products.filter(p => p.featured);
  const displayCategories = categories.filter(c => c.id !== 'todos');

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  const currentOccasion = OCCASIONS.find(o => o.key === activeOccasion);

  return (
    <main className="home">

      {/* ── Hero slider ── */}
      <HeroSlider />

      {/* ── Custom orders ── */}
      <section className="custom-orders section">
        <div className="container">
          <div className="custom-orders__intro">
            <h2 className="section-title">{t('diseñoPersonalizado')}</h2>
            <p className="section-sub">
              {t('diseñoPersonalizadoSub')}
            </p>
          </div>
          <div className="custom-steps">
            {CUSTOM_STEPS.map((step, i) => (
              <div key={i} className="custom-step">
                <span className="custom-step__number">{i + 1}</span>
                <div className="custom-step__content">
                  <div className="custom-step__icon">{step.icon}</div>
                  <div className="custom-step__text">
                    <h3 className="custom-step__title">{t(step.titleKey)}</h3>
                    <p className="custom-step__desc">{t(step.descKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="custom-orders__cta">
            <a
              href="https://wa.me/5491100000000?text=Hola!+Quiero+consultar+por+un+producto+personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t('presupuesto')} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Categories carousel ── */}
      <section className="categories section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">{t('categorias')}</h2>
              <p className="section-sub">{t('categoriasDesc')}</p>
            </div>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => scrollCarousel(-1)} aria-label={t('anterior')}>
                <ChevronLeft size={20} />
              </button>
              <button className="carousel-btn" onClick={() => scrollCarousel(1)} aria-label={t('siguiente')}>
                <ChevronRight size={20} />
              </button>
              <Link to="/catalogo" className="ver-todas">{t('verTodas')}</Link>
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
              <h2 className="section-title">{t('destacados')}</h2>
              <p className="section-sub">{t('destacadosDesc')}</p>
            </div>
            <Link to="/catalogo" className="ver-todas">{t('verTodos')}</Link>
          </div>

          <div className="featured__grid">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} t={t} />
            ))}
          </div>

          <div className="featured__cta">
            <Link to="/catalogo" className="btn btn-primary">
              {t('verCatalogo')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Occasions (interactive) ── */}
      <section className="occasions section">
        <div className="container">
          <div className="occasions__header">
            <h2 className="section-title">{t('ocasiones')}</h2>
            <p className="section-sub">
              {t('ocasionesDesc')}
            </p>
          </div>

          <div className="occasions__tabs">
            {OCCASIONS.map(o => (
              <button
                key={o.key}
                className={`occ-tab${activeOccasion === o.key ? ' occ-tab--active' : ''}`}
                onClick={() => setActiveOccasion(o.key)}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="occasions__grid" key={activeOccasion}>
            {currentOccasion?.items.map((item, i) => (
              <div key={i} className="occ-card">
                <div className="occ-card__img-wrap">
                  <img src={item.img} alt={item.name} className="occ-card__img" loading="lazy" />
                </div>
                <div className="occ-card__body">
                  <h3 className="occ-card__name">{item.name}</h3>
                  <div className="occ-card__colors">
                    {item.colors.map((hex, j) => (
                      <span
                        key={j}
                        className="occ-card__color"
                        style={{ background: hex }}
                      />
                    ))}
                    <span className="occ-card__colors-more">+ {t('colores')}</span>
                  </div>
                  <p className="occ-card__price">{item.price}</p>
                  <a
                    href={`https://wa.me/5491100000000?text=Hola!+Me+interesa+el+producto:+${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline occ-card__btn"
                  >
                    {t('consultar')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Carousel ── */}
      <ReviewsCarousel />

      {/* ── Banner mayorista ── */}
      <section className="banner">
        <div className="container banner__inner">
          <div>
            <h2 className="banner__title">{t('venderProductos')}</h2>
            <p className="banner__sub">{t('ventasPorMayor')}</p>
          </div>
          <a
            href="https://wa.me/5491100000000?text=Hola!+Me+interesa+información+sobre+venta+por+mayor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn banner__btn"
          >
            {t('consultaWhatsApp')}
          </a>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product, navigate, t }) {
  return (
    <div className="product-card card" onClick={() => navigate(`/producto/${product.slug}`)}>
      <div className="product-card__img-wrap">
        <img src={product.images[0]} alt={product.name} className="product-card__img" loading="lazy" />
        <span className="product-card__badge">{t('destacado')}</span>
        {!product.inStock && <span className="product-card__stock">{t('sinStock')}</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        {product.colors && (
          <div className="product-card__colors">
            {product.colors.slice(0, 5).map((c, i) => (
              <span key={i} className="product-card__color" style={{ background: c.hex }} title={c.name} />
            ))}
          </div>
        )}
        <p className="product-card__price price">${product.price.toLocaleString('es-AR')}</p>
        <div className="product-card__actions">
          <button
            className="btn btn-primary product-card__btn"
            onClick={(e) => { e.stopPropagation(); navigate(`/producto/${product.slug}`); }}
          >
            {t('ver')}
          </button>
        </div>
      </div>
    </div>
  );
}
