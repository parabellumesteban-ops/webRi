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
          "url(https://c.animaapp.com/mmjez8tnoH67O3/img/frame-87.png)",
      }}
    >
      <header className="flex items-center justify-between absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[180px] px-5 md:px-20 py-[60px] bg-transparent z-50">
        <Link to="/" className="flex-shrink-0 z-50">
          <RemoteImage
            className="w-[60px] h-[100px]"
            alt="Capa"
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/capa-1.svg"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navegacion principal" className="hidden md:flex items-center justify-end gap-[30px] flex-1">
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white z-50 bg-transparent hover:bg-transparent"
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-proyectos"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon className="w-9 h-9" /> : <MenuIcon className="w-8 h-8" />}
        </Button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-nav-proyectos" aria-label="Navegacion movil" className="md:hidden fixed top-24 right-5 flex flex-col items-end gap-4 pt-4 z-50 animate-fade-in [&_a]:text-right [&_a]:text-[24px] [&_a]:leading-tight [&_a]:font-normal">
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

      <div className="flex flex-col items-center justify-center gap-6 md:gap-10 lg:gap-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1440px] px-5">
        <h1 className="[font-family:'Montserrat',Helvetica] font-normal text-center">
          <span className="block text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-[54px]">
            NUESTROS
          </span>
          <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-[120px] leading-tight md:leading-[88.6px] font-bold text-[#FCB640]">
            PROYECTOS
          </span>
        </h1>

        <Button
          asChild
          className="h-auto px-4 sm:px-6 md:px-8 lg:px-[30px] py-2 sm:py-3 md:py-4 lg:py-[15px] bg-[#FCB640] hover:bg-[#FCB640]/90 rounded-[10px] md:rounded-[15px] [font-family:'Montserrat',Helvetica] font-semibold text-white text-base sm:text-xl md:text-2xl lg:text-3xl leading-tight md:leading-[27px]"
        >
          <a href="https://wa.link/y9cz4x" target="_blank" rel="noopener noreferrer">Contacta a un asesor</a>
        </Button>

        <div className="hidden md:flex w-full max-w-[1440px] items-center justify-between px-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link to="/" aria-label="Pagina anterior: Inicio" className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">
            <ChevronLeftIcon
              className="w-[22.88px] h-[51.5px] text-white"
              strokeWidth={1.5}
            />
          </Link>

          <Link to="/alianzas" aria-label="Pagina siguiente: Alianzas" className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">
            <ChevronRightIcon
              className="w-[22.88px] h-[51.5px] text-white"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
















