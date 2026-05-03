import { useState } from 'react';
import { ShoppingBag, CreditCard, Truck, Gift, Tag, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ComoComprar.css';

export default function ComoComprar() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Elegí tu producto',
      desc: 'Hacé clic en "Agregar al carrito"',
      icon: ShoppingBag
    },
    {
      number: 2,
      title: 'Seguí comprando o iniciá',
      desc: 'Agregá más productos o hacé clic en "Iniciar compra"',
      icon: CheckCircle
    },
    {
      number: 3,
      title: 'Completá tus datos',
      desc: 'Ingresá tu información de contacto',
      icon: CreditCard
    },
    {
      number: 4,
      title: 'Dirección de entrega',
      desc: 'Ingresá dónde querés recibir el producto',
      icon: Truck
    },
    {
      number: 5,
      title: 'Seleccioná el envío',
      desc: 'Elegí el medio de envío que prefieras',
      icon: Truck
    },
    {
      number: 6,
      title: 'Elegí el medio de pago',
      desc: 'Seleccioná cómo querés pagar',
      icon: CreditCard
    },
    {
      number: 7,
      title: 'Confirmá tu compra',
      desc: 'Revisá todo y confirmá',
      icon: CheckCircle
    },
    {
      number: 8,
      title: 'Recibí tu pedido',
      desc: 'Te enviamos el comprobante y tu producto',
      icon: Gift
    }
  ];

  return (
    <div className="como-comprar">
      {/* Hero */}
      <section className="como-comprar__hero">
        <div className="container">
          <h1 className="como-comprar__title">¿Cómo Comprar?</h1>
          <p className="como-comprar__subtitle">
            Tu compra en 8 pasos simples y rápidos
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="como-comprar__steps">
        <div className="container">
          <div className="steps-grid">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.number;
              
              return (
                <div
                  key={step.number}
                  className={`step-card ${isActive ? 'step-card--active' : ''}`}
                  onMouseEnter={() => setActiveStep(step.number)}
                >
                  <div className="step-card__number">{step.number}</div>
                  <div className="step-card__icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="step-card__title">{step.title}</h3>
                  <p className="step-card__desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promociones */}
      <section className="como-comprar__promos">
        <div className="container">
          <h2 className="section-title">Promociones Vigentes</h2>
          
          {/* Cuotas sin interés */}
          <div className="promo-card promo-card--featured">
            <div className="promo-card__badge">¡Imperdible!</div>
            <div className="promo-card__content">
              <h3 className="promo-card__title">3 y 6 cuotas sin interés</h3>
              <p className="promo-card__text">
                Comprá hoy y pagá en 3 o 6 cuotas sin interés con tu tarjeta de crédito. 
                ¡Llevate todo lo que querés sin preocuparte por los intereses!
              </p>
              
              <div className="promo-card__conditions">
                <h4>Condiciones:</h4>
                <ul>
                  <li>Promoción aplica para 3 y 6 cuotas sin interés</li>
                  <li>Cuota mínima de $50.000</li>
                </ul>
              </div>

              <div className="promo-card__example">
                <h4>Ejemplo:</h4>
                <div className="example-items">
                  <div className="example-item">
                    <div className="example-amount">$150.000</div>
                    <div className="example-arrow">→</div>
                    <div className="example-result">3 cuotas de $50.000</div>
                  </div>
                  <div className="example-item">
                    <div className="example-amount">$300.000</div>
                    <div className="example-arrow">→</div>
                    <div className="example-result">6 cuotas de $50.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lanzamiento */}
          <div className="promo-card promo-card--secondary">
            <div className="promo-card__badge">Lanzamiento</div>
            <div className="promo-card__content">
              <h3 className="promo-card__title">20% de DESCUENTO en TODOS los productos</h3>
              <p className="promo-card__text">
                ¡Estamos de fiesta! Para celebrar el lanzamiento de nuestra tienda online, 
                te traemos una promoción imperdible.
              </p>
              
              <div className="promo-card__conditions">
                <h4>Condiciones:</h4>
                <ul>
                  <li>Válida desde el 11/11/2024 hasta el 31/11/2024</li>
                  <li>Compra mínima de $20.000</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Envío gratis */}
          <div className="promo-card promo-card--shipping">
            <div className="promo-card__badge">Envío Gratis</div>
            <div className="promo-card__content">
              <h3 className="promo-card__title">Envío GRATIS en compras superiores a $50.000</h3>
              <p className="promo-card__text">
                ¡Aprovechá esta oferta exclusiva y recibí tus compras sin costo!
              </p>
              
              <div className="promo-card__conditions">
                <h4>Condiciones:</h4>
                <ul>
                  <li>Solo aplicable para entregas en Lomas de Zamora y Almirante Brown</li>
                  <li>No dejes pasar esta oportunidad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="como-comprar__cta">
        <div className="container">
          <h2>¿Listo para empezar?</h2>
          <p>Explorá nuestro catálogo y encontrá tu próximo producto favorito</p>
          <a href="/catalogo" className="btn btn-primary btn-lg">
            Ir al catálogo
          </a>
        </div>
      </section>
    </div>
  );
}
