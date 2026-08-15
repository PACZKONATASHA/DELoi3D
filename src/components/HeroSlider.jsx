import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './HeroSlider.css';

// La lampara es el producto estrella, asi que abre el slider. Es el unico
// slide con dos fotos: la de abajo es la lampara apagada y encima se enciende
// la de la luz prendida (ver la animacion "lampara-prende" en el CSS). Las dos
// fotos salen alineadas de scripts/procesar-lampara-hero.mjs.
const SLIDES = [
  {
    apagada: '/hero-lampara-apagada.webp',
    encendida: '/hero-lampara-encendida.webp',
    alt: 'Lámpara 3D texturada, encendiéndose',
    // Un toque mas de tiempo: el encendido tarda casi tres segundos.
    espera: 7000,
  },
  { src: '/hero-1.png', alt: 'Florero 3D terracota con ramo de flores' },
  { src: '/hero-2.png', alt: 'Difusor 3D geométrico con palitos' },
  { src: '/hero-3.png', alt: 'Florero 3D blanco texturado con espigas' },
];

const INTERVAL = 4500;

export default function HeroSlider() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  // Timeout y no interval: cada slide dura lo suyo, y al tocar un punto el
  // reloj arranca de nuevo en vez de cortar la foto a mitad de camino.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, SLIDES[current].espera ?? INTERVAL);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="hero-split">
      {/* ── LEFT: text ── */}
      <div className="hero-split__text">
        <span className="hero-split__tag">{t('heroBadge')}</span>

        <h1 className="hero-split__title hero-split__title--thin">
          {t('heroTitle')}<br />
        </h1>

        <p className="hero-split__sub">
          {t('heroSubtitle')}
        </p>

        <div className="hero-split__actions">
          <Link to="/catalogo" className="hero-split__btn hero-split__btn--primary">
            {t('explorar')} <ArrowRight size={16} />
          </Link>
          <Link to="/galeria" className="hero-split__btn hero-split__btn--ghost">
            {t('verGaleria')}
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
          {SLIDES.map((slide, i) => {
            const activo = i === current;
            const clase = `hero-split__img${activo ? ' hero-split__img--active' : ''}`;

            // La lampara: dos fotos superpuestas. La de la luz prendida y el
            // resplandor de atras se animan cuando el slide entra, y se
            // reinician al salir porque se les saca la clase --prendida.
            if (slide.encendida) {
              return (
                <div
                  key={i}
                  className={`hero-lampara${activo ? ' hero-lampara--prendida' : ''}`}
                >
                  <span className="hero-lampara__resplandor" aria-hidden="true" />
                  <img src={slide.apagada} alt={slide.alt} className={clase} />
                  <img
                    src={slide.encendida}
                    alt=""
                    aria-hidden="true"
                    className="hero-split__img hero-lampara__luz"
                  />
                </div>
              );
            }

            return <img key={i} src={slide.src} alt={slide.alt} className={clase} />;
          })}
        </div>

        {/* Counter */}
        <span className="hero-split__counter">
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
