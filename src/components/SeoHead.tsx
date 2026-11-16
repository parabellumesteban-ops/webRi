import { useEffect } from "react";
import { SITE_NAME, routeSeo, type RouteSeoKey } from "../lib/seo";

// Inyectados en build por scripts/seo-html-plugin.mjs. Usan el origen
// configurado (VITE_SITE_URL), nunca window.location, para que canonical y
// og:url no apunten a localhost ni a dominios de previsualización.
const siteUrl = __RI_SITE_URL__;
const ogImageUrl = __RI_OG_IMAGE_URL__;

type SeoHeadProps = {
  page: RouteSeoKey;
};

const upsertMeta = (attr: "name" | "property", key: string, content: string): void => {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attr}='${key}']`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
};

const removeElement = (selector: string): void => {
  document.head.querySelector(selector)?.remove();
};

const upsertCanonical = (href: string): void => {
  let link = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

export const SeoHead = ({ page }: SeoHeadProps): null => {
  useEffect(() => {
    const route = routeSeo[page];
    const noindex = "noindex" in route && route.noindex === true;
    const url = siteUrl + route.path;

    document.title = route.title;

    upsertMeta("name", "description", route.description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", "es_MX");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", route.title);
    upsertMeta("property", "og:description", route.description);
    // Las páginas noindex (404, borradores) no declaran URL pública.
    if (noindex) removeElement("meta[property='og:url']");
    else upsertMeta("property", "og:url", url);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", route.title);
    upsertMeta("name", "twitter:description", route.description);

    if (ogImageUrl) {
      upsertMeta("property", "og:image", ogImageUrl);
      upsertMeta("name", "twitter:image", ogImageUrl);
    } else {
      removeElement("meta[property='og:image']");
      removeElement("meta[name='twitter:image']");
    }

    if (noindex) {
      removeElement("link[rel='canonical']");
    } else {
      upsertCanonical(url);
    }
  }, [page]);

  return null;
};
