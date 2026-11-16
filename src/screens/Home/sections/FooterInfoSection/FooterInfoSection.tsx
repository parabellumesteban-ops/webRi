import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

const certificationLogos = [
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-5-6.png",
    alt: "Pro integridad",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-4-6.png",
    alt: "Pro integridad",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-3-6.png",
    alt: "Pro integridad",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-1-6.png",
    alt: "Pro integridad",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-2-6.png",
    alt: "Pro integridad",
  },
];

export const FooterInfoSection = (): JSX.Element => {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-[30px] p-20 w-full bg-[#4D4C4F]">
      <div className="flex flex-wrap items-center justify-center gap-[30px] flex-1">
        <div className="flex flex-col items-center justify-center gap-[15px] flex-1 min-w-[300px]">
          <address className="flex items-center self-stretch [font-family:'Montserrat',Helvetica] font-normal text-white text-3xl tracking-[0] leading-[30px] not-italic">
            Loma Seca Nte. 8109, Loma Dorada Delegación a, 45402 Tonalá, Jal.
          </address>

          <a
            href="tel:+523329543360"
            className="flex items-center self-stretch [font-family:'Montserrat',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-10 hover:opacity-80 transition-opacity"
          >
            (33) 2954 3360
          </a>

          <p className="self-stretch [font-family:'Montserrat',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[15px]">
            Aplican restricciones. Sujeto a disponibilidad de ubicacion.
            Informacion sujeta a cambios sin previo aviso.
            <br />
            Las imagenes mostradas son solo ilustrativas.
          </p>
        </div>

        <div className="flex flex-col min-w-[300px] items-center justify-center gap-[30px] flex-1">
          <Link to="/" className="block">
            <img
              className="block"
              alt="Ruiz Inmobiliaria Logo"
              src="https://c.animaapp.com/mmjez8tnoH67O3/img/layer-1.svg"
            />
          </Link>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto p-0 hover:bg-transparent hover:opacity-80 transition-opacity"
              asChild
            >
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img
                  src="https://c.animaapp.com/mmjez8tnoH67O3/img/redes.svg"
                  alt="Social media icons"
                  className="w-[472px]"
                />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap min-w-[300px] items-end justify-end flex-1">
          <div className="flex flex-col items-end justify-center gap-2.5 w-full max-w-[320px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full place-items-center">
              {certificationLogos.map((logo, index) => (
                <div key={`certification-${index}`} className="flex items-center justify-center w-full h-20">
                  <img
                    className="max-h-full w-auto object-contain"
                    alt={logo.alt}
                    src={logo.src}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-[15px] self-stretch w-full">
              <Link
                className="flex items-center self-stretch [font-family:'Montserrat',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[15px] hover:opacity-80 transition-opacity"
                to="/contacto"
              >
                Atencion a clientes RI.
              </Link>

              <p className="flex items-center self-stretch [font-family:'Montserrat',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[15px]">
                2025 Ruiz inmobiliaria. Todos los derechos reservados. Terminos
                y condiciones pueden aplicar. AVISO DE PRIVACIDAD
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
