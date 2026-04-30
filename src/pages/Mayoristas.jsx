import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, BarChart3, Package, MessageSquare, ArrowRight } from 'lucide-react';
import './Mayoristas.css';

const WHATSAPP_NUMBER = "549XXXXXXXXXX";

const BENEFITS = [
  {
    icon: <TrendingUp size={28} />,
    titleKey: 'preciosEspeciales',
    descKey: 'beneficio1Desc',
  },
  {
    icon: <BarChart3 size={28} />,
    titleKey: 'beneficio2',
    descKey: 'beneficio2Desc',
  },
  {
    icon: <Package size={28} />,
    titleKey: 'beneficio3',
    descKey: 'beneficio3Desc',
  },
  {
    icon: <MessageSquare size={28} />,
    titleKey: 'asesoramiento',
    descKey: 'beneficio4Desc',
  },
];

const STEPS = [
  { num: '01', titleKey: 'paso1', descKey: 'paso1Desc' },
  { num: '02', titleKey: 'paso2', descKey: 'paso2Desc' },
  { num: '03', titleKey: 'paso3', descKey: 'paso3Desc' },
  { num: '04', titleKey: 'paso4', descKey: 'paso4Desc' },
];

const REQUIRED_FIELDS = ['nombre', 'telefono', 'email', 'producto'];

const INITIAL_FORM = {
  nombre: '', emprendimiento: '', cuit: '',
  domicilio: '', telefono: '', email: '',
  producto: '', cantidad: '', mensaje: '',
};

