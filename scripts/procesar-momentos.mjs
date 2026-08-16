// Prepara las fotos de la seccion "Para cada momento especial".
//
//   npm run imagenes:momentos
//
// Los originales viven en assets-origen/momentos/<ocasion>/ (fuera del repo,
// ver .gitignore) y son PNG de kilo y medio cada uno. Salen en webp y con el
// ancho que realmente se muestra en la card, que es una octava parte del peso.
//
// El nombre del archivo de salida es el orden en que aparecen en la grilla:
// 1.webp, 2.webp, etc. Los originales pueden llamarse como sea, se ordenan
// alfabeticamente.
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const ORIGEN = 'assets-origen/momentos';
const DESTINO = 'public/ocasiones';
const ANCHO = 800;   // la card mide ~300px, con esto sobra para pantallas retina

for (const ocasion of await readdir(ORIGEN)) {
  const dirOrigen = path.join(ORIGEN, ocasion);
  const dirDestino = path.join(DESTINO, ocasion);
  await mkdir(dirDestino, { recursive: true });

  const archivos = (await readdir(dirOrigen)).sort();
  for (const [i, archivo] of archivos.entries()) {
    const destino = path.join(dirDestino, `${i + 1}.webp`);
    const { width, height, size } = await sharp(path.join(dirOrigen, archivo))
      .resize({ width: ANCHO, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 90, effort: 6 })
      .toFile(destino);

    console.log(
      `${ocasion}/${archivo} -> ${destino}  ${width}x${height}, ${Math.round(size / 1024)} kB`
    );
  }
}
