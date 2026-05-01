import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, SendHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ReviewsCarousel.css';

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'María García',
    comment: 'Me encantó la calidad de los productos. El detalle en 3D es impresionante, exactamente como lo imaginé.',
    date: '2024-04-20',
    timestamp: Date.now() - (2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    author: 'Lucas Rodríguez',
    comment: 'Excelente atención al cliente. Mi pedido llegó rápido y bien embalado. Volveré a comprar!',
    date: '2024-04-15',
    timestamp: Date.now() - (5 * 60 * 60 * 1000),
  },
  {
    id: 3,
    author: 'Sofia Martínez',
    comment: 'El diseño que me propusieron fue mucho mejor que lo que esperaba. Muy profesionales.',
    date: '2024-04-10',
    timestamp: Date.now() - (8 * 60 * 60 * 1000),
  },
  {
    id: 4,
    author: 'Juan López',
    comment: 'Perfecto para regalos. La presentación es muy premium. Recomiendo ampliamente.',
    date: '2024-04-05',
    timestamp: Date.now() - (12 * 60 * 60 * 1000),
  },
];

const MAX_REVIEWS = 10;
const REVIEW_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 días

export default function ReviewsCarousel() {
  const { t, language } = useLanguage();
  const carouselRef = useRef(null);
  const [reviews, setReviews] = useState(() => {
    // Cargar comentarios del localStorage al iniciar
    const savedReviews = localStorage.getItem('reviews');
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
      const newReview = {
        id: reviews.length + 1,
        author: formData.author,
        comment: formData.comment,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now(),
      };
      const updatedReviews = [newReview, ...reviews].slice(0, MAX_REVIEWS);
      setReviews(updatedReviews);
      // Guardar en localStorage
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
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
