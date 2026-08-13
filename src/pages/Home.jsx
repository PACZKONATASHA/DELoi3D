import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle, PenLine, Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { products, categories, lightingGroups } from '../data/products';
import { srcSetFor, IMG_SIZES } from '../utils/images';
import { whatsappLink, productWhatsappLink } from '../utils/whatsapp';
import HeroSlider from '../components/HeroSlider';
import ReviewsCarousel from '../components/ReviewsCarousel';
import LocationMap from '../components/LocationMap';
import './Home.css';

const CATEGORY_IMAGES = {
  'porta-difusores': '/porta-difusores/nilo.webp',
  'bandejas': '/porta-difusores/bandeja-oval.webp',
  'tierra': '/lamparas/tierra-1-480.jpg',
  'mar': '/lamparas/mar-1-480.jpg',
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

// Cada ocasion sugiere piezas reales del catalogo (por slug), no productos de muestra.
const OCCASIONS = [
  {
    key: 'pascua',
    label: 'Pascua',
    slugs: ['bandeja-oval-porta-difusores', 'porta-difusor-nilo', 'bandeja-rectangular-porta-difusores'],
  },
  {
    key: 'navidad',
    label: 'Navidad',
    slugs: ['lampara-tierra', 'lampara-mar', 'porta-difusor-nilo-y-cairo'],
  },
  {
    key: 'san-valentin',
    label: 'San Valentín',
    slugs: ['lampara-mar', 'porta-difusor-nilo', 'bandeja-oval-porta-difusores'],
  },
  {
    key: 'cumpleanos',
    label: 'Cumpleaños',
    slugs: ['lampara-tierra', 'porta-difusor-nilo-y-cairo', 'bandeja-rectangular-porta-difusores'],
  },
];

const productBySlug = (slug) => products.find(p => p.slug === slug);

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
              href={whatsappLink('Hola! Quiero consultar por un producto personalizado.')}
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
                  src={CATEGORY_IMAGES[cat.id]}
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

      {/* ── Promociones Vigentes ── */}
      <section className="promo-banner">
        <div className="container promo-banner__inner">
          <div className="promo-banner__text">
            <span className="promo-banner__tag">Promociones vigentes</span>
            <p className="promo-banner__desc">Aprovechá nuestros descuentos por tiempo limitado.</p>
          </div>
          <a
            href={whatsappLink('Hola! Quiero consultar por las promociones vigentes.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn promo-banner__btn"
          >
            Consultar por WhatsApp <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── Featured products: linea de iluminacion, agrupada ── */}
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
                  <ProductCard key={p.id} product={p} navigate={navigate} t={t} />
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
                href={whatsappLink('Hola! Quiero consultar sobre envíos de mis productos.')}
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
            {currentOccasion?.slugs.map(productBySlug).filter(Boolean).map(item => (
              <div key={item.id} className="occ-card">
                <div className="occ-card__img-wrap">
                  <img
                    src={item.images[0]}
                    srcSet={srcSetFor(item.images[0])}
                    sizes={IMG_SIZES.card}
                    alt={item.name}
                    className="occ-card__img"
                    loading="lazy"
                  />
                </div>
                <div className="occ-card__body">
                  <h3 className="occ-card__name">{item.name}</h3>
                  <div className="occ-card__colors">
                    {item.colors.map((c, j) => (
                      <span
                        key={j}
                        className="occ-card__color"
                        style={{ background: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="occ-card__colors-more">+ {t('colores')}</span>
                  </div>
                  <a
                    href={productWhatsappLink(item)}
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
            href={whatsappLink('Hola! Me interesa información sobre venta por mayor.')}
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
