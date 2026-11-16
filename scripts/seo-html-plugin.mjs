// Plugin de Vite que escribe los metadatos SEO en el HTML inicial.
// - En dev y build sustituye el marcador <!-- ri:seo --> de index.html por los
//   metadatos de la ruta principal.
// - Al terminar el build genera un HTML por ruta (por ejemplo dist/proyectos.html)
//   con su title, description, canonical y Open Graph, para que los crawlers que
//   no ejecutan JavaScript reciban los metadatos correctos.
// - Expone al cliente la URL del sitio y de la imagen OG mediante `define`.
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const START = "<!-- ri:seo:start -->";
const END = "<!-- ri:seo:end -->";
const MARKER = "<!-- ri:seo -->";

const escapeAttr = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const buildHeadTags = ({ route, siteUrl, siteName, ogImage }) => {
  const url = siteUrl + route.path;
  const tags = [
    `<title>${escapeAttr(route.title)}</title>`,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    `<meta name="robots" content="${route.noindex ? "noindex, follow" : "index, follow"}" />`,
  ];

  if (!route.noindex) tags.push(`<link rel="canonical" href="${escapeAttr(url)}" />`);

  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_MX" />`,
    `<meta property="og:site_name" content="${escapeAttr(siteName)}" />`,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
  );
  if (!route.noindex) tags.push(`<meta property="og:url" content="${escapeAttr(url)}" />`);
  tags.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
  );

  if (ogImage) {
    tags.push(
      `<meta property="og:image" content="${escapeAttr(ogImage.url)}" />`,
      `<meta property="og:image:width" content="${ogImage.width}" />`,
      `<meta property="og:image:height" content="${ogImage.height}" />`,
      `<meta name="twitter:image" content="${escapeAttr(ogImage.url)}" />`,
    );
  }

  return [START, ...tags, END].map((tag) => `    ${tag}`).join("\n");
};

const replaceSeoBlock = (html, block) => {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start !== -1 && end !== -1) {
    const lineStart = html.lastIndexOf("\n", start) + 1;
    return html.slice(0, lineStart) + block + html.slice(end + END.length);
  }
  if (html.includes(MARKER)) {
    return html.replace(new RegExp(`[ \\t]*${MARKER}`), block);
  }
  throw new Error("[ri-seo] index.html no contiene el marcador <!-- ri:seo -->");
};

/** @param {import("./seo-html-plugin.d.mts").SeoHtmlPluginOptions} options */
export const seoHtmlPlugin = (options) => {
  const { siteUrl, siteName, routes, homePath, og } = options;
  const ogFile = path.join(options.publicDir, og.path.replace(/^\//, ""));
  const ogImage = existsSync(ogFile)
    ? { url: siteUrl + og.path, width: og.width, height: og.height }
    : null;

  const home = routes.find((route) => route.path === homePath);
  if (!home) throw new Error(`[ri-seo] No existe la ruta principal ${homePath}`);

  let outDir = "dist";

  return {
    name: "ri-seo-html",
    config() {
      return {
        define: {
          __RI_SITE_URL__: JSON.stringify(siteUrl),
          __RI_OG_IMAGE_URL__: JSON.stringify(ogImage ? ogImage.url : ""),
        },
      };
    },
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      if (!ogImage && config.command === "build") {
        config.logger.warn(
          `[ri-seo] Falta ${path.relative(config.root, ogFile)}. Se omiten og:image y twitter:image hasta añadir la imagen oficial (1200x630).`,
        );
      }
    },
    transformIndexHtml(html) {
      return replaceSeoBlock(html, buildHeadTags({ route: home, siteUrl, siteName, ogImage }));
    },
    async writeBundle() {
      const extraPaths = options.sitemapPaths ?? [];
      if (extraPaths.length > 0) {
        const sitemapFile = path.join(outDir, "sitemap.xml");
        if (!existsSync(sitemapFile)) throw new Error("[ri-seo] No existe dist/sitemap.xml");
        let sitemap = await readFile(sitemapFile, "utf8");
        const entries = extraPaths
          .map((p) => siteUrl + p)
          .filter((loc) => !sitemap.includes(`<loc>${loc}</loc>`))
          .map((loc) => `  <url>\n    <loc>${escapeAttr(loc)}</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>\n`)
          .join("");
        if (!sitemap.includes("</urlset>")) throw new Error("[ri-seo] sitemap.xml sin </urlset>");
        sitemap = sitemap.replace("</urlset>", `${entries}</urlset>`);
        await writeFile(sitemapFile, sitemap, "utf8");
      }

      const indexFile = path.join(outDir, "index.html");
      const indexHtml = await readFile(indexFile, "utf8");
      for (const route of routes) {
        if (!route.file || route.path === homePath) continue;
        const html = replaceSeoBlock(indexHtml, buildHeadTags({ route, siteUrl, siteName, ogImage }));
        await writeFile(path.join(outDir, route.file), html, "utf8");
      }
    },
  };
};
