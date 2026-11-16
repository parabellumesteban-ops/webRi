import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, loadEnv, type PluginOption } from "vite";
import { seoHtmlPlugin } from "./scripts/seo-html-plugin.mjs";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  extraSitemapPaths,
  normalizeSiteUrl,
  routeSeo,
} from "./src/lib/seo";

const publicDir = "./src/public";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);

  return {
    plugins: [
      react(),
      seoHtmlPlugin({
        siteUrl,
        siteName: SITE_NAME,
        publicDir,
        homePath: routeSeo.home.path,
        og: { path: OG_IMAGE_PATH, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT },
        sitemapPaths: extraSitemapPaths,
        routes: [
          { ...routeSeo.home, file: "index.html" },
          { ...routeSeo.proyectos, file: "proyectos.html" },
          { ...routeSeo.alianzas, file: "alianzas.html" },
          { ...routeSeo.conoceRi, file: "conoce-ri.html" },
          { ...routeSeo.certRi, file: "cert-ri.html" },
          { ...routeSeo.contacto, file: "contacto.html" },
          { ...routeSeo.avisoPrivacidad, file: "aviso-de-privacidad.html" },
          { ...routeSeo.notFound, file: "404.html" },
        ],
      }),
      ...(mode === "development"
        ? [screenGraphPlugin() as unknown as PluginOption]
        : []),
    ],
    publicDir,
    // Ruta absoluta: con "./" los assets se resolvían relativos a la URL
    // (/proyectos/assets/...) y las rutas con barra final quedaban en blanco.
    base: "/",
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8787",
          changeOrigin: true,
        },
      },
    },
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
  };
});
