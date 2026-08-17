import { useLanguage } from '../context/LanguageContext';
import { DIRECCION, NEGOCIO, mapsEmbedUrl, mapsLinkUrl } from '../data/ubicacion';
import './LocationMap.css';

export default function LocationMap() {
  const { t, language } = useLanguage();

  return (
    <section className="location-map">
      <div className="container">
        <div className="location-map__header">
          <h2 className="section-title">{t('ubicacion')}</h2>
          <p className="section-sub">
            {t('visitanos')}
          </p>
        </div>

        <div className="location-map__wrapper">
          <div className="location-map__embed">
            <iframe
              key={language}
              src={mapsEmbedUrl(language)}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${NEGOCIO} — ${DIRECCION}`}
            ></iframe>
          </div>

          <div className="location-map__info">
            <h3 className="location-map__info-title">{t('direccion')}</h3>
            <p className="location-map__address">
              {DIRECCION}
            </p>
            
            <div className="location-map__hours">
              <h4 className="location-map__hours-title">{t('horarios')}</h4>
              {/* Dos lineas y no tres: `sabados` ya dice "Domingo: Cerrado",
                  asi que la vieja clave `domingos` repetia lo mismo. */}
              <ul className="location-map__hours-list">
                <li>{t('lunes_viernes')}</li>
                <li>{t('sabados')}</li>
              </ul>
            </div>

            <a
              href={mapsLinkUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary location-map__btn"
            >
              {t('abrirEnMaps')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
