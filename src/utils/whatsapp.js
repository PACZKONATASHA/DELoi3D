// Unico canal de contacto de la tienda: no hay carrito, todo se consulta por WhatsApp.
export const WHATSAPP_NUMBER = '541161307110';

// Arma el link de WhatsApp con el mensaje ya escrito.
export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Consulta por un producto puntual, con el color elegido si lo hay.
export function productWhatsappLink(product, color) {
  const colorLine = color ? ` en color ${color.name}` : '';
  return whatsappLink(
    `Hola! Quiero consultar por ${product.name}${colorLine}. ¿Me pasás precio y disponibilidad?`
  );
}
