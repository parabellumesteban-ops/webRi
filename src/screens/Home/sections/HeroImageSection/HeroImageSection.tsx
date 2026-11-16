import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";

const navigationLinks = [
  { to: "/proyectos", label: "Proyectos" },
  { to: "/alianzas", label: "Alianzas" },
  { to: "/conoce-ri", label: "Conoce RI" },
  { to: "/cert-ri", label: "Cert RI" },
  { to: "/contacto", label: "Contacto" },
];

export const HeroImageSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <section
      className="relative w-full h-[810px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://c.animaapp.com/mmjez8tnoH67O3/img/frame-83.png)",
      }}
    >
      {/* Desktop Navigation Arrow */}
      <div className="hidden md:flex w-full max-w-[1440px] mx-auto items-center justify-end px-20 py-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-auto p-0 hover:bg-transparent"
        >
          <Link to="/proyectos" aria-label="Ir a Proyectos">
            <img
              className="w-[16.88px] h-[45.5px]"
              alt="Vector"
              src="https://c.animaapp.com/mmjez8tnoH67O3/img/vector.svg"
            />
          </Link>
        </Button>
      </div>

      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[350px] lg:w-[408px] h-auto max-h-[1897px] pointer-events-none"
        alt="Frame"
        src="https://c.animaapp.com/mmjez8tnoH67O3/img/frame-2.svg"
      />

      <header className="flex w-full max-w-[1440px] mx-auto h-[180px] items-center justify-between px-5 md:px-20 py-[60px] absolute top-0 left-1/2 -translate-x-1/2 bg-transparent z-50">
        <Link to="/" className="flex items-center z-50">
          <img
            className="w-[60px] h-[100px]"
            alt="Capa"
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/capa-1.svg"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Navegacion principal" className="hidden md:flex items-center justify-end gap-[30px] flex-1">
          {navigationLinks.map((link) => (
            <Button
              key={link.to}
              variant="link"
              asChild
              className={`h-auto p-0 [font-family:'Montserrat',Helvetica] font-normal text-white text-[21px] tracking-[0] leading-normal hover:no-underline hover:opacity-80 ${
                location.pathname === link.to ? "font-bold" : ""
              }`}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white z-50 bg-transparent hover:bg-transparent"
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-home-legacy"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon className="w-9 h-9" /> : <MenuIcon className="w-8 h-8" />}
        </Button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-nav-home-legacy" aria-label="Navegacion movil" className="md:hidden fixed top-24 right-5 flex flex-col items-end gap-4 pt-4 z-50 animate-fade-in [&_a]:text-right [&_a]:text-[24px] [&_a]:leading-tight [&_a]:font-normal">
{navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`[font-family:'Montserrat',Helvetica] font-normal text-white text-2xl tracking-[0] leading-normal hover:opacity-80 ${
                  location.pathname === link.to ? "font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </section>
  );
};









