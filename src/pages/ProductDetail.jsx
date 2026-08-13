import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Ruler, Leaf, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { products } from '../data/products';
import { srcSetFor, IMG_SIZES } from '../utils/images';
import { productWhatsappLink } from '../utils/whatsapp';
import Model3DViewer from '../components/Model3DViewer';
import './ProductDetail.css';

// Función para convertir hex a HSL
const hexToHsl = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Calcular rotación de hue basada en color cobre base (#B87333)
const getHueRotation = (targetHex) => {
  const baseHue = 25; // Hue del cobre base en la imagen
  const targetHsl = hexToHsl(targetHex);
  return targetHsl.h - baseHue;
};

// Generar filtro CSS según el color
const getColorFilter = (colorHex) => {
  if (!colorHex) return {};
  
  // Colores especiales
  if (colorHex === '#1A1A1A') {
    // Negro: reducir brillo y saturación
    return { filter: 'brightness(0.3) saturate(0)' };
  }
  if (colorHex === '#F5F5F5') {
    // Blanco: aumentar brillo y reducir saturación
    return { filter: 'brightness(1.8) saturate(0.2)' };
  }
  
  // Otros colores: usar hue-rotate
  return { filter: `hue-rotate(${getHueRotation(colorHex)}deg) saturate(1.2)` };
};

export default function ProductDetail() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    setActiveImg(0);
    setSelectedColor(null);
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
                srcSet={srcSetFor(product.images[activeImg])}
                sizes={IMG_SIZES.detail}
                alt={product.name}
                className="pd-gallery__img"
                style={selectedColor ? {
                  filter: `hue-rotate(${getHueRotation(selectedColor.hex)}deg) saturate(1.2)`,
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
                    <img
                      src={img}
                      srcSet={srcSetFor(img)}
                      sizes={IMG_SIZES.thumb}
                      alt={`${product.name} vista ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="pd-info__tag">{t('impresion3D')}</span>
            <h1 className="pd-info__title">{product.name}</h1>

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

            {/* Consulta por WhatsApp: no hay carrito, el precio se pasa por chat */}
            <div className="pd-info__actions">
              <a
                href={productWhatsappLink(product, selectedColor)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary pd-info__add"
              >
                <MessageCircle size={18} />
                {t('consultarWhatsApp').toUpperCase()}
              </a>
            </div>

            {/* Specs */}
            <div className="pd-specs">
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

        {/* Visor 3D */}
        <section className="pd-3d-section">
          <h2 className="pd-3d-section__title">Visualizador 3D</h2>
          <p className="pd-3d-section__desc">
            Carga un archivo STL u OBJ para visualizar el modelo en 3D. Arrastra para rotar, usa el scroll para zoom.
          </p>
          <div className="pd-3d-viewer-container">
            <Model3DViewer title={product.name} url="/models/esfera-demo.stl" />
          </div>
        </section>

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
                    <img
                      src={p.images[0]}
                      srcSet={srcSetFor(p.images[0])}
                      sizes={IMG_SIZES.card}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pd-related-card__body">
                    <h4>{p.name}</h4>
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
