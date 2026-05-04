import { useLanguage } from '../context/LanguageContext';
import './LocationMap.css';

export default function LocationMap() {
  const { t } = useLanguage();
  const address = "Av. General Eutaquio Frías 3354, Floresta, Buenos Aires, Argentina";
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
  const mapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8920474156!2d-58.38!3d-34.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5c5c5c5c5c5%3A0xb5c5c5c5c5c5c5c5!2sAv.%20Gral.%20Eutaquio%20Fr%C3%ADas%203354!5e0!3m2!1ses!2sar`;

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8920474152126!2d-58.38!3d-34.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5c5c5c5c5c5%3A0xb5c5c5c5c5c5c5c5!2sAv.%20Gral.%20Eutaquio%20Fr%C3%ADas%203354%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1617000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DELoi3D Location"
            ></iframe>
          </div>

          <div className="location-map__info">
            <h3 className="location-map__info-title">{t('direccion')}</h3>
            <p className="location-map__address">
              {address}
            </p>
            
            <div className="location-map__hours">
              <h4 className="location-map__hours-title">{t('horarios')}</h4>
              <ul className="location-map__hours-list">
                <li>{t('lunes_viernes')}</li>
                <li>{t('sabados')}</li>
                <li>{t('domingos')}</li>
              </ul>
            </div>

            <a
              href={googleMapsUrl}
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
