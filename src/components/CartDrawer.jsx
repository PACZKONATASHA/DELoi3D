import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, count, openWhatsApp, clearCart, shippingMethod, setShippingMethod, paymentMethod, setPaymentMethod } = useCart();

  // Bloquear scroll de la página cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    openWhatsApp();
    clearCart();
    setIsOpen(false);
  };

  const handleGoToCatalog = () => {
    setIsOpen(false);
    navigate('/catalogo');
  };

  return (
    <>
      <div className="overlay" onClick={() => setIsOpen(false)} />
      <aside className="cart-drawer">
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-wrap">
            <ShoppingBag size={20} />
            <h2 className="cart-drawer__title">{t('tuCarrito')}</h2>
            {count > 0 && <span className="cart-drawer__count">{count}</span>}
          </div>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label={t('cerrar')}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={56} strokeWidth={1} className="cart-empty__icon" />
              <p className="cart-empty__text">{t('tuCarritoEstaVacio')}</p>
              <button className="btn btn-primary" onClick={handleGoToCatalog}>
                {t('verCatalogo')}
              </button>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.images[0]} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <h4 className="cart-item__name">{item.name}</h4>
                    <p className="cart-item__price price">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </p>
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >−</button>
                      <span>{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={t('eliminar')}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            {/* Envío */}
            <div className="cart-drawer__section">
              <label className="cart-drawer__label">{t('envios')}</label>
              <div className="cart-drawer__options">
                <label className="cart-drawer__option">
                  <input
                    type="radio"
                    name="shipping"
                    value="Andreani"
                    checked={shippingMethod === 'Andreani'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <span>Andreani</span>
                </label>
                <label className="cart-drawer__option">
                  <input
                    type="radio"
                    name="shipping"
                    value="A acordar (por zona)"
                    checked={shippingMethod === 'A acordar (por zona)'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <span>A acordar (por zona)</span>
                </label>
              </div>
            </div>

            {/* Pago */}
            <div className="cart-drawer__section">
              <label className="cart-drawer__label">{t('formaPago')}</label>
              <div className="cart-drawer__options">
                <label className="cart-drawer__option">
                  <input
                    type="radio"
                    name="payment"
                    value="Transferencia bancaria"
                    checked={paymentMethod === 'Transferencia bancaria'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{t('transferenciaBancaria')}</span>
                </label>
                <label className="cart-drawer__option">
                  <input
                    type="radio"
                    name="payment"
                    value="Tarjeta de crédito"
                    checked={paymentMethod === 'Tarjeta de crédito'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{t('tarjetaCredito')}</span>
                </label>
                <label className="cart-drawer__option">
                  <input
                    type="radio"
                    name="payment"
                    value="Tarjeta de débito"
                    checked={paymentMethod === 'Tarjeta de débito'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{t('tarjetaDebito')}</span>
                </label>
              </div>
            </div>

            <div className="cart-total">
              <span>{t('total')}</span>
              <span className="price cart-total__amount">${total.toLocaleString('es-AR')}</span>
            </div>

            <div className="cart-drawer__whatsapp-notice">
              <MessageCircle size={16} />
              <p>{t('notaWhatsApp')}</p>
            </div>

            <button className="btn cart-drawer__checkout" onClick={handleCheckout}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('confirmarPorWhatsApp')}
            </button>

            <button className="cart-drawer__clear" onClick={clearCart}>
              {t('vaciarCarrito')}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
