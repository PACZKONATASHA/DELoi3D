import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Eye, ChevronDown, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { products, categoryGroups } from '../data/products';
import { srcSetFor, IMG_SIZES } from '../utils/images';
import './Catalog.css';

const SORT_OPTIONS_KEYS = [
  { value: 'relevance', labelKey: 'masPopular' },
  { value: 'name-az', labelKey: 'nombreAZ' },
];

// En el catalogo cada color con foto propia va como tarjeta aparte, para ver
// todas las variantes juntas en la grilla. El selector de color vive en la
// ficha del producto, no aca. Los productos que todavia tienen una sola foto
// van con una tarjeta sola: no tiene sentido repetir la misma imagen.
function colorVariants(product) {
  const conFoto = (product.colors ?? []).filter(c => c.image);
  if (conFoto.length === 0) {
    return [{ key: `${product.id}`, product, color: null, image: product.images[0] }];
  }
  return conFoto.map(c => ({
    key: `${product.id}-${c.name}`,
    product,
    color: c,
    image: c.image,
  }));
}

export default function Catalog() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('relevance');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({ iluminacion: true, decoracion: true, jardineria: true });
  const navigate = useNavigate();

  const activeCat = searchParams.get('cat') || 'todos';
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCat]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCat !== 'todos') {
      list = list.filter(p => p.category === activeCat);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'name-az': return list.sort((a, b) => a.name.localeCompare(b.name));
      default: return list;
    }
  }, [activeCat, sortBy, searchQuery]);

  // Una tarjeta por color: los colores del mismo producto quedan juntos.
  const items = useMemo(() => filtered.flatMap(colorVariants), [filtered]);

  const setCat = (slug) => {
    const params = new URLSearchParams(searchParams);
    params.set('cat', slug);
    params.delete('q');
    setSearchParams(params);
  };

  const toggleGroup = (groupId) => {
    setOpenGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  return (
    <div className="catalog-page">
      {/* Hero banner */}
      <div className="catalog-hero">
        <div className="container">
          <h1 className="catalog-hero__title">{t('catalogo')}</h1>
          {searchQuery && (
            <p className="catalog-hero__search">
              {t('resultados')}: <strong>"{searchQuery}"</strong>
            </p>
          )}
        </div>
      </div>

      <div className="container catalog-layout">
        {/* Sidebar */}
        <aside className={`catalog-sidebar${sidebarOpen ? ' catalog-sidebar--open' : ''}`}>
          <div className="catalog-sidebar__header">
            <div className="catalog-sidebar__title">
              <SlidersHorizontal size={16} />
              {t('filtrar').toUpperCase()}
            </div>
            <button className="catalog-sidebar__close" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <ul className="catalog-categories">
            <li>
              <button
                className={`catalog-cat-btn${activeCat === 'todos' ? ' catalog-cat-btn--active' : ''}`}
                onClick={() => { setCat('todos'); setSidebarOpen(false); }}
              >
                Todos los productos
              </button>
            </li>
            {categoryGroups.map(group => (
              <li key={group.id} className="catalog-group">
                <button
                  className="catalog-group__header"
                  onClick={() => toggleGroup(group.id)}
                >
                  <span>{group.name}</span>
                  <ChevronDown
                    size={14}
                    className={`catalog-group__chevron${openGroups[group.id] ? ' catalog-group__chevron--open' : ''}`}
                  />
                </button>
                {openGroups[group.id] && (
                  <ul className="catalog-group__items">
                    {group.subcategories.map(sub => (
                      <li key={sub.id}>
                        <button
                          className={`catalog-cat-btn catalog-cat-btn--sub${activeCat === sub.slug ? ' catalog-cat-btn--active' : ''}`}
                          onClick={() => { setCat(sub.slug); setSidebarOpen(false); }}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div className="overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <div className="catalog-main">
          {/* Toolbar */}
          <div className="catalog-toolbar">
            <div className="catalog-toolbar__left">
              <button
                className="catalog-filter-btn"
                onClick={() => setSidebarOpen(o => !o)}
              >
                <SlidersHorizontal size={16} />
                {t('filtrar')}
              </button>
              <span className="catalog-count">
                — <strong>{items.length}</strong> {items.length !== 1 ? t('productos') : t('producto')}
              </span>
            </div>
            <select
              className="catalog-sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS_KEYS.map(o => (
                <option key={o.value} value={o.value}>{t(o.labelKey)}</option>
              ))}
            </select>
          </div>

          {/* Product grid */}
          {items.length === 0 ? (
            <div className="catalog-empty">
              <p>{t('noResultados')}{searchQuery ? ` "${searchQuery}"` : ''}.</p>
            </div>
          ) : (
            <div className="catalog-grid">
              {items.map(item => (
                <CatalogCard
                  key={item.key}
                  product={item.product}
                  color={item.color}
                  image={item.image}
                  onClick={() => navigate(`/producto/${item.product.slug}`)}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CatalogCard({ product, color, image, onClick, t }) {
  // Foto de la lampara prendida, si la hay: se superpone a la apagada y se
  // cruza con un fundido al tocar el boton.
  const night = color?.imageNight;
  const [lit, setLit] = useState(false);

  return (
    <div className="cat-card card" onClick={onClick}>
      <div className="cat-card__img-wrap">
        <img
          src={image}
          srcSet={srcSetFor(image)}
          sizes={IMG_SIZES.card}
          alt={color ? `${product.name} en ${color.name}` : product.name}
          className="cat-card__img"
          loading="lazy"
        />
        {night && (
          <>
            <img
              src={night}
              sizes={IMG_SIZES.card}
              alt={`${product.name} en ${color.name}, encendida`}
              className={`cat-card__img cat-card__img--night${lit ? ' is-lit' : ''}`}
              loading="lazy"
            />
            <button
              type="button"
              className={`cat-card__light${lit ? ' is-lit' : ''}`}
              onClick={(e) => { e.stopPropagation(); setLit(v => !v); }}
              aria-pressed={lit}
              aria-label={lit ? t('verApagada') : t('verEncendida')}
              title={lit ? t('verApagada') : t('verEncendida')}
            >
              {lit ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </>
        )}
        {!product.inStock && <span className="cat-card__no-stock">{t('sinStock')}</span>}
        <div className="cat-card__quick-view">
          <Eye size={16} /> {t('verProducto')}
        </div>
      </div>
      <div className="cat-card__body">
        <h3 className={`cat-card__name${color ? ' cat-card__name--variant' : ''}`}>{product.name}</h3>
        {color && <p className="cat-card__color">{color.name}</p>}
        <button
          className={`btn btn-primary cat-card__btn${!product.inStock ? ' cat-card__btn--disabled' : ''}`}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          disabled={!product.inStock}
        >
          {!product.inStock ? t('sinStock') : t('ver')}
        </button>
      </div>
    </div>
  );
}
