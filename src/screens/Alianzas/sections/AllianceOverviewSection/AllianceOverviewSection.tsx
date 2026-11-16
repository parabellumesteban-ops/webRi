import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  FileImageIcon,
  HandshakeIcon,
  MenuIcon,
  ScaleIcon,
  SearchCheckIcon,
  StarIcon,
  XIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getNavLinkClassName, navigationLinks } from "../../../../lib/navigation";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { RemoteImage } from "../../../../components/RemoteImage";

const processSteps = [
  {
    icon: SearchCheckIcon,
    title: "Evaluación",
    subtitle: "del terreno",
    description:
      "Revisamos ubicación, acceso, factibilidad y potencial de desarrollo.",
  },
  {
    icon: StarIcon,
    title: "Plan",
    subtitle: "maestro del proyecto",
    description:
      "Diseñamos un esquema de lotificación que cumple normas y maximiza valor.",
  },
  {
    icon: ScaleIcon,
    title: "Estructura",
    subtitle: "legal del desarrollo",
    description:
      "Alineamos documentos, permisos y condiciones para dar certeza jurídica.",
  },
  {
    icon: FileImageIcon,
    title: "Branding",
    subtitle: "y estrategia comercial",
    description: "Creamos la identidad y campaña exclusiva del desarrollo.",
  },
  {
    icon: CircleDollarSignIcon,
    title: "Ventas",
    subtitle: "y administración",
    description:
      "Ejecutamos el proceso completo de promoción, negociación y seguimiento.",
  },
  {
    icon: HandshakeIcon,
    title: "Distribución de beneficios",
    subtitle: "",
    description:
      "Generamos un acuerdo transparente que beneficia a ambas partes.",
  },
];

