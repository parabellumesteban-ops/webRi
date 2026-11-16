import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { RemoteImage } from "./RemoteImage";
import { Button } from "./ui/button";

const partnerLogos = [
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

const socialLinks = [
  {
    href: "https://www.facebook.com/RIruizinmobiliaria",
    label: "Facebook",
    Icon: FacebookIcon,
  },
  {
    href: "https://www.instagram.com/ruiz.inmobiliariamx/",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.youtube.com/@RuizInmobiliariaMX",
    label: "YouTube",
    Icon: YoutubeIcon,
  },
];

export const Footer = (): JSX.Element => {
  return (
    <footer
      className="w-full bg-[#4D4C4F] px-6 py-10 md:p-20"
      style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10 md:flex-row md:flex-wrap md:items-start md:justify-center md:gap-[30px]">
        <section className="flex w-full flex-col items-center justify-center gap-4 md:min-w-[280px] md:flex-1">
          <address className="not-italic text-left">
            <p className="[font-family:'Montserrat',Helvetica] text-2xl font-normal leading-[1.25] tracking-[0] text-white md:text-3xl">
              Loma Seca Nte. 8109, Loma Dorada Delegación a, 45402 Tonalá, Jal.
            </p>
          </address>

          <a
            href="tel:+523329543360"
            className="[font-family:'Montserrat',Helvetica] text-3xl font-normal leading-10 tracking-[0] text-white transition-all duration-200 hover:opacity-80 md:text-[40px]"
          >
            (33) 2954 3360
          </a>

          <p className="[font-family:'Montserrat',Helvetica] text-[15px] font-normal leading-[1.25] tracking-[0] text-white">
            Aplican restricciones. Sujeto a disponibilidad.
            La información puede cambiar sin previo aviso.
            <br />
            Las imágenes mostradas son ilustrativas.
          </p>
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-[30px] md:min-w-[280px] md:flex-1">
          <Link to="/" className="transition-opacity duration-200 hover:opacity-80">
            <RemoteImage
              className="block"
              alt="Ruiz Inmobiliaria Logo"
              src="https://c.animaapp.com/mmjez8tnoH67O3/img/layer-1-3.svg"
            />
          </Link>

          <nav className="flex items-center justify-center gap-5" aria-label="Redes sociales">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-1 text-white transition-all duration-200 hover:scale-110 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={social.label}
              >
                <social.Icon className="h-8 w-8" />
              </a>
            ))}
          </nav>
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-5 md:min-w-[280px] md:flex-1 md:items-end">
          <div className="grid w-full max-w-[320px] grid-cols-2 place-items-center gap-4 md:ml-auto md:grid-cols-3">
            {partnerLogos.map((logo, index) => (
              <div key={`partner-logo-${index}`} className="flex h-20 w-full items-center justify-center">
                <RemoteImage
                  className="max-h-full w-auto object-contain"
                  alt={logo.alt}
                  src={logo.src}
                />
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-[320px] flex-col items-start gap-[15px]">
            <Button
              variant="link"
              asChild
              className="h-auto p-0 [font-family:'Montserrat',Helvetica] text-[15px] font-normal leading-[15px] tracking-[0] text-white transition-opacity duration-200 hover:opacity-80"
            >
              <Link to="/contacto">Atención al cliente RI.</Link>
            </Button>

            <p className="[font-family:'Montserrat',Helvetica] text-[15px] font-normal leading-[1.25] tracking-[0] text-white">
              ©2025 Ruiz Inmobiliaria. Todos los derechos reservados. Consulta términos y condiciones.{" "}
              <Link
                to="/aviso-de-privacidad"
                className="underline underline-offset-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Aviso de privacidad
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
};



