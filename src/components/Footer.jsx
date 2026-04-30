import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-pill">
                <div>
                  <div className="footer__logo-brand">DELoi3D</div>
                  <div className="footer__logo-sub">Impresión 3D</div>
                </div>
                <div className="footer__logo-divider" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".7">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
            <p className="footer__desc">
              Unique products made to order with high quality 3D printing. Personalized gifts, decor and much more.
            </p>
          </div>

          {/* Nav */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('inicio')}</h4>
            <ul className="footer__links">
              <li><Link to="/">{t('inicio')}</Link></li>
              <li><Link to="/catalogo">{t('catalogo')}</Link></li>
              <li><Link to="/galeria">{t('galeria')}</Link></li>
              <li><Link to="/mayoristas">{t('mayorista')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">{t('ubicacion')}</h4>
            <ul className="footer__info">
              <li>
                <MapPin size={14} />
                <span>Buenos Aires, Argentina</span>
              </li>
              <li>
                <Clock size={14} />
                <span>{t('lunes_viernes')} · {t('sabados')}</span>
              </li>
              <li>
                <InstagramIcon />
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  @deloi3d
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} DELoi3D — {t('derechos')}</span>
          <Link to="/terminos" className="footer__terms">{t('terminos')}</Link>
        </div>
      </div>
    </footer>
  );
}
