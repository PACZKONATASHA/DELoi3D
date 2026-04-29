import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroSlider.css';

const SLIDES = [
  { src: '/hero-1.png', alt: 'Florero 3D terracota con ramo de flores' },
  { src: '/hero-2.png', alt: 'Difusor 3D geométrico con palitos' },
  { src: '/hero-3.png', alt: 'Florero 3D blanco texturado con espigas' },
];

const INTERVAL = 4500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-split">
      {/* ── LEFT: text ── */}
      <div className="hero-split__text">
        <span className="hero-split__tag">Impresión 3D · Fabricación propia</span>

        <h1 className="hero-split__title">
          Impresiones<br />
          en <em>3D</em>
        </h1>

        <p className="hero-split__sub">
          Nos dedicamos a realizar piezas funcionales, de diseño
          que hablan por sí solas. Moderno, original y 100&nbsp;%
          fabricación propia.
        </p>

        <div className="hero-split__actions">
          <Link to="/catalogo" className="hero-split__btn hero-split__btn--primary">
            Ver catálogo <ArrowRight size={16} />
          </Link>
          <Link to="/galeria" className="hero-split__btn hero-split__btn--ghost">
            Ver galería
          </Link>
        </div>

        {/* Dots */}
        <div className="hero-split__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-split__dot${i === current ? ' hero-split__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT: image slider ── */}
      <div className="hero-split__visual">
        <div className="hero-split__slider">
          {SLIDES.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt={slide.alt}
              className={`hero-split__img${i === current ? ' hero-split__img--active' : ''}`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="hero-split__counter">
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
