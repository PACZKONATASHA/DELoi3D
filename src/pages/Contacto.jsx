import { useLanguage } from '../context/LanguageContext';
import LocationMap from '../components/LocationMap';
import ReviewsCarousel from '../components/ReviewsCarousel';
import './Contacto.css';

// Las dos secciones (ubicacion y opiniones) estaban al final del inicio.
// Viven aca ahora: es lo que alguien viene a buscar cuando hace click en
// "Contacto", y en el inicio quedaban tan abajo que casi no se veian.
export default function Contacto() {
  const { t } = useLanguage();

  return (
    <div className="contacto-page">
      <div className="contacto-hero">
        <div className="container">
          <h1 className="contacto-hero__title">{t('contactoTitulo')}</h1>
          <p className="contacto-hero__sub">{t('contactoDesc')}</p>
        </div>
      </div>

      <LocationMap />

      <ReviewsCarousel />
    </div>
  );
}
