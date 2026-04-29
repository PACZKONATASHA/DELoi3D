import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryImages, categories } from '../data/products';
import './Gallery.css';

export default function Gallery() {
  const [activeCat, setActiveCat] = useState('todas');
  const [lightbox, setLightbox] = useState(null);

  const galleryCategories = [
    { slug: 'todas', name: 'Todas' },
    ...categories.filter(c => c.id !== 'todos'),
  ];

  const filtered = activeCat === 'todas'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCat);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevLb = () => setLightbox(i => (i === 0 ? filtered.length - 1 : i - 1));
  const nextLb = () => setLightbox(i => (i === filtered.length - 1 ? 0 : i + 1));

  return (
    <div className="gallery-page">
      {/* Hero */}
      <div className="gallery-hero">
        <div className="container">
          <h1 className="gallery-hero__title">Galería</h1>
          <p className="gallery-hero__sub">Mirá nuestros trabajos terminados.</p>
        </div>
      </div>

      <div className="container gallery-content">
        {/* Category filter tabs */}
        <div className="gallery-tabs">
          {galleryCategories.map(cat => (
            <button
              key={cat.slug}
              className={`gallery-tab${activeCat === cat.slug ? ' gallery-tab--active' : ''}`}
              onClick={() => setActiveCat(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="gallery-count">{filtered.length} foto{filtered.length !== 1 ? 's' : ''}</p>

        {/* Masonry grid */}
        <div className="gallery-grid">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              className="gallery-item"
              onClick={() => openLightbox(i)}
              aria-label={img.alt}
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="gallery-item__img" />
              <div className="gallery-item__overlay">
                <span className="gallery-item__label">{img.alt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox}><X size={22} /></button>
          <button className="lightbox__arrow lightbox__arrow--left" onClick={e => { e.stopPropagation(); prevLb(); }}>
            <ChevronLeft size={28} />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="lightbox__img"
            onClick={e => e.stopPropagation()}
          />
          <button className="lightbox__arrow lightbox__arrow--right" onClick={e => { e.stopPropagation(); nextLb(); }}>
            <ChevronRight size={28} />
          </button>
          <span className="lightbox__counter">{lightbox + 1} / {filtered.length}</span>
        </div>
      )}
    </div>
  );
}
