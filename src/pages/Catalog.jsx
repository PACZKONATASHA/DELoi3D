import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Eye } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import './Catalog.css';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia / Nuevos' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name-az', label: 'Nombre A-Z' },
];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('relevance');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addItem } = useCart();
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

  return (
    <div className="catalog-page">
      {/* Hero banner */}
      <div className="catalog-hero">
        <div className="container">
          <h1 className="catalog-hero__title">Catálogo</h1>
          {searchQuery && (
            <p className="catalog-hero__search">
              Resultados para: <strong>"{searchQuery}"</strong>
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
              CATEGORÍAS
            </div>
            <button className="catalog-sidebar__close" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <ul className="catalog-categories">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  className={`catalog-cat-btn${activeCat === cat.slug ? ' catalog-cat-btn--active' : ''}`}
                  onClick={() => { setCat(cat.slug); setSidebarOpen(false); }}
                >
                  {cat.name}
                </button>
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
                Filtrar productos
              </button>
              <span className="catalog-count">
                — <strong>{filtered.length}</strong> producto{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
            <select
              className="catalog-sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="catalog-empty">
              <p>No se encontraron productos{searchQuery ? ` para "${searchQuery}"` : ''}.</p>
            </div>
          ) : (
            <div className="catalog-grid">
              {filtered.map(p => (
                <CatalogCard
                  key={p.id}
                  product={p}
                  onAdd={addItem}
                  onClick={() => navigate(`/producto/${p.slug}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CatalogCard({ product, onAdd, onClick }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAdd(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="cat-card card" onClick={onClick}>
      <div className="cat-card__img-wrap">
        <img src={product.images[0]} alt={product.name} className="cat-card__img" loading="lazy" />
        {!product.inStock && <span className="cat-card__no-stock">Sin Stock</span>}
        <button className="cat-card__quick-view" onClick={onClick} aria-label="Ver producto">
          <Eye size={16} />
        </button>
      </div>
      <div className="cat-card__body">
        <h3 className="cat-card__name">{product.name}</h3>
        <p className="cat-card__price price">${product.price.toLocaleString('es-AR')}</p>
        <button
          className={`btn btn-primary cat-card__btn${added ? ' cat-card__btn--added' : ''}`}
          onClick={handleAdd}
          disabled={!product.inStock}
        >
          {added ? '✓ Agregado' : !product.inStock ? 'Sin stock' : 'Ver'}
        </button>
      </div>
    </div>
  );
}
