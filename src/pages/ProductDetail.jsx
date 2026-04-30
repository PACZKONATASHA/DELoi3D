import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart, Clock, Ruler, Leaf, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

// Función para convertir hex a hue rotation
const hexToHue = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return h * 360;
};

export default function ProductDetail() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find(p => p.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    setActiveImg(0);
    setQty(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    return (
      <div className="not-found container">
        <h2>{t('error404')}</h2>
        <Link to="/catalogo" className="btn btn-primary">{t('volverAlInicio')}</Link>
      </div>
    );
  }

  const prevImg = () => setActiveImg(i => (i === 0 ? product.images.length - 1 : i - 1));
  const nextImg = () => setActiveImg(i => (i === product.images.length - 1 ? 0 : i + 1));

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pd-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/">{t('inicio')}</Link>
          <span>/</span>
          <Link to="/catalogo">{t('catalogo')}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="pd-layout">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="pd-gallery__img"
                style={selectedColor ? {
                  filter: `hue-rotate(${hexToHue(selectedColor.hex) - hexToHue('#F5F5F5')}deg) saturate(1.3)`,
                } : {}}
              />
              {product.images.length > 1 && (
                <>
                  <button className="pd-gallery__arrow pd-gallery__arrow--left" onClick={prevImg}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className="pd-gallery__arrow pd-gallery__arrow--right" onClick={nextImg}>
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              <button
                className="pd-gallery__zoom"
                onClick={() => setLightbox(true)}
                aria-label="Zoom"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {product.images.length > 1 && (
              <div className="pd-gallery__thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`pd-gallery__thumb${activeImg === i ? ' pd-gallery__thumb--active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`${product.name} vista ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="pd-info__tag">{t('impresion3D')}</span>
            <h1 className="pd-info__title">{product.name}</h1>
            <p className="pd-info__price price">${product.price.toLocaleString('es-AR')}
              <span className="pd-info__unit"> / {t('unidad')}</span>
            </p>

            <div className="pd-info__desc">
              <p>{product.description}</p>
            </div>

            {/* Color selector */}
            {product.colors?.length > 0 && (
              <div className="pd-colors">
                <p className="pd-colors__label">
                  {t('color')}:{' '}
                  <span className="pd-colors__selected">
                    {selectedColor ? selectedColor.name : t('elegirColor')}
                  </span>
                </p>
                <div className="pd-colors__swatches">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      className={`pd-color-swatch${selectedColor?.name === c.name ? ' pd-color-swatch--active' : ''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => setSelectedColor(c)}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="pd-info__actions">
              <div className="pd-qty">
                <button
                  className="pd-qty__btn"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                >−</button>
                <span className="pd-qty__val">{qty}</span>
                <button
                  className="pd-qty__btn"
                  onClick={() => setQty(q => q + 1)}
                >+</button>
              </div>

              <button
                className={`btn btn-primary pd-info__add${added ? ' pd-info__add--added' : ''}`}
                onClick={handleAdd}
                disabled={!product.inStock}
              >
                <ShoppingCart size={18} />
                {!product.inStock ? t('sinStock') : added ? t('agregado') : t('agregarAlCarrito').toUpperCase()}
              </button>
            </div>

            {/* Legal */}
            <p className="pd-info__legal">
              {t('alComprar')} {' '}
              <Link to="/terminos" className="pd-info__legal-link">{t('terminos')}</Link>
              . {t('productosAPedido')}
            </p>

            {/* Specs */}
            <div className="pd-specs">
              <div className="pd-spec">
                <Clock size={22} className="pd-spec__icon" />
                <span className="pd-spec__val">{product.days} {product.days !== 1 ? t('diasHabiles') : t('diaHabil')}</span>
              </div>
              <div className="pd-spec">
                <Ruler size={22} className="pd-spec__icon" />
                <span className="pd-spec__val">{product.size}</span>
              </div>
              <div className="pd-spec">
                <Leaf size={22} className="pd-spec__icon" />
                <span className="pd-spec__val">{product.material}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="pd-related">
            <h2 className="pd-related__title">{t('productosRelacionados')}</h2>
            <div className="pd-related__grid">
              {related.map(p => (
                <div
                  key={p.id}
                  className="pd-related-card card"
                  onClick={() => navigate(`/producto/${p.slug}`)}
                >
                  <div className="pd-related-card__img-wrap">
                    <img src={p.images[0]} alt={p.name} loading="lazy" />
                  </div>
                  <div className="pd-related-card__body">
                    <h4>{p.name}</h4>
                    <p className="price">${p.price.toLocaleString('es-AR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button className="lightbox__close" onClick={() => setLightbox(false)}>×</button>
          <img
            src={product.images[activeImg]}
            alt={product.name}
            className="lightbox__img"
            onClick={e => e.stopPropagation()}
          />
          {product.images.length > 1 && (
            <>
              <button className="lightbox__arrow lightbox__arrow--left" onClick={e => { e.stopPropagation(); prevImg(); }}>
                <ChevronLeft size={28} />
              </button>
              <button className="lightbox__arrow lightbox__arrow--right" onClick={e => { e.stopPropagation(); nextImg(); }}>
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
