import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getNavLinkClassName, navigationLinks } from "../../../../lib/navigation";
import { Button } from "../../../../components/ui/button";
import { RemoteImage } from "../../../../components/RemoteImage";

export const HeroBannerSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <section
      className="relative w-full h-[810px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://c.animaapp.com/mmjez8tnoH67O3/img/frame-86.png)",
      }}
    >
      <header className="flex items-center justify-between absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[180px] px-5 md:px-20 py-[60px] bg-transparent z-50">
        <Link to="/" className="flex items-center z-50">
          <RemoteImage
            className="w-[60px] h-[100px]"
            alt="Capa"
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/capa-1.svg"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav aria-label="Navegacion principal" className="hidden md:flex items-center gap-[30px] flex-1 justify-end">
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              className={getNavLinkClassName(location.pathname, link.to)}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white z-50 bg-transparent hover:bg-transparent"
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-cert"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon className="w-9 h-9" /> : <MenuIcon className="w-8 h-8" />}
        </Button>

        {mobileMenuOpen && (
          <nav id="mobile-nav-cert" aria-label="Navegacion movil" className="md:hidden fixed top-24 right-5 flex flex-col items-end gap-4 pt-4 z-50 animate-fade-in [&_a]:text-right [&_a]:text-[24px] [&_a]:leading-tight [&_a]:font-normal">
{navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={getNavLinkClassName(location.pathname, link.to)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="[font-family:'Montserrat',Helvetica] font-normal text-center">
          <span className="block font-bold text-[#FCB640] text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[120px] leading-tight">
            CERT RI
          </span>
          <span className="block text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mt-3 whitespace-nowrap">
            RESPALDADO CON <span className="font-semibold">RESULTADOS</span>
          </span>
        </h1>
      </div>

      <div className="hidden md:flex max-w-[1440px] w-full items-center justify-between px-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-0 hover:bg-transparent"
          asChild
        >
          <Link to="/conoce-ri" aria-label="Pagina anterior: Conoce RI">
            <ChevronLeftIcon className="w-[22.88px] h-[51.5px] text-white" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-0 hover:bg-transparent"
          asChild
        >
          <Link to="/contacto" aria-label="Pagina siguiente: Contacto">
            <ChevronRightIcon className="w-[22.88px] h-[51.5px] text-white" />
          </Link>
        </Button>
      </div>
    </section>
  );
};














