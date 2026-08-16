# DELoi3D

Tienda de productos impresos en 3D, con venta mayorista. Es un sitio de una sola
página (React + Vite) sin backend: las consultas salen por WhatsApp.

## Cómo se levanta

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # deja el sitio listo en dist/
npm run preview    # sirve dist/ para probarlo como en producción
npm run lint
```

## Dónde está cada cosa

```
src/
  components/   Piezas que se repiten en varias páginas (barra, pie, hero, visor 360…)
  pages/        Una carpeta por ruta: Home, Catalog, ProductDetail, Gallery, Mayoristas
  data/         products.js: el catálogo entero y las fotos de la galería
  i18n/         translations.js: todos los textos, en español, inglés y chino
  context/      LanguageContext: el idioma elegido, guardado en el navegador
  utils/        Armado de links de WhatsApp y medidas de las fotos
```

Cada componente y cada página llevan su `.css` al lado, con el mismo nombre.
Los estilos comunes (colores, botones, cards) están en `src/index.css`.

## Las imágenes

`public/` se publica tal cual, así que la ruta del archivo es la ruta de la web
(`public/marca/logo.webp` se pide como `/marca/logo.webp`).

```
public/
  marca/        Logos: logo.webp para fondo claro, logo-claro.webp para el pie negro
  hero/         Las tres lámparas que rotan en la portada
  productos/    Fotos del catálogo, por rubro: iluminacion/, decoracion/, jardineria/
  ocasiones/    Navidad y Pascua, para la sección de ocasiones del inicio
  360/          Series numeradas (01.jpg … 36.jpg) para el visor que gira la pieza
  favicon.svg
```

Las fotos de producto se procesan con los scripts de `scripts/`, que las toman de
`assets-origen/` (queda fuera del repo, es la carpeta con los originales pesados):

```bash
npm run imagenes           # línea de iluminación: fotos + círculos de color
npm run imagenes:lampara   # las tres lámparas de la portada
npm run imagenes:logo      # las dos versiones del logo
npm run imagenes:momentos  # navidad y pascua
```

## Los textos

Todo lo que se lee en pantalla sale de `src/i18n/translations.js`, nunca escrito
a mano dentro de un componente. Tres reglas para no romperlo:

- Los tres idiomas llevan las mismas claves y en el mismo orden.
- Una clave se escribe una sola vez: si se repite, JavaScript se queda con la
  última y la primera queda muerta sin avisar (`npm run lint` lo detecta).
- Las secciones del archivo siguen el recorrido de la página, de arriba abajo.

## El catálogo

`src/data/products.js` es la única fuente: de ahí salen el catálogo, los
destacados del inicio, el buscador de la barra y la galería. Cada producto lleva
sus colores con el círculo de material (`swatch`), y opcionalmente `turntable`
para mostrar la vuelta de 360°.
