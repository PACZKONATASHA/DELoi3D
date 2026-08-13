// Orden del catalogo: Iluminacion -> Decoracion para el hogar -> Jardineria.
// La lista plana `categories` se usa en el carrusel del home y en las solapas
// de la galeria; `categoryGroups` arma el menu lateral del catalogo.
export const categories = [
  { id: 'todos', name: 'Todos los productos', slug: 'todos' },
  // Iluminacion
  { id: 'aire', name: 'Aire', slug: 'aire' },
  { id: 'mar', name: 'Mar', slug: 'mar' },
  { id: 'tierra', name: 'Tierra', slug: 'tierra' },
  // Decoracion para el hogar
  { id: 'bandejas', name: 'Bandejas', slug: 'bandejas' },
  { id: 'floreros', name: 'Floreros', slug: 'floreros' },
  { id: 'porta-difusores', name: 'Porta Difusores', slug: 'porta-difusores' },
  // Jardineria
  { id: 'macetas', name: 'Macetas', slug: 'macetas' },
  { id: 'tutores', name: 'Tutores', slug: 'tutores' },
];

export const categoryGroups = [
  {
    id: 'iluminacion',
    name: 'Iluminación',
    subcategories: [
      // Agua: descomentar cuando lleguen las fotos reales de la linea.
      // { id: 'agua', name: 'Agua', slug: 'agua' },
      { id: 'aire', name: 'Aire', slug: 'aire' },
      { id: 'mar', name: 'Mar', slug: 'mar' },
      { id: 'tierra', name: 'Tierra', slug: 'tierra' },
    ],
  },
  {
    id: 'decoracion',
    name: 'Decoración para el hogar',
    subcategories: [
      { id: 'bandejas', name: 'Bandejas', slug: 'bandejas' },
      { id: 'floreros', name: 'Floreros', slug: 'floreros' },
      { id: 'porta-difusores', name: 'Porta Difusores', slug: 'porta-difusores' },
    ],
  },
  {
    id: 'jardineria',
    name: 'Jardinería',
    subcategories: [
      { id: 'macetas', name: 'Macetas', slug: 'macetas' },
      { id: 'tutores', name: 'Tutores', slug: 'tutores' },
    ],
  },
];

// Grupos de la linea de iluminacion, en el orden en que se muestran en el home.
export const lightingGroups = [
  // Agua: descomentar junto con la subcategoria y sus productos.
  // { id: 'agua', name: 'Agua', tagline: 'Transparencias y celestes, luz fresca y serena.' },
  { id: 'aire', name: 'Aire', tagline: 'Rosas, violetas y verdes translúcidos que proyectan la luz.' },
  { id: 'mar', name: 'Mar', tagline: 'Azules, grises y plata para una luz fría y profunda.' },
  { id: 'tierra', name: 'Tierra', tagline: 'Marrones, cobres y dorados para una luz cálida.' },
];

