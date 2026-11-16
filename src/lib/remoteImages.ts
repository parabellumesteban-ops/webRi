// Dimensiones intrínsecas reales de las imágenes alojadas en c.animaapp.com,
// leídas de la cabecera de cada archivo (nov 2026). RemoteImage las usa como
// atributos width/height para reservar espacio y evitar saltos de diseño (CLS).
//
// PENDIENTE (requiere originales/autorización del cliente): estas imágenes
// pesan 78.6 MB en total; varias son JPG de 4000 px servidos como .png
// (por ejemplo frame-37.png, 18.7 MB). Ver DOCUMENTACION_TECNICA.md §13.

const BASE = "https://c.animaapp.com/mmjez8tnoH67O3/img/";

const dimensions: Record<string, readonly [number, number]> = {
  "84355-1.png": [1265, 621],
  "capa-1.svg": [60, 100],
  "cm-1.png": [2280, 720],
  "conversacion.png": [1880, 1254],
  "earth-3-1.png": [134, 93],
  "earth-3-2.png": [134, 93],
  "earth-3-3.png": [134, 93],
  "earth-3.png": [134, 93],
  "frame-2-1.svg": [408, 810],
  "layer-1-3.svg": [94, 181],
  "lucide-mail.svg": [90, 90],
  "lucide-map-pin.svg": [90, 90],
  "pro-integridad-empresas-logo-design-1-6.png": [1772, 1772],
  "pro-integridad-empresas-logo-design-2-6.png": [246, 83],
  "pro-integridad-empresas-logo-design-3-6.png": [1536, 1024],
  "pro-integridad-empresas-logo-design-4-6.png": [720, 274],
  "pro-integridad-empresas-logo-design-5-6.png": [2088, 752],
  "rectangle-10.png": [900, 1600],
  "rectangle-2-1.png": [4000, 2250],
  "rectangle-2-2.png": [1880, 1250],
  "rectangle-2-3.png": [1733, 1300],
  "rectangle-2.png": [1880, 1253],
  "rectangle-3-1.png": [1600, 1200],
  "rectangle-3-2.png": [1880, 1255],
  "rectangle-4-1.png": [1880, 1253],
  "rectangle-4-2.png": [1600, 721],
  "rectangle-5-2.png": [1080, 1080],
  "rectangle-5.png": [1280, 960],
  "rectangle-6.png": [4032, 3024],
  "rectangle-7-1.png": [3831, 4096],
  "rectangle-7.png": [2000, 1500],
  "rectangle-8-1.png": [4032, 3024],
  "rectangle-8.png": [1280, 720],
  "rectangle-9.png": [2048, 2048],
  "sin-t-tulo-1-1.png": [1080, 378],
  "whats-app-svgrepo-com.svg": [90, 90],
};

export const getRemoteImageSize = (src: string): { width: number; height: number } | undefined => {
  if (!src.startsWith(BASE)) return undefined;
  const size = dimensions[src.slice(BASE.length)];
  return size ? { width: size[0], height: size[1] } : undefined;
};
