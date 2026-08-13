// Fotos propias servidas en varios anchos (ver public/lamparas/).
// Las imagenes se referencian por su variante -960 y desde ahi se arma el srcSet.
const WIDTHS = [480, 960, 1600];
const RESPONSIVE = /^(\/lamparas\/[a-z0-9-]+)-960\.jpg$/;

// Devuelve el srcSet de una foto responsiva, o undefined si la imagen
// es externa (Unsplash) o de un solo tamaño: el <img> usa solo src.
export function srcSetFor(src) {
  const match = typeof src === 'string' ? RESPONSIVE.exec(src) : null;
  if (!match) return undefined;
  return WIDTHS.map(w => `${match[1]}-${w}.jpg ${w}w`).join(', ');
}

// Anchos aproximados de cada lugar donde se muestra una foto de producto.
export const IMG_SIZES = {
  card: '(max-width: 600px) 92vw, (max-width: 1024px) 45vw, 320px',
  detail: '(max-width: 900px) 92vw, 560px',
  thumb: '90px',
};
