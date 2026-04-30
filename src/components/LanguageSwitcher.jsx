import { useLanguage } from '../context/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const languages = [
    { code: 'es', name: 'ES', flag: '🇪🇸' },
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'zh', name: 'ZH', flag: '🇨🇳' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);
  const otherLanguages = languages.filter((lang) => lang.code !== language);

  const handleLanguageChange = (code) => {
    // Limpiar y guardar el nuevo idioma
    localStorage.removeItem('language');
    localStorage.setItem('language', code);
    setLanguage(code);
    setIsOpen(false);
    
    // Forzar recarga de página después de cambiar idioma
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher-container" ref={menuRef}>
      {/* Desktop: mostrar 3 botones en línea */}
      <div className="language-switcher-desktop">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`lang-btn ${language === lang.code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(lang.code)}
            title={lang.name}
          >
            <span className="lang-flag">{lang.flag}</span>
            <span className="lang-code">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Mobile: mostrar menú desplegable con bandera */}
      <div className="language-switcher-mobile">
        <button
          className={`lang-btn-mobile ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title={currentLanguage?.name}
        >
          <span className="lang-flag">{currentLanguage?.flag}</span>
          <span className="dropdown-icon">▼</span>
        </button>

        {isOpen && (
          <div className="language-dropdown">
            {otherLanguages.map((lang) => (
              <button
                key={lang.code}
                className="dropdown-item"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-code">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
