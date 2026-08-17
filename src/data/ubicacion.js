// Datos del local. Los usan el mapa de la pagina de contacto y el pie:
// si el cliente los corrige, se cambian SOLO aca y los dos lados acompañan.

// El local fisico se llama Naturalma; DELoi3D es la marca de las piezas.
// El nombre va en la busqueda del mapa a proposito: Google tiene la ficha
// del comercio y con eso el pin cae sobre la puerta y no sobre la cuadra.
export const NEGOCIO = 'Naturalma';

// Tal cual figura en la ficha de Google Maps del local: se muestra en la
// pagina y ademas es lo que se le manda a la busqueda, asi que el texto que
// lee la gente y el pin del mapa no se pueden separar.
//
// La localidad y el CP no son adorno. Antes decia solo "Buenos Aires" y por
// eso el mapa erraba: existe otra "Tte. Gral. Eustaquio Frias" en Villa
// Crespo (CABA) y Google resolvia para ese lado, a mas de 20 km. Ojo tambien
// con Turdera: la calle cruza las dos localidades del partido de Lomas de
// Zamora, pero la ficha esta catalogada en Llavallol y con "Turdera" el pin
// se corre.
export const DIRECCION = 'Gral. Frías 3253, C1836 Llavallol, Provincia de Buenos Aires';

// Lo que se le manda a Google. Nombre + direccion + pais.
const CONSULTA = encodeURIComponent(`${NEGOCIO}, ${DIRECCION}, Argentina`);

// El iframe anterior tenia pegado a mano un `pb=!1m18!...` con coordenadas
// (-58.38, -34.60, el centro de Buenos Aires) y un place id de relleno, sin
// ninguna relacion con la direccion de al lado: por eso el mapa mostraba un
// lugar y el boton llevaba a otro. Las dos URLs de abajo salen de la MISMA
// constante, asi que no se pueden volver a separar, y Google resuelve la
// busqueda en el momento: sin API key y sin coordenadas que queden viejas.

// Idioma del mapa segun el que este elegido en la pagina.
const HL = { es: 'es', en: 'en', zh: 'zh-CN' };

// `output=embed` es la unica forma de incrustar Google Maps sin API key.
export function mapsEmbedUrl(language = 'es') {
  const hl = HL[language] || HL.es;
  return `https://www.google.com/maps?q=${CONSULTA}&z=17&hl=${hl}&output=embed`;
}

// Esquema oficial de Google para abrir la busqueda en la app o en el navegador.
export function mapsLinkUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${CONSULTA}`;
}
