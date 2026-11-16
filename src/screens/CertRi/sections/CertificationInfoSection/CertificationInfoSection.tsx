import { Card, CardContent } from "../../../../components/ui/card";
import { RemoteImage } from "../../../../components/RemoteImage";
import {
  CLIENTS_SERVED,
  DEVELOPMENTS_PARTICIPATED_TEXT,
  formatFigure,
} from "../../../../lib/businessData";

// PENDIENTE CLIENTE: las descripciones de certificaciones y afiliaciones
// (Pro Integridad, AMPI, Cámara de Comercio, Contraloría del Estado, PROFECO)
// no se han modificado. Deben ser revisadas por Ruiz Inmobiliaria antes de
// publicar; para cambiarlas basta con editar el arreglo `certifications`.

type Certification = {
  logo: string;
  logoAlt: string;
  title: string;
  description: string;
  highlights: Array<{ text: string; bold: boolean }>;
};

const certifications: Certification[] = [
  {
    logo: "https://c.animaapp.com/mmjez8tnoH67O3/img/84355-1.png",
    logoAlt: "Pro Integridad Empresas",
    title: "Pro Integridad Empresas",
    description:
      "Ser parte del Programa de Integridad Empresarial significa que Ruiz Inmobiliaria adopta",
    highlights: [
      { text: " principios", bold: true },
      { text: " de ", bold: false },
      { text: "ética", bold: true },
      { text: " corporativa, ", bold: false },
      { text: "transparencia", bold: true },
      {
        text: " y responsabilidad social. Este distintivo respalda que nuestras decisiones, contratos y relaciones comerciales se rigen por valores sólidos y prácticas íntegras.",
        bold: false,
      },
    ],
  },
  {
    logo: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-1-6.png",
    logoAlt: "AMPI",
    title: "AMPI (Asociación Mexicana de Profesionales Inmobiliarios)",
    description:
      "Esta afiliación refleja que operamos bajo estándares profesionales, éticos y legales reconocidos a nivel nacional. AMPI agrupa a los",
    highlights: [
      { text: " profesionales", bold: true },
      { text: " inmobiliarios que se comprometen con la ", bold: false },
      { text: "capacitación", bold: true },
      { text: " continua, la transparencia y las mejores ", bold: false },
      { text: "prácticas", bold: true },
      { text: " del sector.", bold: false },
    ],
  },
  {
    logo: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-4-6.png",
    logoAlt: "Cámara de Comercio de Guadalajara",
    title: "Cámara de Comercio de Guadalajara",
    description:
      "Nuestra afiliación a la Cámara de Comercio de Guadalajara nos",
    highlights: [
      { text: " integra", bold: true },
      { text: " a una comunidad empresarial ", bold: false },
      { text: "formal", bold: true },
      { text: ", ", bold: false },
      { text: "establecida", bold: true },
      { text: " y ", bold: false },
      { text: "reconocida", bold: true },
      {
        text: ". Esto nos permite mantenernos actualizados, conectados con el entorno económico y ",
        bold: false,
      },
      { text: "comprometidos", bold: true },
      { text: " con el ", bold: false },
      { text: "desarrollo", bold: true },
      { text: " ordenado del sector inmobiliario.", bold: false },
    ],
  },
  {
    logo: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-5-6.png",
    logoAlt: "Contraloría del Estado",
    title: "Contraloría del Estado",
    description:
      "Nuestra relación con la Contraloría del Estado refleja que operamos bajo lineamientos claros de",
    highlights: [
      { text: " legalidad", bold: true },
      { text: ", ", bold: false },
      { text: "cumplimiento", bold: true },
      { text: " normativo y buenas prácticas administrativas. Esto ", bold: false },
      { text: "garantiza", bold: true },
      {
        text: " que nuestros procesos se conduzcan de manera responsable y alineada a las regulaciones estatales vigentes.",
        bold: false,
      },
    ],
  },
  {
    logo: "https://c.animaapp.com/mmjez8tnoH67O3/img/pro-integridad-empresas-logo-design-2-6.png",
    logoAlt: "PROFECO",
    title: "PROFECO (Procuraduría Federal del Consumidor)",
    description: "Ruiz Inmobiliaria opera bajo los",
    highlights: [
      { text: " lineamientos", bold: true },
      {
        text: " de PROFECO, garantizando prácticas comerciales claras, contratos transparentes y el ",
        bold: false,
      },
      { text: "respeto", bold: true },
      { text: " total a los ", bold: false },
      { text: "derechos", bold: true },
      { text: " de nuestros clientes. Esta afiliación ", bold: false },
      { text: "respalda", bold: true },
      { text: " nuestro compromiso con la legalidad, la honestidad y la ", bold: false },
      { text: "confianza", bold: true },
      { text: " en cada proceso.", bold: false },
    ],
  },
];

