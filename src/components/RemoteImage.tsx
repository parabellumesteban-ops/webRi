import { useEffect, useState } from "react";
import { getRemoteImageSize } from "../lib/remoteImages";

type RemoteImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  /** "lazy" por defecto; usar "eager" solo en imágenes del primer viewport. */
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  /** "high" solo para la imagen principal (LCP) de cada página. */
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
};

const defaultFallback =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='16' font-family='Arial'>Imagen no disponible</text></svg>";

export const RemoteImage = ({
  src,
  alt,
  className,
  fallbackSrc = defaultFallback,
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  width,
  height,
}: RemoteImageProps): JSX.Element => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [didFallback, setDidFallback] = useState(false);
  const knownSize = getRemoteImageSize(src);

  useEffect(() => {
    setCurrentSrc(src);
    setDidFallback(false);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      width={width ?? knownSize?.width}
      height={height ?? knownSize?.height}
      className={className}
      onError={() => {
        // Un único intento de fallback para evitar bucles si el fallback también falla.
        if (!didFallback) {
          setCurrentSrc(fallbackSrc);
          setDidFallback(true);
        }
      }}
    />
  );
};