export const products = [
  // ── Iluminación ──────────────────────────────────────────────
  {
    id: 1,
    name: 'Lámpara Aire',
    slug: 'lampara-aire',
    category: 'aire',
    images: [
      '/iluminacion/aire/aire-1-960.jpg',
      '/iluminacion/aire/aire-2-960.jpg',
      '/iluminacion/aire/aire-3-960.jpg',
      '/iluminacion/aire/aire-4-960.jpg',
      '/iluminacion/aire/aire-5-960.jpg',
      '/iluminacion/aire/aire-6-960.jpg',
      '/iluminacion/aire/aire-7-960.jpg',
      '/iluminacion/aire/aire-8-960.jpg',
    ],
    description: 'Lámpara de mesa con pantalla cilíndrica calada de textura tramada. La luz atraviesa los miles de perforaciones y proyecta un manto de puntos sobre la mesa y la pared. Impresa en PLA Eco-Friendly, disponible en rosas, violetas y verdes translúcidos, con luz LED de bajo consumo.',
    size: '14 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Rosa', hex: '#E89BC4' },
      { name: 'Violeta', hex: '#9B5DE5' },
      { name: 'Púrpura', hex: '#6A3FA0' },
      { name: 'Verde agua', hex: '#7FBFB0' },
      { name: 'Blanco', hex: '#F5F5F5' },
    ],
  },
  {
    id: 2,
    name: 'Lámpara Mar',
    slug: 'lampara-mar',
    category: 'mar',
    images: [
      '/iluminacion/mar/mar-1-960.jpg',
      '/iluminacion/mar/mar-2-960.jpg',
      '/iluminacion/mar/mar-3-960.jpg',
      '/iluminacion/mar/mar-4-960.jpg',
      '/iluminacion/mar/mar-5-960.jpg',
      '/iluminacion/mar/mar-6-960.jpg',
    ],
    description: 'Lámpara de mesa con pantalla cónica estriada de estilo nórdico. Su plisado marca la luz y crea un juego de sombras suave sobre la mesa. Impresa en PLA Eco-Friendly, disponible en la gama azul, gris y neutros, con luz LED de bajo consumo.',
    size: '16 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Azul marino', hex: '#2F4A7A' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Gris', hex: '#7E8894' },
      { name: 'Plata', hex: '#B9BEC4' },
      { name: 'Blanco', hex: '#F5F5F5' },
    ],
  },
  {
    id: 3,
    name: 'Lámpara Tierra',
    slug: 'lampara-tierra',
    category: 'tierra',
    images: [
      '/iluminacion/tierra/tierra-1-960.jpg',
      '/iluminacion/tierra/tierra-2-960.jpg',
      '/iluminacion/tierra/tierra-3-960.jpg',
      '/iluminacion/tierra/tierra-4-960.jpg',
      '/iluminacion/tierra/tierra-5-960.jpg',
    ],
    description: 'Lámpara de mesa con pantalla esférica estriada de líneas suaves y cálidas. La textura acanalada filtra la luz y genera un ambiente íntimo, ideal para living, dormitorio o mesa de luz. Impresa en PLA Eco-Friendly, con base a tono y luz LED cálida.',
    size: '18 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Marrón tierra', hex: '#6B4636' },
      { name: 'Dorado', hex: '#C9A227' },
      { name: 'Cobre', hex: '#C97F5A' },
      { name: 'Blanco', hex: '#F5F5F5' },
    ],
  },

  // ── Decoración para el hogar ─────────────────────────────────
  {
    id: 10,
    name: 'Bandeja Oval',
    slug: 'bandeja-oval',
    category: 'bandejas',
    images: [
      '/decoracion/bandejas/bandeja-oval.webp',
    ],
    description: 'Bandeja oval de borde bajo, pensada como base para porta difusores, velas o perfumes. Ordena el conjunto y suma una terminación prolija sobre la mesa, el aparador o el baño. Disponible en tres medidas y en blanco, negro y arena.',
    size: '24 cm',
    material: 'Eco-Friendly PLA',
    featured: false,
    inStock: true,
    colors: [
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Arena', hex: '#E4DCCB' },
    ],
  },
  {
    id: 11,
    name: 'Bandeja Rectangular',
    slug: 'bandeja-rectangular',
    category: 'bandejas',
    images: [
      '/decoracion/bandejas/bandeja-rectangular.webp',
    ],
    description: 'Bandeja rectangular de líneas rectas y perfil bajo, ideal para mesas de luz y estantes angostos. Sirve para apoyar difusores con sus varillas, joyas o artículos de baño. Disponible en blanco, negro, gris y beige.',
    size: '26 cm',
    material: 'Eco-Friendly PLA',
    featured: false,
    inStock: true,
    colors: [
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Gris', hex: '#C9CCCE' },
      { name: 'Beige', hex: '#E8DFC8' },
    ],
  },
  {
    id: 12,
    name: 'Florero Espiga',
    slug: 'florero-espiga',
    category: 'floreros',
    images: [
      '/decoracion/floreros/florero-blanco.png',
    ],
    description: 'Florero de silueta redondeada con espigas y ondas en relieve. Un clásico de mesa que funciona con flores secas, ramas o solo como pieza decorativa. Impreso en PLA Eco-Friendly con terminación mate.',
    size: '22 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Hueso', hex: '#EDE6D6' },
      { name: 'Verde salvia', hex: '#8A9179' },
      { name: 'Negro', hex: '#1A1A1A' },
    ],
  },
  {
    id: 13,
    name: 'Florero Facetado',
    slug: 'florero-facetado',
    category: 'floreros',
    images: [
      '/decoracion/floreros/florero-negro.png',
    ],
    description: 'Florero de caras geométricas y boca angosta, de estilo moderno y presencia fuerte. Ideal para una sola flor o un ramo chico, sobre una bandeja o una mesa de entrada.',
    size: '16 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Gris', hex: '#9E9E9E' },
      { name: 'Terracota', hex: '#C0714A' },
    ],
  },
  {
    id: 14,
    name: 'Florero Onda',
    slug: 'florero-onda',
    category: 'floreros',
    images: [
      '/decoracion/floreros/florero-terracota.png',
    ],
    description: 'Florero alto de silueta ondulada y textura estriada en toda su altura. Sostiene bien los ramos de flores secas y aporta volumen a la mesa. Impreso en PLA Eco-Friendly, se destaca en terracota.',
    size: '25 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Terracota', hex: '#C0714A' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Verde oliva', hex: '#6B705C' },
    ],
  },
  {
    id: 15,
    name: 'Porta Difusor Espiral',
    slug: 'porta-difusor-espiral',
    category: 'porta-difusores',
    offer: 10,
    images: [
      '/decoracion/porta-difusores/cobre.webp',
      '/decoracion/porta-difusores/marmol.webp',
      '/decoracion/porta-difusores/negro.webp',
    ],
    description: 'Porta difusor con espiral marcada en toda la pieza, la textura que más juego hace con la luz. Se usa con varillas de fibra y esencia, y combina con las bandejas y las varillas decorativas de la línea. Disponible en cobre, mármol, negro y blanco mate.',
    size: '20 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Cobre', hex: '#B87333' },
      { name: 'Mármol', hex: '#E7E1D5' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Blanco', hex: '#F5F5F5' },
    ],
  },
  {
    id: 16,
    name: 'Porta Difusor Plisado',
    slug: 'porta-difusor-plisado',
    category: 'porta-difusores',
    images: [
      '/decoracion/porta-difusores/blanco.webp',
    ],
    description: 'Porta difusor de plisado horizontal y boca angosta, de aire nórdico. Su terminación mate lo hace ideal para ambientes claros: living, baño o mesa de entrada. Se puede acompañar con las varillas decorativas de la línea.',
    size: '18 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Hueso', hex: '#EDE6D6' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Cobre', hex: '#B87333' },
    ],
  },
  {
    id: 17,
    name: 'Porta Difusor Facetado',
    slug: 'porta-difusor-facetado',
    category: 'porta-difusores',
    images: [
      '/decoracion/porta-difusores/negro.webp',
    ],
    description: 'Porta difusor de caras geométricas, la versión más sobria de la línea. Combina con el modelo espiral para armar un dúo sobre la bandeja. Disponible en negro, blanco y gris.',
    size: '18 cm',
    material: 'Eco-Friendly PLA',
    featured: false,
    inStock: true,
    colors: [
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Gris', hex: '#9E9E9E' },
    ],
  },

  // ── Jardinería ───────────────────────────────────────────────
  {
    id: 20,
    name: 'Maceta Redonda Estriada',
    slug: 'maceta-redonda-estriada',
    category: 'macetas',
    offer: 20,
    images: [
      '/jardineria/macetas/maceta-redonda.png',
    ],
    description: 'Maceta cilíndrica con estrías verticales y plato a tono incluido. Pensada para plantas de interior chicas y medianas, con drenaje en la base. Impresa en PLA Eco-Friendly.',
    size: '14 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Verde', hex: '#3E7355' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Terracota', hex: '#C0714A' },
      { name: 'Rosa', hex: '#F5C2C7' },
    ],
  },
  {
    id: 21,
    name: 'Maceta Cuadrada Estriada',
    slug: 'maceta-cuadrada-estriada',
    category: 'macetas',
    offer: 20,
    images: [
      '/jardineria/macetas/maceta-cuadrada.png',
    ],
    description: 'Maceta cuadrada de esquinas redondeadas y estrías verticales. Ideal para suculentas y cactus, o para agrupar varias sobre un estante. Impresa en PLA Eco-Friendly, con drenaje en la base.',
    size: '12 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Rosa', hex: '#F5C2C7' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Verde', hex: '#3E7355' },
      { name: 'Terracota', hex: '#C0714A' },
    ],
  },
  {
    id: 22,
    name: 'Tutor Floral',
    slug: 'tutor-floral',
    category: 'tutores',
    images: [
      '/jardineria/tutores/tutor-floral.webp',
    ],
    description: 'Tutor decorativo con forma de rama florecida para acompañar plantas de maceta. Se clava en la tierra y guía el tallo sin que se note el soporte. También se usa como varilla decorativa dentro de un porta difusor. Disponible en negro, verde, blanco y beige.',
    size: '30 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Verde', hex: '#4E8A6B' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Beige', hex: '#D4B896' },
    ],
  },
  {
    id: 23,
    name: 'Tutor Ginkgo',
    slug: 'tutor-ginkgo',
    category: 'tutores',
    images: [
      '/jardineria/tutores/tutor-ginkgo.webp',
    ],
    description: 'Tutor con hoja de ginkgo calada, de tallo largo y fino. Aporta altura a las macetas chicas y también queda muy bien como varilla decorativa en floreros y porta difusores. Disponible en beige, blanco, verde y negro.',
    size: '28 cm',
    material: 'Eco-Friendly PLA',
    featured: true,
    inStock: true,
    colors: [
      { name: 'Beige', hex: '#C9B39B' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Verde', hex: '#2F5E4A' },
      { name: 'Negro', hex: '#1A1A1A' },
    ],
  },
];

