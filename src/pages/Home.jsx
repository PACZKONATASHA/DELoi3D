import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { products, categories, lightingGroups } from '../data/products';
import { srcSetFor, IMG_SIZES } from '../utils/images';
import { whatsappLink } from '../utils/whatsapp';
import HeroSlider from '../components/HeroSlider';
import ReviewsCarousel from '../components/ReviewsCarousel';
import LocationMap from '../components/LocationMap';
import './Home.css';

// Foto de portada de cada categoria del carrusel del home.
const CATEGORY_IMAGES = {
  // Iluminacion
  'aire': '/iluminacion/aire/aire-rosa.jpg',
  'mar': '/iluminacion/mar/mar-azul.jpg',
  'tierra': '/iluminacion/tierra/tierra-marron.jpg',
  // Decoracion
  'bandejas': '/decoracion/bandejas/bandeja-oval.webp',
  'floreros': '/decoracion/floreros/florero-terracota.png',
  'porta-difusores': '/decoracion/porta-difusores/cobre.webp',
  // Jardineria
  'macetas': '/jardineria/macetas/maceta-redonda.png',
  'tutores': '/jardineria/tutores/tutor-floral.webp',
};

const CATEGORY_IMAGE_FALLBACK = '/iluminacion/mar/mar-azul.jpg';

const CUSTOM_STEPS = [
  {
    titleKey: 'contaTuIdea',
    descKey: 'contaTuIdeaDesc',
  },
  {
    titleKey: 'diseñamos3D',
    descKey: 'diseñamos3DDesc',
  },
  {
    titleKey: 'fabricamosEnviamos',
    descKey: 'fabricamosEnvíamosDesc',
  },
];

