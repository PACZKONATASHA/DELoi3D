// Genera las imagenes de la linea de iluminacion que se publican en public/.
//
//   npm run imagenes
//
// Las fotos originales viven en assets-origen/iluminacion/<linea>/ (fuera del
// repo, ver .gitignore) y son PNG de 2 MB cada una. Este script hace UN solo
// archivo por foto: el mismo tamaño que la original, pero en JPG, que pesa
// como diez veces menos y se ve igual. Nada de copias en varios anchos.
//
// Convencion de nombres en public/:
//   <linea>-<color>.jpg    foto del producto en ese color
//   <linea>-colores.jpg    foto grupal de la linea
//   swatch-<color>.jpg     captura del color, recortada al cuadrado
//
// Al final imprime el color promedio de cada swatch: ese es el hex que va en
// src/data/products.js como color de respaldo del circulito.
import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ORIGEN = 'assets-origen/iluminacion';
const DESTINO = 'public/iluminacion';
const LADO_SWATCH = 128;
const LINEAS = ['aire', 'mar', 'tierra'];

// Misma foto, mismo tamaño, solo comprimida.
async function generarFoto(origen, destino) {
  const { width, height, size } = await sharp(origen)
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(destino);
  return `${width}x${height}, ${Math.round(size / 1024)} kB`;
}

// Recorta el centro cuadrado del swatch y devuelve su color promedio en hex,
// para usarlo de respaldo mientras la captura carga.
async function generarSwatch(origen, destino) {
  await sharp(origen)
    .resize(LADO_SWATCH, LADO_SWATCH, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(destino);

  const { channels } = await sharp(destino).stats();
  const hex = channels
    .slice(0, 3)
    .map(c => Math.round(c.mean).toString(16).padStart(2, '0'))
    .join('');
  return `#${hex.toUpperCase()}`;
}

const hexPorColor = {};

for (const linea of LINEAS) {
  const dirOrigen = path.join(ORIGEN, linea);
  const dirDestino = path.join(DESTINO, linea);
  await mkdir(dirDestino, { recursive: true });

  for (const archivo of await readdir(dirOrigen)) {
    const nombre = path.parse(archivo).name;
    const origen = path.join(dirOrigen, archivo);
    const destino = path.join(dirDestino, `${nombre}.jpg`);

    if (nombre.startsWith('swatch-')) {
      hexPorColor[`${linea}/${nombre.replace('swatch-', '')}`] = await generarSwatch(origen, destino);
      console.log(`swatch  ${linea}/${nombre}`);
      continue;
    }

    console.log(`foto    ${linea}/${nombre}  ${await generarFoto(origen, destino)}`);
  }
}

await writeFile(
  path.join('scripts', 'colores-detectados.json'),
  `${JSON.stringify(hexPorColor, null, 2)}\n`,
);
console.log('\nColor promedio de cada swatch:');
for (const [clave, hex] of Object.entries(hexPorColor)) console.log(`  ${clave.padEnd(18)} ${hex}`);
