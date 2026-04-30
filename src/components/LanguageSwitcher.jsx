import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'es', name: 'ES', flag: '🇪🇸' },
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'zh', name: 'ZH', flag: '🇨🇳' },
  ];

  const handleLanguageChange = (code) => {
    setLanguage(code);
    // Forzar recarga de página después de cambiar idioma
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="language-switcher">
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
  );
}