const OCCASIONS = [
  {
    key: 'pascua',
    label: 'Pascua',
    items: [
      { img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80', name: 'Porta Huevos 3D', colors: ['#F5F5F5', '#F8BBD0', '#7EC8E3', '#F9A825'] },
      { img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80', name: 'Conejito Impreso 3D', colors: ['#F5F5F5', '#F8BBD0', '#C8E6C9', '#FFF9C4'] },
      { img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', name: 'Figura Pascual 3D', colors: ['#F5F5F5', '#8A9179', '#F8BBD0', '#7EC8E3'] },
      { img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80', name: 'Canasta Deco 3D', colors: ['#F5F5F5', '#C8E6C9', '#F9A825', '#F8BBD0'] },
    ],
  },
  {
    key: 'navidad',
    label: 'Navidad',
    items: [
      { img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80', name: 'Adorno Navideño 3D', colors: ['#F5F5F5', '#D32F2F', '#2E7D32', '#B87333'] },
      { img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80', name: 'Figura Navideña 3D', colors: ['#1A1A1A', '#F5F5F5', '#D32F2F', '#B87333'] },
      { img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80', name: 'Estrella Impresa 3D', colors: ['#B87333', '#F5F5F5', '#D32F2F', '#9E9E9E'] },
      { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', name: 'Muñeco de Nieve 3D', colors: ['#F5F5F5', '#1A1A1A', '#D32F2F', '#2E7D32'] },
    ],
  },
];

export default function Home() {
  const { t } = useLanguage();
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [activeOccasion, setActiveOccasion] = useState('pascua');
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
                <div className="custom-step__text">
                  <h3 className="custom-step__title">{t(step.titleKey)}</h3>
                  <p className="custom-step__desc">{t(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="custom-orders__cta">
            <a
              href="https://wa.me/541161307110?text=Hola!+Quiero+consultar+por+un+producto+personalizado"
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
            {displayCategories.map(cat => {
              const foto = CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGE_FALLBACK;

              return (
                <Link
                  key={cat.id}
                  to={`/catalogo?cat=${cat.slug}`}
                  className="category-card"
                >
                  {/* Copia borrosa de la misma foto: rellena lo que le sobra a
                      la card para que no queden franjas de fondo liso. */}
                  <img
                    src={foto}
                    alt=""
                    aria-hidden="true"
                    className="category-card__bg"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={foto}
                    srcSet={srcSetFor(foto)}
                    sizes={IMG_SIZES.category}
                    alt={cat.name}
                    className="category-card__img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="category-card__overlay">
                    <span className="category-card__name">{cat.name}</span>
                  </div>
                </Link>
              );
            })}
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

          {lightingGroups.map(group => (
            <div key={group.id} className="light-group">
              <div className="light-group__header">
                <span className="light-group__name">{group.name}</span>
                <p className="light-group__tagline">{group.tagline}</p>
                <Link to={`/catalogo?cat=${group.id}`} className="light-group__link">
                  {t('verTodos')}
                </Link>
              </div>
              <div className="light-group__grid">
                {products.filter(p => p.category === group.id).map(p => (
                  <FeaturedCard key={p.id} product={p} navigate={navigate} t={t} />
                ))}
              </div>
            </div>
          ))}

          <div className="featured__cta">
            <Link to="/catalogo" className="btn btn-primary">
              {t('verCatalogo')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shipping Info ── */}
      <section className="shipping-info section">
        <div className="container">
          <h2 className="section-title">{t('envios')}</h2>
          <div className="shipping-cards">
            <div className="shipping-card">
              <div className="shipping-card__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="shipping-card__title">{t('ambaYCaba')}</h3>
              <p className="shipping-card__desc">{t('sinCosto')}</p>
            </div>
            <div className="shipping-card">
              <div className="shipping-card__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><polyline points="9 11 12 14 15 11"/>
                </svg>
              </div>
              <h3 className="shipping-card__title">{t('interior')}</h3>
              <p className="shipping-card__desc">Andreani / {t('conCosto')}</p>
            </div>
            <div className="shipping-card">
              <div className="shipping-card__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="shipping-card__title">{t('contacto')}</h3>
              <a 
                href="https://wa.me/541161307110?text=Hola!+Quiero+consultar+sobre+envíos+de+mis+productos"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  background: 'var(--white)',
                  color: 'var(--granate)',
                  border: '1.5px solid var(--white)',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}
              >
                WhatsApp
              </a>
            </div>
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
                  <img
                    src={item.img}
                    srcSet={srcSetFor(item.img)}
                    sizes={IMG_SIZES.card}
                    alt={item.name}
                    className="occ-card__img"
                    loading="lazy"
                    decoding="async"
                  />
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
                  <a
                    href={whatsappLink(`Hola! Me interesa el producto: ${item.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline occ-card__btn"
                  >
                    {t('consultarWhatsApp')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Carousel ── */}
      <ReviewsCarousel />

      {/* ── Location Map ── */}
      <LocationMap />

      {/* ── Banner mayorista ── */}
      <section className="banner">
        <div className="container banner__inner">
          <div>
            <h2 className="banner__title">{t('venderProductos')}</h2>
            <p className="banner__sub">{t('ventasPorMayor')}</p>
          </div>
          <a
            href="https://wa.me/541161307110?text=Hola!+Me+interesa+información+sobre+venta+por+mayor"
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

// Card grande de los destacados: la foto manda y ocupa todo el ancho del grupo.
function FeaturedCard({ product, navigate, t }) {
  return (
    <article className="feat-card" onClick={() => navigate(`/producto/${product.slug}`)}>
      <div className="feat-card__media">
        {/* Una sola lampara, no la foto grupal: el marco es cuadrado como la foto. */}
        <img
          src={product.images[0]}
          srcSet={srcSetFor(product.images[0])}
          sizes={IMG_SIZES.showcase}
          alt={product.name}
          className="feat-card__img"
          decoding="async"
        />
        {!product.inStock && <span className="feat-card__stock">{t('sinStock')}</span>}
      </div>
      <div className="feat-card__body">
        <div className="feat-card__info">
          <h3 className="feat-card__name">{product.name}</h3>
          <p className="feat-card__desc">{product.description}</p>
          {product.colors && (
            <div className="feat-card__colors">
              {product.colors.slice(0, 5).map((c, i) => (
                <span key={i} className="feat-card__color" style={{ background: c.hex }} title={c.name}>
                  {/* Los mismos circulos con la captura del material que en la
                      ficha del producto; el hex queda de respaldo si no hay. */}
                  {c.swatch && <img src={c.swatch} alt="" loading="lazy" decoding="async" />}
                </span>
              ))}
            </div>
          )}
          <p className="feat-card__specs">{product.size} · {product.material}</p>
        </div>
        <button
          className="btn btn-primary feat-card__btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/producto/${product.slug}`); }}
        >
          {t('ver')}
        </button>
      </div>
    </article>
  );
}

function ProductCard({ product, navigate, t }) {
  return (
    <div className="product-card card" onClick={() => navigate(`/producto/${product.slug}`)}>
      <div className="product-card__img-wrap">
        <img
          src={product.images[0]}
          srcSet={srcSetFor(product.images[0])}
          sizes={IMG_SIZES.card}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
        />
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
