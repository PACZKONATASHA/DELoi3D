import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Package, MessageSquare, ArrowRight } from 'lucide-react';
import './Mayoristas.css';

const WHATSAPP_NUMBER = "549XXXXXXXXXX";

const BENEFITS = [
  {
    icon: <TrendingUp size={28} />,
    title: 'Precios por volumen',
    desc: 'Comprá en mayor cantidad y accedé a precios especiales.',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Mayor margen de ganancia',
    desc: 'Ideal para revender o sumar productos a tu emprendimiento.',
  },
  {
    icon: <Package size={28} />,
    title: 'Stock para tu negocio',
    desc: 'Planificá tus compras y asegurá disponibilidad.',
  },
  {
    icon: <MessageSquare size={28} />,
    title: 'Atención personalizada',
    desc: 'Te asesoramos según los productos que buscás.',
  },
];

const STEPS = [
  { num: '01', title: 'Completá tus datos', desc: 'Llenás el formulario con tu información y lo que necesitás.' },
  { num: '02', title: 'Validamos tu solicitud', desc: 'Revisamos tu consulta y te contactamos a la brevedad.' },
  { num: '03', title: 'Recibís el catálogo', desc: 'Te enviamos precios, condiciones y productos disponibles.' },
  { num: '04', title: 'Coordinamos todo', desc: 'Acordamos forma de pago y entrega según tus necesidades.' },
];

const REQUIRED_FIELDS = ['nombre', 'telefono', 'email', 'producto'];

const INITIAL_FORM = {
  nombre: '', emprendimiento: '', cuit: '',
  domicilio: '', telefono: '', email: '',
  producto: '', cantidad: '', mensaje: '',
};

export default function Mayoristas() {
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
          <span className="may-badge">Ventas mayoristas</span>
          <h1 className="may-hero__title">
            Comprá al por mayor para tu emprendimiento
          </h1>
          <p className="may-hero__sub">
            Accedé a productos seleccionados con condiciones especiales
            para emprendedores, comercios y revendedores.
          </p>
          <button className="btn btn-primary" onClick={scrollToForm}>
            Solicitar catálogo mayorista <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section className="may-benefits section">
        <div className="container">
          <div className="may-section-header">
            <h2 className="may-title">¿Por qué comprar al por mayor?</h2>
            <p className="may-sub">Beneficios pensados para hacer crecer tu negocio.</p>
          </div>
          <div className="may-benefits__grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="may-benefit-card">
                <div className="may-benefit-card__icon">{b.icon}</div>
                <h3 className="may-benefit-card__title">{b.title}</h3>
                <p className="may-benefit-card__desc">{b.desc}</p>
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
              <h2 className="may-title">¿Qué productos están disponibles?</h2>
              <p className="may-available__text">
                No todos los productos de la tienda están habilitados para venta mayorista.
                Para conocer el catálogo actualizado, contactanos y te enviamos las opciones disponibles.
              </p>
              <div className="may-available__actions">
                <button className="btn btn-olive" onClick={scrollToForm}>
                  Consultar productos disponibles
                </button>
                <Link to="/catalogo" className="btn btn-outline">
                  Ver catálogo →
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
            <h2 className="may-title">Cómo comprar al por mayor</h2>
            <p className="may-sub">Simple y rápido, en cuatro pasos.</p>
          </div>
          <div className="may-steps__grid">
            {STEPS.map((s, i) => (
              <div key={i} className="may-step">
                <div className="may-step__num">{s.num}</div>
                <h3 className="may-step__title">{s.title}</h3>
                <p className="may-step__desc">{s.desc}</p>
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
              <h2 className="may-title">Solicitá información mayorista</h2>
              <p className="may-sub">
                Dejanos tus datos y te contactamos para enviarte el catálogo y las condiciones.
              </p>
            </div>

            <form className="may-form" onSubmit={handleSubmit} noValidate>
              <div className="may-form__grid">

                <div className={`may-field${errors.nombre ? ' may-field--error' : ''}`}>
                  <label className="may-label">Nombre y apellido <span>*</span></label>
                  <input
                    className="may-input"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handle}
                    placeholder="Tu nombre completo"
                  />
                  {errors.nombre && <p className="may-error">{errors.nombre}</p>}
                </div>

                <div className="may-field">
                  <label className="may-label">Emprendimiento / Razón social</label>
                  <input
                    className="may-input"
                    type="text"
                    name="emprendimiento"
                    value={form.emprendimiento}
                    onChange={handle}
                    placeholder="Nombre de tu negocio (opcional)"
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
                    placeholder="XX-XXXXXXXX-X (opcional)"
                  />
                </div>

                <div className="may-field">
                  <label className="may-label">Domicilio comercial</label>
                  <input
                    className="may-input"
                    type="text"
                    name="domicilio"
                    value={form.domicilio}
                    onChange={handle}
                    placeholder="Dirección (opcional)"
                  />
                </div>

                <div className={`may-field${errors.telefono ? ' may-field--error' : ''}`}>
                  <label className="may-label">Teléfono / WhatsApp <span>*</span></label>
                  <input
                    className="may-input"
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handle}
                    placeholder="+54 9 11 XXXX-XXXX"
                  />
                  {errors.telefono && <p className="may-error">{errors.telefono}</p>}
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
                  {errors.email && <p className="may-error">{errors.email}</p>}
                </div>

                <div className={`may-field may-field--full${errors.producto ? ' may-field--error' : ''}`}>
                  <label className="may-label">Producto o categoría de interés <span>*</span></label>
                  <input
                    className="may-input"
                    type="text"
                    name="producto"
                    value={form.producto}
                    onChange={handle}
                    placeholder="Ej: Macetas, mates, llaveros..."
                  />
                  {errors.producto && <p className="may-error">{errors.producto}</p>}
                </div>

                <div className="may-field may-field--full">
                  <label className="may-label">Cantidad estimada</label>
                  <input
                    className="may-input"
                    type="text"
                    name="cantidad"
                    value={form.cantidad}
                    onChange={handle}
                    placeholder="Ej: 50 unidades (opcional)"
                  />
                </div>

                <div className="may-field may-field--full">
                  <label className="may-label">Mensaje adicional</label>
                  <textarea
                    className="may-input may-textarea"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handle}
                    placeholder="Contanos más sobre lo que necesitás..."
                    rows={4}
                  />
                </div>

              </div>

              <div className="may-form__submit">
                <button type="submit" className="btn btn-primary may-submit-btn">
                  Enviar consulta mayorista <ArrowRight size={18} />
                </button>
                <p className="may-form__note">
                  * Campos obligatorios. Tu consulta se enviará por WhatsApp.
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
