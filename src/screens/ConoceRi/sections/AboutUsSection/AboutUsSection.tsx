import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getNavLinkClassName, navigationLinks } from "../../../../lib/navigation";
import { Button } from "../../../../components/ui/button";
import { RemoteImage } from "../../../../components/RemoteImage";

export const AboutUsSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <section
      className="relative w-full min-h-[100vh] sm:min-h-[810px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://c.animaapp.com/mmjez8tnoH67O3/img/frame-83.png)",
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

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white z-50 bg-transparent hover:bg-transparent"
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-conoce"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon className="w-9 h-9" /> : <MenuIcon className="w-8 h-8" />}
        </Button>

        {mobileMenuOpen && (
          <nav id="mobile-nav-conoce" aria-label="Navegacion movil" className="md:hidden fixed top-24 right-5 flex flex-col items-end gap-4 pt-4 z-50 animate-fade-in [&_a]:text-right [&_a]:text-[24px] [&_a]:leading-tight [&_a]:font-normal">
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 w-full">
        <h1 className="[font-family:'Montserrat',Helvetica] font-normal tracking-[0]">
          <span className="font-bold text-[#FCB640] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-tight sm:leading-[60px] md:leading-[80px] lg:leading-[100px] xl:leading-[120px] inline">
            CONOCE RI
          </span>
          <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-[30px] md:leading-[40px] lg:leading-[50px] xl:leading-[54.0px] block mt-2 sm:mt-0">
            SOBRE NOSOTROS
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
          <Link to="/alianzas" aria-label="Pagina anterior: Alianzas">
            <ChevronLeftIcon className="w-[22.88px] h-[51.5px] text-white" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-0 hover:bg-transparent"
          asChild
        >
          <Link to="/cert-ri" aria-label="Pagina siguiente: Cert RI">
            <ChevronRightIcon className="w-[22.88px] h-[51.5px] text-white" />
          </Link>
        </Button>
      </div>
    </section>
  );
};













