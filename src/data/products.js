// Catalogo sin precios: cada producto se consulta por WhatsApp.
// Solo se listan piezas con fotos propias (ver public/lamparas y public/porta-difusores).

export const categories = [
  { id: 'todos', name: 'Todos los productos', slug: 'todos' },
  { id: 'porta-difusores', name: 'Porta Difusores', slug: 'porta-difusores' },
  { id: 'bandejas', name: 'Bandejas', slug: 'bandejas' },
  { id: 'tierra', name: 'Tierra', slug: 'tierra' },
  { id: 'mar', name: 'Mar', slug: 'mar' },
];

export const categoryGroups = [
  {
    id: 'decoracion',
    name: 'Decoración',
    subcategories: [
      { id: 'porta-difusores', name: 'Porta Difusores', slug: 'porta-difusores' },
      { id: 'bandejas', name: 'Bandejas', slug: 'bandejas' },
    ],
  },
  {
    id: 'iluminacion',
    name: 'Iluminación',
    subcategories: [
      // Agua: descomentar cuando lleguen las fotos reales de la linea.
      // { id: 'agua', name: 'Agua', slug: 'agua' },
      { id: 'tierra', name: 'Tierra', slug: 'tierra' },
      { id: 'mar', name: 'Mar', slug: 'mar' },
    ],
  },
];

// Grupos de la linea de iluminacion, en el orden en que se muestran en el home.
export const lightingGroups = [
  // Agua: descomentar junto con la subcategoria y sus productos.
  // { id: 'agua', name: 'Agua', tagline: 'Transparencias y celestes, luz fresca y serena.' },
  { id: 'tierra', name: 'Tierra', tagline: 'Marrones, cobres y dorados para una luz cálida.' },
  { id: 'mar', name: 'Mar', tagline: 'Azules, grises y plata para una luz fría y profunda.' },
];

export const products = [
  {
    id: 1,
    name: 'Porta Difusor Nilo',
    slug: 'porta-difusor-nilo',
    category: 'porta-difusores',
    images: [
      '/porta-difusores/nilo.webp',
    ],
    description: 'Elegante porta difusor de aromas con diseño espiral contemporáneo. Incluye varillas decorativas con detalles florales. Perfecto para ambientar cualquier espacio con estilo y sofisticación. Disponible en cobre, negro y blanco mate.',
    size: '20 cm',
    material: 'Eco-Friendly PLA',
    featured: false,
    inStock: true,
    colors: [
      { name: 'Cobre', hex: '#B87333' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Blanco', hex: '#F5F5F5' },
    ],
  },
  {
    id: 2,
    name: 'Porta Difusor Nilo y Cairo',
    slug: 'porta-difusor-nilo-y-cairo',
    category: 'porta-difusores',
    images: [
      '/porta-difusores/nilo-y-cairo.webp',
    ],
    description: 'Dúo de porta difusores Nilo y Cairo. Dos alturas y dos texturas que combinan entre sí para armar una composición sobre la mesa, el aparador o el baño. Impresos en PLA Eco-Friendly.',
    size: '20 cm y 15 cm',
    material: 'Eco-Friendly PLA',
    featured: false,
    inStock: true,
    colors: [
      { name: 'Cobre', hex: '#B87333' },
      { name: 'Negro', hex: '#1A1A1A' },
      { name: 'Blanco', hex: '#F5F5F5' },
    ],
  },
  {
    id: 3,
    name: 'Bandeja Oval para Porta Difusores',
    slug: 'bandeja-oval-porta-difusores',
    category: 'bandejas',
    images: [
      '/porta-difusores/bandeja-oval.webp',
    ],
    description: 'Bandeja oval pensada como base para los porta difusores. Ordena el conjunto y suma una terminación prolija a la composición. Disponible en blanco y negro.',
    size: '24 cm',
    material: 'Eco-Friendly PLA',
    featured: false,
    inStock: true,
    colors: [
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Negro', hex: '#1A1A1A' },
    ],
  },
  {
    id: 4,
    name: 'Bandeja Rectangular para Porta Difusores',
    slug: 'bandeja-rectangular-porta-difusores',
    category: 'bandejas',
    images: [
      '/porta-difusores/bandeja-rectangular.webp',
    ],
    description: 'Bandeja rectangular para apoyar los porta difusores y sus varillas. Líneas rectas y perfil bajo, ideal para mesas de luz y estantes angostos.',
    size: '26 cm',
    material: 'Eco-Friendly PLA',
    featured: false,
    inStock: true,
    colors: [
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Negro', hex: '#1A1A1A' },
    ],
  },
  {
    id: 5,
    name: 'Lámpara Tierra',
    slug: 'lampara-tierra',
    category: 'tierra',
    images: [
      '/lamparas/tierra-1-960.jpg',
      '/lamparas/tierra-2-960.jpg',
      '/lamparas/tierra-3-960.jpg',
      '/lamparas/tierra-4-960.jpg',
      '/lamparas/tierra-5-960.jpg',
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
  {
    id: 6,
    name: 'Lámpara Mar',
    slug: 'lampara-mar',
    category: 'mar',
    images: [
      '/lamparas/mar-1-960.jpg',
      '/lamparas/mar-2-960.jpg',
      '/lamparas/mar-3-960.jpg',
      '/lamparas/mar-4-960.jpg',
      '/lamparas/mar-5-960.jpg',
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
];

export const galleryImages = [
  { id: 1, src: '/lamparas/tierra-1-960.jpg', alt: 'Lámpara Tierra', category: 'tierra' },
  { id: 2, src: '/lamparas/tierra-2-960.jpg', alt: 'Lámpara Tierra encendida', category: 'tierra' },
  { id: 3, src: '/lamparas/tierra-3-960.jpg', alt: 'Lámpara Tierra en ambiente', category: 'tierra' },
  { id: 4, src: '/lamparas/tierra-4-960.jpg', alt: 'Detalle textura Tierra', category: 'tierra' },
  { id: 5, src: '/lamparas/tierra-5-960.jpg', alt: 'Lámpara Tierra sobre mesa', category: 'tierra' },
  { id: 6, src: '/lamparas/mar-1-960.jpg', alt: 'Lámpara Mar', category: 'mar' },
  { id: 7, src: '/lamparas/mar-2-960.jpg', alt: 'Lámpara Mar encendida', category: 'mar' },
  { id: 8, src: '/lamparas/mar-3-960.jpg', alt: 'Lámpara Mar en ambiente', category: 'mar' },
  { id: 9, src: '/lamparas/mar-4-960.jpg', alt: 'Detalle textura Mar', category: 'mar' },
  { id: 10, src: '/lamparas/mar-5-960.jpg', alt: 'Lámpara Mar sobre mesa', category: 'mar' },
  { id: 11, src: '/porta-difusores/nilo.webp', alt: 'Porta Difusor Nilo', category: 'porta-difusores' },
  { id: 12, src: '/porta-difusores/nilo-y-cairo.webp', alt: 'Porta Difusor Nilo y Cairo', category: 'porta-difusores' },
  { id: 13, src: '/porta-difusores/bandeja-oval.webp', alt: 'Bandeja oval', category: 'bandejas' },
  { id: 14, src: '/porta-difusores/bandeja-rectangular.webp', alt: 'Bandeja rectangular', category: 'bandejas' },
];
