import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './Navbar.css';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    const q = query.toLowerCase();
    setSuggestions(products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5));
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSuggestions([]);
      setSearchOpen(false);
    }
  };

  const goToProduct = (slug) => {
    navigate(`/producto/${slug}`);
    setQuery('');
    setSuggestions([]);
    setSearchOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/galeria', label: 'Galería' },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        {/* Logo alargado */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-pill">
            <div>
              <div className="navbar__logo-brand">DELoi3D</div>
              <div className="navbar__logo-sub">Impresión 3D</div>
            </div>
            <div className="navbar__logo-divider" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".7">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop search */}
        <div className="navbar__search" ref={searchRef}>
          <form onSubmit={handleSearch} className="navbar__search-form">
            <Search size={16} className="navbar__search-icon" />
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="navbar__search-input"
            />
          </form>
          {suggestions.length > 0 && (
            <div className="navbar__suggestions">
              {suggestions.map(p => (
                <button key={p.id} className="navbar__suggestion" onClick={() => goToProduct(p.slug)}>
                  <img src={p.images[0]} alt={p.name} className="navbar__suggestion-img" />
                  <div>
                    <div className="navbar__suggestion-name">{p.name}</div>
                    <div className="navbar__suggestion-price">${p.price.toLocaleString('es-AR')}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cart button */}
        <button className="navbar__cart" onClick={() => setIsOpen(true)} aria-label="Carrito">
          <ShoppingCart size={22} />
          {count > 0 && <span className="navbar__cart-badge">{count}</span>}
        </button>

        {/* Mobile controls */}
        <div className="navbar__mobile-controls">
          <button
            className="navbar__mobile-search-btn"
            onClick={() => setSearchOpen(o => !o)}
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
          <button className="navbar__cart navbar__cart--mobile" onClick={() => setIsOpen(true)} aria-label="Carrito">
            <ShoppingCart size={20} />
            {count > 0 && <span className="navbar__cart-badge">{count}</span>}
          </button>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="navbar__mobile-search" ref={searchRef}>
          <form onSubmit={handleSearch} className="navbar__search-form navbar__search-form--mobile">
            <Search size={16} className="navbar__search-icon" />
            <input
              autoFocus
              type="text"
              placeholder="Buscar productos..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="navbar__search-input"
            />
          </form>
          {suggestions.length > 0 && (
            <div className="navbar__suggestions navbar__suggestions--mobile">
              {suggestions.map(p => (
                <button key={p.id} className="navbar__suggestion" onClick={() => goToProduct(p.slug)}>
                  <img src={p.images[0]} alt={p.name} className="navbar__suggestion-img" />
                  <div>
                    <div className="navbar__suggestion-name">{p.name}</div>
                    <div className="navbar__suggestion-price">${p.price.toLocaleString('es-AR')}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="navbar__mobile-menu">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'navbar__mobile-link navbar__mobile-link--active' : 'navbar__mobile-link'}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
