// Fotos propias servidas en varios anchos (ver public/lamparas/).
// Las imagenes se referencian por su variante -960 y desde ahi se arma el srcSet.
const WIDTHS = [480, 960, 1600];
const RESPONSIVE = /^(\/lamparas\/[a-z0-9-]+)-960\.jpg$/;

// Unsplash sirve cualquier ancho con el parametro ?w=, asi que tambien
// puede armar un srcSet en vez de bajar siempre la misma foto.
const UNSPLASH = /^https:\/\/images\.unsplash\.com\/.+[?&]w=\d+/;

// Devuelve el srcSet de una foto, o undefined si es de un solo tamaño:
// en ese caso el <img> usa solo src.
export function srcSetFor(src) {
  if (typeof src !== 'string') return undefined;

  const propia = RESPONSIVE.exec(src);
  if (propia) {
    return WIDTHS.map(w => `${propia[1]}-${w}.jpg ${w}w`).join(', ');
  }

  if (UNSPLASH.test(src)) {
    return WIDTHS.map(w => `${src.replace(/([?&]w=)\d+/, `$1${w}`)} ${w}w`).join(', ');
  }

  return undefined;
}

// Anchos aproximados de cada lugar donde se muestra una foto.
// En celular casi todo ocupa media pantalla (grillas de 2 columnas).
export const IMG_SIZES = {
  card: '(max-width: 600px) 46vw, (max-width: 1024px) 45vw, 320px',
  detail: '(max-width: 900px) 92vw, 560px',
  thumb: '90px',
  category: '(max-width: 600px) 45vw, 220px',
  gallery: '(max-width: 600px) 46vw, (max-width: 1024px) 30vw, 300px',
  // Destacados: la foto ocupa todo el ancho del contenedor.
  showcase: '(max-width: 1280px) 100vw, 1216px',
};
