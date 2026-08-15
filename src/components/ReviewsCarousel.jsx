import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, SendHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ReviewsCarousel.css';

const HORA = 60 * 60 * 1000;
const DIA = 24 * HORA;

const MAX_REVIEWS = 10;
const REVIEW_DURATION = 30 * DIA; // 30 días
const STORAGE_KEY = 'reviews-v2';

// Fecha del dia (la local, no la UTC: a la madrugada se irian un dia atras).
const fechaDe = (ms) => {
  const d = new Date(ms);
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
};

// Los comentarios de ejemplo se anclan a "hace tanto" en vez de a una fecha
// escrita a mano: asi la fecha que se muestra acompaña siempre al dia en que
// se visita la pagina y no vuelve a quedar vieja. Tienen que caer dentro de
// REVIEW_DURATION o el mismo filtro de abajo los esconde.
const reseña = (id, author, comment, hace) => {
  const timestamp = Date.now() - hace;
  return { id, author, comment, timestamp, date: fechaDe(timestamp) };
};

const INITIAL_REVIEWS = [
  reseña(1, 'María García',
    'Me encantó la calidad de los productos. El detalle en 3D es impresionante, exactamente como lo imaginé.',
    2 * HORA),
  reseña(2, 'Lucas Rodríguez',
    'Excelente atención al cliente. Mi pedido llegó rápido y bien embalado. Volveré a comprar!',
    3 * DIA),
  reseña(3, 'Sofia Martínez',
    'El diseño que me propusieron fue mucho mejor que lo que esperaba. Muy profesionales.',
    9 * DIA),
  reseña(4, 'Juan López',
    'Perfecto para regalos. La presentación es muy premium. Recomiendo ampliamente.',
    16 * DIA),
];

export default function ReviewsCarousel() {
  const { t, language } = useLanguage();
  const carouselRef = useRef(null);
  const [reviews, setReviews] = useState(() => {
    // Cargar comentarios del localStorage al iniciar.
    // La clave lleva version: los que ya habian visitado la pagina tenian
    // guardados los comentarios de ejemplo con las fechas viejas, y sin esto
    // los seguirian viendo.
    const savedReviews = localStorage.getItem(STORAGE_KEY);
    if (savedReviews) {
      try {
        return JSON.parse(savedReviews);
      } catch {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });
  const [formData, setFormData] = useState({ author: '', comment: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (formData.author.trim() && formData.comment.trim()) {
      const ahora = Date.now();
      const newReview = {
        id: reviews.length + 1,
        author: formData.author,
        comment: formData.comment,
        date: fechaDe(ahora),
        timestamp: ahora,
      };
      const updatedReviews = [newReview, ...reviews].slice(0, MAX_REVIEWS);
      setReviews(updatedReviews);
      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
      setFormData({ author: '', comment: '' });
      setShowForm(false);
    }
  };

  const getValidReviews = () => {
    const now = Date.now();
    return reviews.filter(review => {
      const age = now - review.timestamp;
      return age < REVIEW_DURATION;
    }).slice(0, MAX_REVIEWS);
  };

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="reviews section">
      <div className="container">
        <div className="reviews__header">
          <div>
            <h2 className="section-title">{t('reviews')}</h2>
            <p className="section-sub">
              {t('reviewsSubtitle')}
            </p>
          </div>
          <button 
            className="btn btn-primary reviews__btn-new"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? t('volverAlInicio') : t('reviewsSubtitle')}
          </button>
        </div>

        {/* Form to add new review */}
        {showForm && (
          <form className="reviews__form" onSubmit={handleSubmitReview}>
            <input
              type="text"
              placeholder={t('tuNombre')}
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="reviews__input"
              required
            />
            <textarea
              placeholder={t('tuComentario')}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="reviews__textarea"
              rows="4"
              required
            />
            <div className="reviews__form-footer">
              <button type="submit" className="btn btn-primary reviews__submit" style={{ marginLeft: 'auto' }}>
                {t('enviar')} <SendHorizontal size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Reviews Carousel */}
        <div className="reviews__carousel-wrapper">
          <button 
            className="reviews__carousel-btn reviews__carousel-btn--prev"
            onClick={() => scrollCarousel(-1)} 
            aria-label={t('anterior')}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="reviews__carousel" ref={carouselRef}>
            {getValidReviews().map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card__author">{review.author}</div>
                <p className="review-card__text">{review.comment}</p>
                <span className="review-card__date">
                  {new Date(review.date).toLocaleDateString(language === 'es' ? 'es-AR' : language === 'en' ? 'en-US' : 'zh-CN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            ))}
          </div>

          <button 
            className="reviews__carousel-btn reviews__carousel-btn--next"
            onClick={() => scrollCarousel(1)} 
            aria-label={t('siguiente')}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="reviews__info">
          <p>Total de comentarios: <strong>{getValidReviews().length}</strong></p>
        </div>
      </div>
    </section>
  );
}
