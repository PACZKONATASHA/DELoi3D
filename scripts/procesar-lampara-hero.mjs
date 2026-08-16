// Prepara las fotos de las lamparas del hero.
//
//   npm run imagenes:lampara
//
// Los originales viven en assets-origen/hero/ (fuera del repo, ver
// .gitignore), igual que las fotos de la linea de iluminacion, y son PNG de
// dos megas cada uno.
//
// El problema que resuelve: cada foto viene con un encuadre distinto. En una
// la lampara ocupa el 75% del ancho del archivo y en otra el 98%, asi que
// puestas en el slider una se veia mucho mas grande que la otra aunque las
// lamparas midan parecido. Por eso no alcanza con achicarlas: hay que
// recortar cada una al borde real de la lampara (por el canal alfa), llevarlas
// todas al mismo alto y centrarlas en un lienzo identico. Recien ahi las tres
// se ven del mismo tamaño. De paso salen en webp, que pesa como diez veces
// menos que el PNG.
import sharp from 'sharp';

// Mismo orden que en HeroSlider.jsx.
const SLIDES = [
  { origen: 'assets-origen/hero/lampara-1.png', destino: 'public/hero/lampara-1.webp' },
  { origen: 'assets-origen/hero/lampara-2.png', destino: 'public/hero/lampara-2.webp' },
  { origen: 'assets-origen/hero/lampara-3.png', destino: 'public/hero/lampara-3.webp' },
];

const ALTO_LAMPARA = 900;              // alto final de la lampara en las tres
const LIENZO = { width: 1200, height: 1000 };  // el mismo para las tres
const ALFA_MINIMA = 16;                // debajo de esto es fondo, no lampara

// Borde real del objeto: la primera y la ultima fila/columna con algo opaco.
async function recuadro(origen) {
  const img = sharp(origen);
  const { width, height } = await img.metadata();
  const data = await img.ensureAlpha().raw().toBuffer();

  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] <= ALFA_MINIMA) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }

  if (x1 < 0) throw new Error(`${origen}: la foto es toda transparente`);
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

for (const { origen, destino } of SLIDES) {
  const caja = await recuadro(origen);

  // La lampara sola, recortada y llevada al alto comun. El ancho sale de la
  // forma de cada una: una lampara mas panzona queda mas ancha, como
  // corresponde.
  const lampara = await sharp(origen)
    .extract(caja)
    .resize({ height: ALTO_LAMPARA })
    .png()
    .toBuffer();
  const { width } = await sharp(lampara).metadata();

  if (width > LIENZO.width) {
    throw new Error(`${origen}: la lampara (${width}px) no entra en el lienzo`);
  }

  const { size } = await sharp({
    create: { ...LIENZO, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{
      input: lampara,
      left: Math.round((LIENZO.width - width) / 2),
      top: Math.round((LIENZO.height - ALTO_LAMPARA) / 2),
    }])
    .webp({ quality: 88, alphaQuality: 90, effort: 6 })
    .toFile(destino);

  console.log(
    `${origen} -> ${destino}  lampara ${width}x${ALTO_LAMPARA} en ` +
    `${LIENZO.width}x${LIENZO.height}, ${Math.round(size / 1024)} kB`
  );
}
