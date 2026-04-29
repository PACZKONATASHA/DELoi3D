import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
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
              </div>
            </div>
            <p className="footer__desc">
              Productos únicos hechos a pedido con impresión 3D de alta calidad. Regalos personalizados, deco y mucho más.
            </p>
          </div>

          {/* Nav */}
          <div className="footer__col">
            <h4 className="footer__heading">Navegación</h4>
            <ul className="footer__links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/galeria">Galería</Link></li>
              <li><Link to="/mayoristas">Mayoristas</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contacto</h4>
            <ul className="footer__info">
              <li>
                <MapPin size={14} />
                <span>Buenos Aires, Argentina</span>
              </li>
              <li>
                <Clock size={14} />
                <span>Lun–Vie 9–18h · Sáb 9–13h</span>
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
          <span>© {new Date().getFullYear()} DELoi3D — Todos los derechos reservados.</span>
          <Link to="/terminos" className="footer__terms">Términos y Condiciones</Link>
        </div>
      </div>
    </footer>
  );
}
