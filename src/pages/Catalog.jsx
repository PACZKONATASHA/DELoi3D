import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Eye, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { products, categoryGroups } from '../data/products';
import './Catalog.css';

const SORT_OPTIONS_KEYS = [
  { value: 'relevance', labelKey: 'masPopular' },
  { value: 'price-asc', labelKey: 'menorPrecio' },
  { value: 'price-desc', labelKey: 'mayorPrecio' },
  { value: 'name-az', labelKey: 'masNuevo' },
];

export default function Catalog() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('relevance');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({ decoracion: true, jardin: true, iluminacion: true });
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
      case 'price-asc': return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'name-az': return list.sort((a, b) => a.name.localeCompare(b.name));
      default: return list;
    }
  }, [activeCat, sortBy, searchQuery]);

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
                — <strong>{filtered.length}</strong> {filtered.length !== 1 ? t('productos') : t('producto')}
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
          {filtered.length === 0 ? (
            <div className="catalog-empty">
              <p>{t('noResultados')}{searchQuery ? ` "${searchQuery}"` : ''}.</p>
            </div>
          ) : (
            <div className="catalog-grid">
              {filtered.map(p => (
                <CatalogCard
                  key={p.id}
                  product={p}
                  onClick={() => navigate(`/producto/${p.slug}`)}
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

function CatalogCard({ product, onClick, t }) {
  return (
    <div className="cat-card card" onClick={onClick}>
      <div className="cat-card__img-wrap">
        <img src={product.images[0]} alt={product.name} className="cat-card__img" loading="lazy" />
        {!product.inStock && <span className="cat-card__no-stock">{t('sinStock')}</span>}
        <div className="cat-card__quick-view">
          <Eye size={16} /> {t('verProducto')}
        </div>
      </div>
      <div className="cat-card__body">
        <h3 className="cat-card__name">{product.name}</h3>
        <p className="cat-card__price price">${product.price.toLocaleString('es-AR')}</p>
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
