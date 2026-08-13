import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Ruler, Leaf, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { products } from '../data/products';
import { srcSetFor, IMG_SIZES } from '../utils/images';
import { productWhatsappLink } from '../utils/whatsapp';
import Viewer360 from '../components/Viewer360';
import './ProductDetail.css';

export default function ProductDetail() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  // Solo para los productos que todavia tienen una foto sola: ahi elegir un
  // color no cambia la foto, pero igual hay que recordarlo para el WhatsApp.
  // Se guarda junto al slug para que no se arrastre al cambiar de producto.
  const [elegido, setElegido] = useState({ slug, color: null });

  useEffect(() => {
    setActiveImg(0);
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

  // El color elegido manda la foto grande. Si en cambio movieron la foto por
  // otro lado (el lightbox), gana el color de la foto que se esta viendo, y la
  // foto grupal no marca ninguno.
  const currentImg = product.images[activeImg];
  const elegidoActual = elegido.slug === slug ? elegido.color : null;
  const colorDeLaFoto = product.colors?.find(c => c.image === currentImg) ?? null;
  const selectedColor =
    elegidoActual && (!elegidoActual.image || elegidoActual.image === currentImg)
      ? elegidoActual
      : colorDeLaFoto;

  const selectColor = (color) => {
    setElegido({ slug, color });
    const i = color.image ? product.images.indexOf(color.image) : -1;
    if (i !== -1) setActiveImg(i);
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
                src={currentImg}
                srcSet={srcSetFor(currentImg)}
                sizes={IMG_SIZES.detail}
                alt={selectedColor ? `${product.name} en ${selectedColor.name}` : product.name}
                className="pd-gallery__img"
              />
              <button
                className="pd-gallery__zoom"
                onClick={() => setLightbox(true)}
                aria-label="Zoom"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Debajo de la foto van los colores en lugar de las miniaturas:
                cada circulito trae la foto de la lampara en ese color. */}
            {product.colors?.length > 0 && (
              <div className="pd-gallery__colors">
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
                      type="button"
                      className={`pd-color-swatch${selectedColor?.name === c.name ? ' pd-color-swatch--active' : ''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => selectColor(c)}
                      aria-label={c.name}
                      aria-pressed={selectedColor?.name === c.name}
                    >
                      {/* Captura del material impreso en ese color: el hex de
                          fondo queda de respaldo mientras carga. */}
                      {c.swatch && <img src={c.swatch} alt="" loading="lazy" decoding="async" />}
                    </button>
                  ))}
                </div>
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

        {/* Vuelta de 360: fotos renderizadas, no el modelo 3D (ver Viewer360). */}
        {product.turntable && (
          <section className="pd-3d-section">
            <h2 className="pd-3d-section__title">{t('vista360')}</h2>
            <p className="pd-3d-section__desc">{t('vista360Desc')}</p>
            <div className="pd-3d-viewer-container">
              <Viewer360
                key={product.slug}
                base={product.turntable.base}
                cantidad={product.turntable.cantidad}
                ext={product.turntable.ext}
                alt={product.name}
              />
            </div>
          </section>
        )}

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
            src={currentImg}
            srcSet={srcSetFor(currentImg)}
            sizes="90vw"
            alt={selectedColor ? `${product.name} en ${selectedColor.name}` : product.name}
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
