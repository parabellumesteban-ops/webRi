/// <reference types="vite/client" />

// Valores inyectados por scripts/seo-html-plugin.mjs en tiempo de build.
declare const __RI_SITE_URL__: string;
declare const __RI_OG_IMAGE_URL__: string;

interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_SITE_URL?: string;
}
