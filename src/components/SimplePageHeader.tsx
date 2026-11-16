import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getNavLinkClassName, navigationLinks } from "../lib/navigation";
import { RemoteImage } from "./RemoteImage";

// Cabecera con fondo sólido para páginas sin imagen hero (404, aviso de privacidad).
export const SimplePageHeader = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="relative w-full bg-[#4D4C4F]">
      <div className="mx-auto flex h-[140px] w-full max-w-[1440px] items-center justify-between px-5 md:px-20">
        <Link to="/" aria-label="Ruiz Inmobiliaria, ir al inicio" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <RemoteImage
            className="h-[100px] w-[60px]"
            alt=""
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/capa-1.svg"
            loading="eager"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-[30px] md:flex">
          {navigationLinks.map((link) => (
            <Link key={link.to} to={link.to} className={getNavLinkClassName(location.pathname, link.to)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-simple"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-simple"
          aria-label="Navegación móvil"
          className="absolute right-0 top-full z-50 flex w-full flex-col items-end gap-4 bg-[#4D4C4F] px-5 pb-6 md:hidden"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`${getNavLinkClassName(location.pathname, link.to)} text-2xl`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
