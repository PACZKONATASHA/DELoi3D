// Prepara las fotos del hero.
//
//   npm run imagenes:lampara
//
// Son dos cosas distintas:
//
// 1. El primer slide, la lampara que se prende: dos fotos que hay que dejar
//    perfectamente encimadas (ver mas abajo).
// 2. Los otros tres slides: fotos de lamparas que solo hay que achicar y pasar
//    a webp, porque vienen en PNG de dos megas cada una.
//
// Los originales de los tres slides viven en assets-origen/hero/ (fuera del
// repo, ver .gitignore), igual que las fotos de la linea de iluminacion.
//
// Las originales (public/lampara-1.png y lampara-2.png) vienen con distinto
// encuadre y distinto tamaño de lienzo: 1536x1024 una y 1473x1068 la otra. Si
// se superponen tal cual, la lampara cambia de tamaño y de lugar al prenderse
// y se nota el salto. Este script recorta cada foto al borde real de la
// lampara (por el canal alfa), las escala al mismo ancho y las centra en un
// lienzo identico, asi las dos quedan pixel a pixel una arriba de la otra.
// De paso salen en webp, que pesa como diez veces menos que el PNG original.
import sharp from 'sharp';

const ORIGENES = [
  { origen: 'public/lampara-1.png', destino: 'public/hero-lampara-apagada.webp' },
  { origen: 'public/lampara-2.png', destino: 'public/hero-lampara-encendida.webp' },
];

// Los otros tres slides: mismo orden que en HeroSlider.jsx.
const SLIDES = [
  { origen: 'assets-origen/hero/lampara-1.png', destino: 'public/hero-lampara-1.webp' },
  { origen: 'assets-origen/hero/lampara-2.png', destino: 'public/hero-lampara-2.webp' },
  { origen: 'assets-origen/hero/lampara-3.png', destino: 'public/hero-lampara-3.webp' },
];

const ANCHO_SLIDE = 1400;   // de sobra: el panel del hero no pasa de 900px

const ANCHO_LAMPARA = 1000;  // ancho final de la lampara en las dos fotos
const MARGEN = 60;           // aire alrededor, para que el resplandor no se corte
const ALFA_MINIMA = 16;      // debajo de esto es fondo, no lampara

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

// Primera pasada: recortar y escalar las dos al mismo ancho.
const recortadas = [];
for (const { origen, destino } of ORIGENES) {
  const caja = await recuadro(origen);
  const buffer = await sharp(origen)
    .extract(caja)
    .resize({ width: ANCHO_LAMPARA })
    .png()
    .toBuffer();
  const { height } = await sharp(buffer).metadata();
  recortadas.push({ origen, destino, buffer, height });
}

// Segunda pasada: un lienzo unico, del alto de la mas alta, con las dos
// centradas adentro.
const lienzo = {
  width: ANCHO_LAMPARA + MARGEN * 2,
  height: Math.max(...recortadas.map(r => r.height)) + MARGEN * 2,
};

for (const { origen, destino, buffer, height } of recortadas) {
  const { size } = await sharp({
    create: { ...lienzo, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{
      input: buffer,
      left: MARGEN,
      top: Math.round((lienzo.height - height) / 2),
    }])
    .webp({ quality: 90, alphaQuality: 90, effort: 6 })
    .toFile(destino);

  console.log(
    `${origen} -> ${destino}  ${lienzo.width}x${lienzo.height}, ${Math.round(size / 1024)} kB`
  );
}

// Los tres slides sueltos: se dejan tal cual estan, solo mas chicos y en webp.
// No se recortan ni se alinean entre si porque no se superponen: entra una,
// sale la otra.
for (const { origen, destino } of SLIDES) {
  const { width, height, size } = await sharp(origen)
    .resize({ width: ANCHO_SLIDE, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 90, effort: 6 })
    .toFile(destino);

  console.log(`${origen} -> ${destino}  ${width}x${height}, ${Math.round(size / 1024)} kB`);
}
