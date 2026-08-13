// Las fotos propias (public/iluminacion/, generadas por
// scripts/procesar-iluminacion.mjs) son un archivo por foto: no hay copias en
// varios anchos, asi que no llevan srcSet y el <img> usa solo src. Se adaptan
// igual a la pantalla porque el CSS las escala al ancho del contenedor.

// Unsplash sirve cualquier ancho con el parametro ?w=, asi que ahi si conviene
// armar un srcSet en vez de bajar siempre la misma foto.
const UNSPLASH = /^https:\/\/images\.unsplash\.com\/.+[?&]w=\d+/;
const ANCHOS_UNSPLASH = [480, 960, 1600];

// Devuelve el srcSet de una foto, o undefined si es de un solo tamaño.
export function srcSetFor(src) {
  if (typeof src !== 'string' || !UNSPLASH.test(src)) return undefined;

  return ANCHOS_UNSPLASH
    .map(w => `${src.replace(/([?&]w=)\d+/, `$1${w}`)} ${w}w`)
    .join(', ');
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
