import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Difiere la descarga de una imagen de fondo CSS hasta que el elemento se
 * acerca al viewport. Los fondos CSS no admiten loading="lazy" y, fuera del
 * primer viewport, se descargaban todos al abrir la página.
 */
export const useLazyBackground = <T extends HTMLElement>(url: string, rootMargin = "400px") => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  const style: CSSProperties = visible ? { backgroundImage: `url(${url})` } : {};
  return { ref, style };
};
