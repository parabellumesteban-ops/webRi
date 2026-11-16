import type { Plugin } from "vite";

export type SeoHtmlRoute = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  /** Archivo HTML a generar en dist/ (por ejemplo "proyectos.html"). */
  file?: string;
};

export type SeoHtmlPluginOptions = {
  siteUrl: string;
  siteName: string;
  publicDir: string;
  homePath: string;
  routes: SeoHtmlRoute[];
  og: { path: string; width: number; height: number };
  /** Rutas a añadir a dist/sitemap.xml (por ejemplo el aviso de privacidad validado). */
  sitemapPaths?: string[];
};

export declare const seoHtmlPlugin: (options: SeoHtmlPluginOptions) => Plugin;
