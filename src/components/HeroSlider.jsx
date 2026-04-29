import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import './HeroSlider.css';

const SLIDES = [
  {
    src: '/hero-1.png',
    alt: 'Florero 3D terracota con ramo de flores',
  },
  {
    src: '/hero-2.png',
    alt: 'Difusor 3D geométrico con palitos',
  },
  {
    src: '/hero-3.png',
    alt: 'Florero 3D blanco texturado con espigas',
  },
];

const INTERVAL = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const scrollDown = () => {
    const el = document.querySelector('.features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-slider">
      {/* Slides */}
      <div className="hero-slider__track">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slider__slide${i === current ? ' hero-slider__slide--active' : ''}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="hero-slider__img"
            />
            <div className="hero-slider__overlay" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-slider__content container">
        <span className="hero-slider__tag">Impresión 3D Premium · Fabricación Propia</span>

        <h1 className="hero-slider__title">
          Impresiones en<br />
          <em>3D a medida</em>
        </h1>

        <p className="hero-slider__sub">
          Nos dedicamos a realizar piezas funcionales, de diseño que hablan por sí solas.
          Moderno, original y 100&nbsp;% fabricación propia.
        </p>

        <div className="hero-slider__actions">
          <Link to="/catalogo" className="hero-slider__btn hero-slider__btn--primary">
            Ver catálogo <ArrowRight size={17} />
          </Link>
          <Link to="/galeria" className="hero-slider__btn hero-slider__btn--ghost">
            Ver galería
          </Link>
        </div>

        {/* Navigation dots */}
        <div className="hero-slider__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-slider__dot${i === current ? ' hero-slider__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button className="hero-slider__scroll" onClick={scrollDown} aria-label="Ver más">
        <span className="hero-slider__scroll-label">Descubrí más</span>
        <ChevronDown size={20} className="hero-slider__scroll-icon" />
      </button>
    </section>
  );
}
