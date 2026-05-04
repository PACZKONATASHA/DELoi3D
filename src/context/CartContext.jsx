import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(i => i.id === productId ? { ...i, quantity } : i)
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const buildWhatsAppMessage = () => {
    const lines = items.map(
      i => `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toLocaleString('es-AR')}`
    );
    const totalLine = `\n*Total: $${total.toLocaleString('es-AR')}*`;
    const shippingLine = shippingMethod ? `\n*Envío: ${shippingMethod}*` : '';
    const paymentLine = paymentMethod ? `\n*Forma de pago: ${paymentMethod}*` : '';
    const addressLine = deliveryAddress ? `\n*Dirección de entrega: ${deliveryAddress}*` : '';
    return encodeURIComponent(
      `Hola! Quiero confirmar mi pedido:\n\n${lines.join('\n')}${totalLine}${shippingLine}${paymentLine}${addressLine}\n\n¿Podés confirmarme disponibilidad? Gracias!`
    );
  };

  const openWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/541161307110?text=${msg}`, '_blank');
  };

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      total, count, isOpen, setIsOpen, openWhatsApp,
      shippingMethod, setShippingMethod, paymentMethod, setPaymentMethod,
      deliveryAddress, setDeliveryAddress,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