export const CertificationInfoSection = (): JSX.Element => {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-16 px-5 py-14 md:gap-20 md:px-10 md:py-20">
        <div className="flex w-full max-w-[1440px] flex-col items-start gap-10 md:gap-14">
          <p className="w-full [font-family:'Montserrat',Helvetica] text-center text-lg font-medium leading-relaxed tracking-[0] text-[#4D4C4F] md:text-2xl">
            Trabajo honrado, duro y consistente nos han dado la dicha de haber
            estado involucrados de diversas formas en más de {DEVELOPMENTS_PARTICIPATED_TEXT} desarrollos.
            <br />
            Dando atención y sirviendo a más de {formatFigure(CLIENTS_SERVED)} clientes.
          </p>

          <RemoteImage
            className="h-[260px] w-full rounded-xl object-cover md:h-[404px]"
            alt="Certificaciones Ruiz Inmobiliaria"
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/cm-1.png"
          />
        </div>

        <Card className="w-full border-0 bg-[#FCB640] shadow-none">
          <CardContent className="flex flex-wrap items-center justify-center px-6 py-8 md:px-20 md:py-10">
            <p className="flex-1 [font-family:'Montserrat',Helvetica] text-center tracking-[0] text-white">
              <span className="text-2xl font-semibold leading-tight md:text-4xl">
                Contamos con
                <br />
              </span>
              <span className="text-3xl font-bold leading-tight md:text-6xl">
                certificación y respaldo
                <br />
              </span>
              <span className="text-lg font-medium leading-relaxed md:text-2xl">
                con diversidad de instituciones para dar confianza en todos
                nuestros tratos.
              </span>
            </p>
          </CardContent>
        </Card>

        <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 md:gap-14">
          {certifications.map((cert, index) => (
            <article
              key={index}
              className="flex w-full flex-col items-center gap-6 rounded-2xl border border-[#FFFFFF] bg-[#FFFFFF] p-6 md:flex-row md:gap-10 md:p-10"
            >
              <RemoteImage
                className="h-auto w-[220px] object-contain md:w-[270px]"
                alt={cert.logoAlt}
                src={cert.logo}
              />

              <div className="flex-1 [font-family:'Montserrat',Helvetica] text-[#4D4C4F]">
                <h3 className="text-xl font-bold leading-tight md:text-3xl">{cert.title}</h3>
                <p className="mt-3 text-base leading-relaxed md:text-xl">
                  <span className="font-medium">{cert.description}</span>
                  {cert.highlights.map((highlight, hIndex) => (
                    <span key={hIndex} className={highlight.bold ? "font-semibold" : "font-medium"}>
                      {highlight.text}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="w-full max-w-[1160px] [font-family:'Montserrat',Helvetica] text-center tracking-[0] text-[#4D4C4F]">
          <h3 className="text-3xl font-bold leading-tight text-[#FCB640] md:text-5xl">
            ¿Qué significa esto para nuestros clientes?
          </h3>
          <p className="mt-6 text-base font-medium leading-relaxed md:text-2xl">
            Significa que <span className="font-semibold">tu inversión</span> está
            <span className="font-semibold"> respaldada</span> por una empresa
            <span className="font-semibold"> formal</span>, que opera con
            responsabilidad, cumple con sus obligaciones y se somete a estándares
            institucionales.
            <br />
            <br />
            En Ruiz Inmobiliaria, cada terreno representa más que una propiedad:
            representa seguridad, claridad y tranquilidad para tu patrimonio.
            <br />
            <br />
            Invertir con <span className="font-semibold">confianza</span> también
            es parte de tu legado.
          </p>
        </div>
      </div>
    </section>
  );
};

