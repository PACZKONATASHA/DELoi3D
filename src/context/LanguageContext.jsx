import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('es');
  const [isInitialized, setIsInitialized] = useState(false);

  // Sincronizar con localStorage al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && ['es', 'en', 'zh'].includes(savedLanguage)) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error al leer localStorage:', error);
      }
      setIsInitialized(true);
    }
  }, []);

  const setLanguage = (newLanguage) => {
    if (!['es', 'en', 'zh'].includes(newLanguage)) return;
    
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', newLanguage);
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
      }
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (let k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  // Esperar a que se inicialice para evitar problemas de hidratación
  if (!isInitialized && typeof window !== 'undefined') {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
};
