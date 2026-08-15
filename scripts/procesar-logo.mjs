// Prepara el logo del cliente para la barra de arriba y para el pie.
//
//   npm run imagenes:logo
//
// El original (assets-origen/logo/nuevo-logo.png) es un PNG de 2172x724 y 330
// kB, mucho mas grande de lo que se muestra. Salen dos versiones en webp:
//
//   logo.webp        el original, achicado. Va en la barra de arriba, que es
//                    blanca, asi que el texto negro se lee bien.
//   logo-claro.webp  el mismo logo con el texto en blanco, para el pie, que
//                    tiene fondo negro. El cubo celeste queda igual: solo se
//                    invierten los pixeles sin color (el negro y sus bordes
//                    grises), no los de la marca.
import sharp from 'sharp';

const ORIGEN = 'assets-origen/logo/nuevo-logo.png';
const ANCHO = 640;          // se muestra a ~180px, alcanza y sobra en retina
const CROMA_MINIMA = 40;    // arriba de esto el pixel tiene color propio

const base = sharp(ORIGEN).resize({ width: ANCHO }).ensureAlpha();

const { size } = await base.clone().webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile('public/logo.webp');
console.log(`${ORIGEN} -> public/logo.webp  ${Math.round(size / 1024)} kB`);

// Version clara: se invierte el brillo solo donde el pixel es gris (el texto
// negro y su antialias). Lo que tiene color, como el cubo, no se toca.
const { data, info } = await base.clone().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const croma = Math.max(r, g, b) - Math.min(r, g, b);
  if (croma >= CROMA_MINIMA) continue;
  data[i] = 255 - r;
  data[i + 1] = 255 - g;
  data[i + 2] = 255 - b;
}

const claro = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile('public/logo-claro.webp');
console.log(`${ORIGEN} -> public/logo-claro.webp  ${Math.round(claro.size / 1024)} kB`);