export const AllianceOverviewSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div
        className="relative w-full min-h-[100vh] sm:min-h-[810px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://c.animaapp.com/mmjez8tnoH67O3/img/frame-94.png)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4 w-full max-w-[95vw] md:max-w-none">
          <h1 className="[font-family:'Montserrat',Helvetica] font-normal text-transparent tracking-[0]">
            <span className="font-bold text-[#FCB640] block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[120px]">
              ALIANZAS
            </span>
            <span className="text-white block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[60px] mt-2 md:mt-0">
              QUE CONSTRUYEN <span className="font-semibold">LEGADO</span>
            </span>
          </h1>

          
        </div>

        {/* Desktop Carousel Arrows */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1440px] items-center justify-between px-20">
          <Button variant="ghost" size="icon" asChild className="h-auto p-0">
            <Link to="/proyectos" aria-label="Pagina anterior: Proyectos">
              <ChevronLeftIcon className="w-[22.88px] h-[51.5px] text-white" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="h-auto p-0">
            <Link to="/conoce-ri" aria-label="Pagina siguiente: Conoce RI">
              <ChevronRightIcon className="w-[22.88px] h-[51.5px] text-white" />
            </Link>
          </Button>
        </div>

        <header className="flex items-center justify-between absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[180px] px-5 md:px-20 py-[60px] bg-transparent z-50">
          <Link to="/" className="z-50">
            <RemoteImage
              className="w-[60px] h-[100px]"
              alt="Ruiz Inmobiliaria Logo"
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
          aria-controls="mobile-nav-alianzas"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="w-9 h-9" /> : <MenuIcon className="w-8 h-8" />}
          </Button>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav id="mobile-nav-alianzas" aria-label="Navegacion movil" className="md:hidden fixed top-24 right-5 flex flex-col items-end gap-4 pt-4 z-50 animate-fade-in [&_a]:text-right [&_a]:text-[24px] [&_a]:leading-tight [&_a]:font-normal">
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
      </div>

      <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center gap-12 md:gap-20 px-5 md:px-0 py-12 md:py-20 w-full">
            <div className="flex flex-col items-center justify-center gap-12 md:gap-[90px] px-5 md:px-20 w-full">
              <p className="flex items-center justify-center flex-1 ri-body text-center">
              En Ruiz Inmobiliaria creemos que el mayor valor nace cuando las visiones se unen. Nuestra área de Alianzas ayuda a propietarios a transformar su terreno en un desarrollo lotificado con estructura legal y estrategia comercial.
            </p>
          </div>

          <div className="flex flex-col md:flex-row max-w-[1920px] items-center justify-center w-full gap-0">
            <div className="flex-1 flex items-center justify-center">
              <RemoteImage
                className="w-full h-[300px] md:h-[400px] lg:h-[540px] object-cover"
                alt="Alliance collaboration"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-2.png"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex-1 flex flex-col items-start justify-center gap-6 md:gap-[30px] px-5 md:px-10 lg:px-20 py-6 md:py-10">
              <div className="[font-family:'Montserrat',Helvetica] font-normal text-transparent text-3xl md:text-5xl lg:text-6xl tracking-[0] leading-tight md:leading-[60px]">
                <span className="font-medium text-[#4D4C4F]">
                  Construimos contigo.{" "}
                </span>
                <span className="font-bold text-[#FCB640]">
                  Juntos Crecemos.
                </span>
              </div>

              <div className="ri-body-lg">
                <span className="font-medium text-[#4D4C4F]">
                  Una Alianza Ri es un modelo de{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  colaboración
                </span>
                <span className="font-medium text-[#4D4C4F]">
                  {" "}
                  donde tú aportas tu terreno y nosotros{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  aportamos
                </span>
                <span className="font-medium text-[#4D4C4F]">
                  {" "}
                  el desarrollo, estructura, comercialización y proceso legal.
                  El{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  resultado
                </span>
                <span className="font-medium text-[#4D4C4F]">
                  {" "}
                  es un proyecto de alto{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  valor
                </span>
                <span className="font-medium text-[#4D4C4F]">
                  {" "}
                  que se transforma en{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  beneficios
                </span>
                <span className="font-medium text-[#4D4C4F]">
                  {" "}
                  para ambas partes.
                  <br />
                  <br />
                  Este modelo nace para personas que desean transformar un
                  terreno improductivo en un activo{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  rentable
                </span>
                <span className="font-medium text-[#4D4C4F]">
                  , sin necesidad de hacerlo solos.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full bg-[#FCB640] py-8 md:py-12 lg:py-[60px] px-5 md:px-10 lg:px-20">
            <p className="[font-family:'Montserrat',Helvetica] font-normal text-white text-2xl md:text-4xl lg:text-6xl text-center tracking-[0] leading-tight md:leading-[60px] max-w-[1440px]">
              ¿Cómo funciona nuestra alianza? Unimos terreno, visión y experiencia.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-12 lg:gap-[90px] px-5 md:px-10 lg:px-20 py-0 w-full">
            <div className="flex-1 max-w-[360px] h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <RemoteImage
              className="w-16 h-16 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] object-cover flex-shrink-0"
              alt="Crown icon"
              src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-5-2.png"
              loading="lazy"
              decoding="async"
            />
            <div className="flex-1 max-w-[360px] h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <div className="w-full flex flex-col items-center justify-center px-5 md:px-10 lg:px-20 py-0">
            <div className="flex flex-col items-center justify-center w-full max-w-[1440px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 lg:gap-x-[80px] gap-y-8 md:gap-y-12 lg:gap-y-[60px] w-full">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <Card
                      key={index}
                      className="w-full border-0 shadow-none bg-transparent"
                    >
                      <CardContent className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-[30px] p-0">
                        <IconComponent className="w-16 h-16 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px] text-[#4D4C4F]" />
                        <div className="[font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-xl md:text-2xl lg:text-3xl text-center tracking-[0] leading-tight md:leading-[30px]">
                          <span className="font-bold">{step.title}</span>
                          {step.subtitle && (
                            <>
                              <span className="font-semibold">
                                {" "}
                                {step.subtitle}
                                <br />
                              </span>
                            </>
                          )}
                          {!step.subtitle && <br />}
                          <span className="text-base md:text-lg lg:text-xl leading-tight md:leading-5">
                            {step.description}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row max-w-[1440px] items-center justify-center w-full gap-0">
            <div className="flex-1 flex flex-col items-start justify-center px-5 md:px-10 lg:px-20 py-6 md:py-10">
              <h2 className="[font-family:'Montserrat',Helvetica] font-normal text-transparent text-3xl md:text-5xl lg:text-6xl tracking-[0] leading-tight md:leading-[60px] mb-6 md:mb-8">
                <span className="font-bold text-[#FCB640]">¿Para quién </span>
                <span className="font-medium text-[#4D4C4F]">es este modelo?</span>
              </h2>

              <div className="[font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-lg md:text-2xl lg:text-3xl tracking-[0] leading-tight md:leading-[30px]">
                <p className="font-medium">
                  Para propietarios que buscan convertir su terreno en ingresos reales, desarrollar sin endeudarse, aprovechar su propiedad sin venderla y construir patrimonio familiar a largo plazo con apoyo profesional.
                </p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <RemoteImage
                className="w-full h-[300px] md:h-[400px] lg:h-[540px] object-cover"
                alt="Property development"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-2-3.png"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




















