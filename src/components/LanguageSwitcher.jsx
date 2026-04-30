import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: 'ES', flag: '🇪🇸' },
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'zh', name: 'ZH', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(lang => lang.code === language);

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher-dropdown">
      <button
        className="language-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={currentLang?.name}
      >
        <span className="lang-flag">{currentLang?.flag}</span>
        <span className="lang-code">{currentLang?.name}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleSelectLanguage(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-code">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