export const galleryImages = [
  // Iluminación
  { id: 1, src: '/iluminacion/aire/aire-1-960.jpg', alt: 'Lámpara Aire', category: 'aire' },
  { id: 2, src: '/iluminacion/aire/aire-2-960.jpg', alt: 'Lámpara Aire en sus colores', category: 'aire' },
  { id: 3, src: '/iluminacion/aire/aire-5-960.jpg', alt: 'Lámpara Aire encendida', category: 'aire' },
  { id: 4, src: '/iluminacion/mar/mar-1-960.jpg', alt: 'Lámpara Mar', category: 'mar' },
  { id: 5, src: '/iluminacion/mar/mar-4-960.jpg', alt: 'Lámpara Mar en ambiente', category: 'mar' },
  { id: 6, src: '/iluminacion/tierra/tierra-1-960.jpg', alt: 'Lámpara Tierra', category: 'tierra' },
  { id: 7, src: '/iluminacion/tierra/tierra-3-960.jpg', alt: 'Lámpara Tierra en ambiente', category: 'tierra' },
  // Decoración para el hogar
  { id: 8, src: '/decoracion/bandejas/bandeja-oval.webp', alt: 'Bandeja oval', category: 'bandejas' },
  { id: 9, src: '/decoracion/bandejas/bandeja-rectangular.webp', alt: 'Bandeja rectangular', category: 'bandejas' },
  { id: 10, src: '/decoracion/floreros/florero-blanco.png', alt: 'Florero Espiga', category: 'floreros' },
  { id: 11, src: '/decoracion/floreros/florero-negro.png', alt: 'Florero Facetado', category: 'floreros' },
  { id: 12, src: '/decoracion/floreros/florero-terracota.png', alt: 'Florero Onda', category: 'floreros' },
  { id: 13, src: '/decoracion/porta-difusores/cobre.webp', alt: 'Porta Difusor Espiral en cobre', category: 'porta-difusores' },
  { id: 14, src: '/decoracion/porta-difusores/marmol.webp', alt: 'Porta Difusor Espiral en mármol', category: 'porta-difusores' },
  { id: 15, src: '/decoracion/porta-difusores/blanco.webp', alt: 'Porta Difusor Plisado', category: 'porta-difusores' },
  { id: 16, src: '/decoracion/porta-difusores/negro.webp', alt: 'Porta Difusores en negro', category: 'porta-difusores' },
  // Jardinería
  { id: 17, src: '/jardineria/macetas/maceta-redonda.png', alt: 'Maceta Redonda Estriada', category: 'macetas' },
  { id: 18, src: '/jardineria/macetas/maceta-cuadrada.png', alt: 'Maceta Cuadrada Estriada', category: 'macetas' },
  { id: 19, src: '/jardineria/tutores/tutor-floral.webp', alt: 'Tutor Floral', category: 'tutores' },
  { id: 20, src: '/jardineria/tutores/tutor-ginkgo.webp', alt: 'Tutor Ginkgo', category: 'tutores' },
];
