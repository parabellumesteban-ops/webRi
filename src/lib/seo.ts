// Fuente única de metadatos SEO por ruta.
// Este módulo no debe usar APIs del navegador ni import.meta.env: también lo
// importa vite.config.ts para generar el HTML inicial de cada ruta en el build.
import { PRIVACY_NOTICE_PATH, PRIVACY_NOTICE_VALIDATED } from "./legal";

export const SITE_NAME = "Ruiz Inmobiliaria";
export const DEFAULT_SITE_URL = "https://www.ruizinmobiliaria.com";

// Imagen social. El archivo debe existir en src/public/ con este nombre
// (1200x630, JPG). Si no existe, el build omite og:image/twitter:image.
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
};

/** Rutas que se añaden a dist/sitemap.xml en el build además de src/public/sitemap.xml. */
export const extraSitemapPaths: string[] = PRIVACY_NOTICE_VALIDATED ? [PRIVACY_NOTICE_PATH] : [];

export const routeSeo = {
  home: {
    path: "/",
    title: "Ruiz Inmobiliaria | Inversión inmobiliaria en Jalisco",
    description:
      "Invierte en proyectos inmobiliarios con respaldo, asesoría y acompañamiento profesional en Jalisco.",
  },
  proyectos: {
    path: "/proyectos",
    title: "Proyectos | Ruiz Inmobiliaria",
    description:
      "Conoce nuestros proyectos inmobiliarios y encuentra opciones de inversión con plusvalía y respaldo.",
  },
  alianzas: {
    path: "/alianzas",
    title: "Alianzas | Ruiz Inmobiliaria",
    description:
      "Explora nuestro modelo de alianzas y colaboraciones para crecer contigo en el sector inmobiliario.",
  },
  conoceRi: {
    path: "/conoce-ri",
    title: "Conoce RI | Ruiz Inmobiliaria",
    description:
      "Descubre nuestra historia, valores y equipo para invertir con confianza en bienes raíces.",
  },
  certRi: {
    path: "/cert-ri",
    title: "Cert RI | Ruiz Inmobiliaria",
    description:
      "Conoce certificaciones, respaldos y resultados que fortalecen la confianza en Ruiz Inmobiliaria.",
  },
  contacto: {
    path: "/contacto",
    title: "Contacto | Ruiz Inmobiliaria",
    description:
      "Habla con nuestro equipo y recibe orientación personalizada sobre tu siguiente inversión inmobiliaria.",
  },
  avisoPrivacidad: {
    path: PRIVACY_NOTICE_PATH,
    title: "Aviso de privacidad | Ruiz Inmobiliaria",
    description:
      "Aviso de privacidad de Ruiz Inmobiliaria conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
    // noindex mientras el texto no esté validado legalmente (ver src/lib/legal.ts).
    noindex: !PRIVACY_NOTICE_VALIDATED,
  },
  notFound: {
    path: "/404",
    title: "Página no encontrada | Ruiz Inmobiliaria",
    description: "La página que buscas no existe o cambió de dirección.",
    noindex: true,
  },
} satisfies Record<string, RouteSeo>;

export type RouteSeoKey = keyof typeof routeSeo;

export const normalizeSiteUrl = (value: string | undefined): string => {
  const trimmed = (value ?? "").trim().replace(/\/+$/, "");
  return /^https?:\/\/[^/\s]+$/i.test(trimmed) ? trimmed : DEFAULT_SITE_URL;
};