export default function Mayoristas() {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    REQUIRED_FIELDS.forEach(k => {
      if (!form[k].trim()) errs[k] = 'Este campo es obligatorio.';
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Ingresá un email válido.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstError = document.querySelector('.may-field--error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const lines = [
      'Hola, quiero solicitar información sobre ventas mayoristas.',
      '',
      `Nombre: ${form.nombre}`,
      `Emprendimiento / Razón social: ${form.emprendimiento || '—'}`,
      `CUIT: ${form.cuit || '—'}`,
      `Domicilio comercial: ${form.domicilio || '—'}`,
      `Teléfono: ${form.telefono}`,
      `Email: ${form.email}`,
      `Producto de interés: ${form.producto}`,
      `Cantidad estimada: ${form.cantidad || '—'}`,
      `Mensaje: ${form.mensaje || '—'}`,
    ];

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank'
    );
  };

  const scrollToForm = () => {
    document.getElementById('form-mayorista')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="ventas-mayoristas" className="mayoristas">

      {/* ── Hero ── */}
      <section className="may-hero">
        <div className="container may-hero__inner">
          <span className="may-badge">{t('mayorista')}</span>
          <h1 className="may-hero__title">
            {t('mayoristasTitle')}
          </h1>
          <p className="may-hero__sub">
            {t('mayoristasDesc')}
          </p>
          <button className="btn btn-primary" onClick={scrollToForm}>
            {t('contactarMayor')} <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section className="may-benefits section">
        <div className="container">
          <div className="may-section-header">
            <h2 className="may-title">{t('beneficios')}</h2>
            <p className="may-sub">{t('beneficiosSub')}</p>
          </div>
          <div className="may-benefits__grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="may-benefit-card">
                <div className="may-benefit-card__icon">{b.icon}</div>
                <h3 className="may-benefit-card__title">{t(b.titleKey)}</h3>
                <p className="may-benefit-card__desc">{t(b.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Productos disponibles ── */}
      <section className="may-available section">
        <div className="container">
          <div className="may-available__card">
            <div className="may-available__content">
              <h2 className="may-title">{t('productosDisponibles')}</h2>
              <p className="may-available__text">
                {t('productosDisponiblesDesc')}
              </p>
              <div className="may-available__actions">
                <button className="btn btn-olive" onClick={scrollToForm}>
                  {t('consultarProductos')}
                </button>
                <Link to="/catalogo" className="btn btn-outline">
                  {t('verCatalogo')} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pasos ── */}
      <section className="may-steps section">
        <div className="container">
          <div className="may-section-header">
            <h2 className="may-title">{t('comoComprar')}</h2>
            <p className="may-sub">{t('comoComprarSub')}</p>
          </div>
          <div className="may-steps__grid">
            {STEPS.map((s, i) => (
              <div key={i} className="may-step">
                <div className="may-step__num">{s.num}</div>
                <h3 className="may-step__title">{t(s.titleKey)}</h3>
                <p className="may-step__desc">{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulario ── */}
      <section className="may-form-section section" id="form-mayorista">
        <div className="container">
          <div className="may-form-card">
            <div className="may-form-card__header">
              <h2 className="may-title">{t('solicitarInfo')}</h2>
              <p className="may-sub">
                {t('solicitarInfoSub')}
              </p>
            </div>

            <form className="may-form" onSubmit={handleSubmit} noValidate>
              <div className="may-form__grid">

                <div className={`may-field${errors.nombre ? ' may-field--error' : ''}`}>
                  <label className="may-label">{t('nombreApellido')} <span>*</span></label>
                  <input
                    className="may-input"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handle}
                    placeholder={t('placeholderNombre')}
                  />
                  {errors.nombre && <p className="may-error">{t('campoObligatorio')}</p>}
                </div>

                <div className="may-field">
                  <label className="may-label">{t('emprendimiento')}</label>
                  <input
                    className="may-input"
                    type="text"
                    name="emprendimiento"
                    value={form.emprendimiento}
                    onChange={handle}
                    placeholder={t('placeholderEmprendimiento')}
                  />
                </div>

                <div className="may-field">
                  <label className="may-label">CUIT</label>
                  <input
                    className="may-input"
                    type="text"
                    name="cuit"
                    value={form.cuit}
                    onChange={handle}
                    placeholder={t('placeholderCUIT')}
                  />
                </div>

                <div className="may-field">
                  <label className="may-label">{t('domicilio')}</label>
                  <input
                    className="may-input"
                    type="text"
                    name="domicilio"
                    value={form.domicilio}
                    onChange={handle}
                    placeholder={t('placeholderDomicilio')}
                  />
                </div>

                <div className={`may-field${errors.telefono ? ' may-field--error' : ''}`}>
                  <label className="may-label">{t('telefonoWhatsApp')} <span>*</span></label>
                  <input
                    className="may-input"
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handle}
                    placeholder="+54 9 11 XXXX-XXXX"
                  />
                  {errors.telefono && <p className="may-error">{t('campoObligatorio')}</p>}
                </div>

                <div className={`may-field${errors.email ? ' may-field--error' : ''}`}>
                  <label className="may-label">Email <span>*</span></label>
                  <input
                    className="may-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="may-error">{t('emailInvalido')}</p>}
                </div>

                <div className={`may-field may-field--full${errors.producto ? ' may-field--error' : ''}`}>
                  <label className="may-label">{t('productoInteres')} <span>*</span></label>
                  <input
                    className="may-input"
                    type="text"
                    name="producto"
                    value={form.producto}
                    onChange={handle}
                    placeholder={t('placeholderProducto')}
                  />
                  {errors.producto && <p className="may-error">{t('campoObligatorio')}</p>}
                </div>

                <div className="may-field may-field--full">
                  <label className="may-label">{t('cantidadEstimada')}</label>
                  <input
                    className="may-input"
                    type="text"
                    name="cantidad"
                    value={form.cantidad}
                    onChange={handle}
                    placeholder={t('placeholderCantidad')}
                  />
                </div>

                <div className="may-field may-field--full">
                  <label className="may-label">{t('mensajeAdicional')}</label>
                  <textarea
                    className="may-input may-textarea"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handle}
                    placeholder={t('placeholderMensaje')}
                    rows={4}
                  />
                </div>

              </div>

              <div className="may-form__submit">
                <button type="submit" className="btn btn-primary may-submit-btn">
                  {t('enviarConsulta')} <ArrowRight size={18} />
                </button>
                <p className="may-form__note">
                  {t('notaFormulario')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="may-cta">
        <div className="container may-cta__inner">
          <div>
            <h2 className="may-cta__title">¿Querés comprar al por mayor?</h2>
            <p className="may-cta__sub">
              Completá el formulario o escribinos por WhatsApp y te ayudamos
              a encontrar la mejor opción para tu negocio.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero consultar sobre ventas mayoristas.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn may-cta__btn"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>

    </main>
  );
}
