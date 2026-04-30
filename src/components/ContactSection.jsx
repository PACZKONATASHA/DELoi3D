import { Heart, MessageCircle } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <img 
        src="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1400&h=700&q=85&fit=crop" 
        alt="Impresora 3D"
        className="contact-section__background"
      />
      <div className="contact-section__overlay"></div>
      
      <div className="contact-section__content">
        <div className="contact-section__card">
          <h3 className="contact-section__title">Nos encantaría conocerte</h3>
          
          <div className="contact-section__schedule">
            <p className="schedule-label">Horarios de atención</p>
            <p className="schedule-days">Lunes a sábados</p>
            <p className="schedule-hours">10:00 - 20:00 hs</p>
          </div>

          {/* Redes sociales */}
          <div className="contact-section__socials">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn social-btn--ig"
              aria-label="Instagram"
              title="Instagram"
            >
              @instagram
            </a>
            <a 
              href="https://wa.me/1161307110?text=Hola!+Tengo+una+consulta+sobre+sus+productos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn social-btn--wa"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
