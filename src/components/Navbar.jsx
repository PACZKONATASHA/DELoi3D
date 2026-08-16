import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { products } from '../data/products';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    const q = query.toLowerCase();
    setSuggestions(products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5));
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Para desktop search
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
      // Para mobile search
      if (searchOpen && mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        if (!e.target.closest('.navbar__mobile-search-btn')) {
          setSuggestions([]);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

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
    { to: '/', label: t('inicio') },
    { to: '/catalogo', label: t('catalogo') },
    { to: '/galeria', label: t('galeria') },
    { to: '/mayoristas', label: t('mayoristas') },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        {/* Logo del cliente. La barra es blanca, asi que va la version normal
            (en el pie, que es negro, va logo-claro.webp). */}
        <Link to="/" className="navbar__logo">
          <img src="/marca/logo.webp" alt="DELoi3D" className="navbar__logo-img" />
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
        <div className="navbar__search" ref={desktopSearchRef}>
          <form onSubmit={handleSearch} className="navbar__search-form">
            <Search size={16} className="navbar__search-icon" />
            <input
              type="text"
              placeholder={t('buscar')}
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
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language switcher */}
        <LanguageSwitcher />

        {/* Mobile controls */}
        <div className="navbar__mobile-controls">
          <button
            className="navbar__mobile-search-btn"
            onClick={() => setSearchOpen(o => !o)}
            aria-label="Buscar"
          >
            <Search size={20} />
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
        <div className="navbar__mobile-search" ref={mobileSearchRef}>
          <form onSubmit={handleSearch} className="navbar__search-form navbar__search-form--mobile">
            <Search size={16} className="navbar__search-icon" />
            <input
              autoFocus
              type="text"
              placeholder={t('buscar')}
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
