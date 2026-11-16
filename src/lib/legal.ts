// Estado del aviso de privacidad. Módulo sin APIs del navegador: también lo
// usan src/lib/seo.ts y vite.config.ts (noindex y sitemap en el build).
//
// PRIVACY_NOTICE_VALIDATED solo debe cambiarse a true cuando exista
// confirmación explícita del cliente (o su abogado) sobre el texto definitivo.
// Al activarlo, automáticamente:
//   - se retira el noindex de /aviso-de-privacidad (src/lib/seo.ts),
//   - la ruta se añade a dist/sitemap.xml en el build,
//   - se muestra la fecha de última actualización como fecha vigente.
export const PRIVACY_NOTICE_VALIDATED = false;

export const PRIVACY_NOTICE_PATH = "/aviso-de-privacidad";

/** Fecha tal como aparece en el documento fuente. */
export const PRIVACY_NOTICE_LAST_UPDATED = "MAR 2024";

/** Clave documental del documento fuente. */
export const PRIVACY_NOTICE_DOCUMENT_KEY = "RH-FO-011";
