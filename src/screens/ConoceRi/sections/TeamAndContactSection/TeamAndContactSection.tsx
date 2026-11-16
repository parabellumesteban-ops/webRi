import { Footer } from "../../../../components/Footer";
import { Card, CardContent } from "../../../../components/ui/card";
import { RemoteImage } from "../../../../components/RemoteImage";
import { useLazyBackground } from "../../../../lib/useLazyBackground";

const teamMembers = [
  { role: "Dirección General:", name: "Jhonathan Ruiz" },
  { role: "Encargada de Procesos:", name: "Gema Esmeralda" },
  { role: "Finanzas:", name: "Jessica Sandoval" },
  { role: "Cobranza:", name: "Áxel Díaz" },
];

const coreValues = [
  "Lealtad",
  "Calidez",
  "Honestidad",
  "Constancia",
  "Humildad",
];

export const TeamAndContactSection = (): JSX.Element => {
  // Fondos fuera del primer viewport: se descargan al acercarse (antes ~33 MB al abrir la página).
  const bg1 = useLazyBackground<HTMLElement>("https://c.animaapp.com/mmjez8tnoH67O3/img/frame-37.png");
  const bg2 = useLazyBackground<HTMLElement>("https://c.animaapp.com/mmjez8tnoH67O3/img/frame-37-1.png");
  const bg3 = useLazyBackground<HTMLElement>("https://c.animaapp.com/mmjez8tnoH67O3/img/frame-37-2.png");
  const bg4 = useLazyBackground<HTMLDivElement>("https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-8-2.png");
  const bg5 = useLazyBackground<HTMLElement>("https://c.animaapp.com/mmjez8tnoH67O3/img/head.png");
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center gap-20 w-full">
          <header ref={bg1.ref} style={bg1.style} className="flex flex-col min-h-[200px] sm:min-h-[270px] items-center justify-center gap-10 sm:gap-20 w-full py-10 sm:py-0 bg-cover bg-center">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 flex-1 w-full px-4">
              <RemoteImage
                loading="lazy"
                decoding="async"
                className="w-20 h-14 sm:w-[134px] sm:h-[93px]"
                alt="Earth"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/earth-3.png"
              />
              <h2 className="flex flex-wrap items-center justify-center [font-family:'Montserrat',Helvetica] font-normal text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight sm:tracking-[-3.60px] leading-tight sm:leading-[60px]">
                <span className="font-medium text-white tracking-tight sm:tracking-[-2.16px]">
                  DE{" "}
                </span>
                <span className="font-bold text-white tracking-tight sm:tracking-[-2.16px]">
                  TIERRA
                </span>
                <span className="font-medium text-white tracking-tight sm:tracking-[-2.16px]">
                  {" "}
                  SOMOS
                </span>
              </h2>
            </div>
          </header>

          <div className="flex flex-wrap max-w-[1440px] items-center justify-center gap-10 sm:gap-16 md:gap-20 px-6 sm:px-10 md:px-20 py-0 w-full">
            <div className="flex w-full md:min-w-[398px] items-center justify-center gap-2.5 flex-1 grow">
              <p className="flex-1 max-w-[920px] [font-family:'Montserrat',Helvetica] text-left font-normal text-transparent text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0] leading-relaxed sm:leading-[24px] md:leading-[30px]">
                <span className="text-[#4D4C4F]">
                  La historia de Ruiz Inmobiliaria se remonta a 50 años atrás,
                  cuando Juan&nbsp;&nbsp;Ruiz y sus hijos recorrían los pueblos
                  de{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">Jalisco</span>
                <span className="text-[#4D4C4F]">
                  {" "}
                  vendiendo frutas y verduras en las frescas mañanas. Su
                  constancia y arduo trabajo permitieron la&nbsp;&nbsp;expansión
                  de su negocio, haciéndolos conocidos en más lugares.
                  <br />
                  Con el tiempo, algunos de los hijos de Don Juan decidieron
                  emprender en&nbsp;&nbsp;otros rubros,
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  {" "}
                  incursionando con éxito
                </span>
                <span className="text-[#4D4C4F]">
                  {" "}
                  en la comercialización de automóviles y posteriormente en el
                  sector inmobiliario.
                  <br />A pesar de la diferencia entre la venta de productos
                  agrícolas y bienes&nbsp;&nbsp;raíces, las lecciones aprendidas
                  y la dedicación para brindar un buen servicio se transfirieron
                  de manera exitosa a un ámbito donde la{" "}
                </span>
                <span className="font-semibold text-[#4D4C4F]">
                  confianza es&nbsp;&nbsp;primordial
                </span>
                <span className="text-[#4D4C4F]">
                  . La familia Ruiz se distinguió por su palabra,
                  manteniendo&nbsp;&nbsp;siempre la honestidad y un trato
                  cordial en sus negocios.
                  <br />
                  Sin embargo, el crecimiento de la demanda hizo que esta forma
                  tradicional de hacer negocios ya no fuera suficiente. No era
                  lo mismo vender unas&nbsp;&nbsp;cuantas casas al año que
                  atender a cientos de clientes en un
                  proyecto&nbsp;&nbsp;inmobiliario.
                  <br />
                  Fue entonces cuando
                </span>
                <span className="font-bold text-[#4D4C4F]">&nbsp;</span>
                <span className="font-semibold text-[#4D4C4F]">
                  nació Ruiz Inmobiliaria
                </span>
                <span className="text-[#4D4C4F]">
                  , con la visión de profesionalizar y dar continuidad a los
                  valores familiares. Se buscó crear un
                  espacio&nbsp;&nbsp;único, con un equipo profesional y la meta
                  de llevar todo lo aprendido&nbsp;&nbsp;hacia un futuro
                  prometedor.
                </span>
              </p>
            </div>

            <Card className="flex flex-col w-full md:min-w-[398px] items-center justify-center gap-2.5 flex-1 grow border-0 shadow-none">
              <CardContent className="p-0 flex flex-col gap-2.5 w-full">
                <RemoteImage
                loading="lazy"
                decoding="async"
                  className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[540px] object-cover"
                  alt="Rectangle"
                  src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-8-1.png"
                />
                <blockquote className="[font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-xl sm:text-2xl md:text-3xl lg:text-[40px] text-center tracking-[0] leading-relaxed sm:leading-8 md:leading-9 lg:leading-10 px-4">
                  <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-xl sm:text-2xl md:text-3xl lg:text-[40px] tracking-[0] leading-relaxed sm:leading-8 md:leading-9 lg:leading-10">
                    &quot;Pa que no olviden de dónde vienen&quot;
                    <br />
                  </p>
                  <footer className="font-semibold">- Ana María Castro</footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>

        <article className="flex flex-col items-center justify-center gap-20 px-0 py-20 w-full">
          <header ref={bg2.ref} style={bg2.style} className="flex flex-col min-h-[200px] sm:min-h-[270px] gap-10 sm:gap-20 w-full py-10 sm:py-0 bg-cover bg-center items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 flex-1 w-full px-4">
              <RemoteImage
                loading="lazy"
                decoding="async"
                className="w-20 h-14 sm:w-[134px] sm:h-[93px]"
                alt="Earth"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/earth-3-1.png"
              />
              <h2 className="flex flex-wrap items-center justify-center [font-family:'Montserrat',Helvetica] font-normal text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight sm:tracking-[-3.60px] leading-tight sm:leading-[60px]">
                <span className="font-medium text-white tracking-tight sm:tracking-[-2.16px]">
                  EN{" "}
                </span>
                <span className="font-bold text-white tracking-tight sm:tracking-[-2.16px]">
                  CRECIMIENTO
                </span>
                <span className="font-medium text-white tracking-tight sm:tracking-[-2.16px]">
                  {" "}
                  CONSTANTE
                </span>
              </h2>
            </div>
          </header>

          <div className="flex-wrap max-w-[1440px] gap-[0px_0px] w-full flex items-center justify-center">
            <div className="flex-wrap gap-[0px_0px] flex-1 grow flex items-center justify-center">
              <div className="flex flex-wrap items-center justify-center gap-[0px_0px] px-6 sm:px-10 md:px-20 py-0 flex-1 grow">
                <div className="flex-1 max-w-[980px] [font-family:'Montserrat',Helvetica] text-left font-normal text-[#4D4C4F] text-lg sm:text-xl md:text-2xl lg:text-[30px] tracking-[0] leading-relaxed sm:leading-8 md:leading-9">
                  <h3 className="ri-h3">
                    Visión y Origen de Ruiz Inmobiliaria
                    <br />
                  </h3>
                  <p className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed sm:leading-[24px] md:leading-[28px] lg:leading-[30px]">
                    El dar frente ante las oportunidades crecientes Jhonathan
                    Ruiz tiene una&nbsp;&nbsp;visión. Generar un espacio, un
                    equipo, y un método de trabaja. Ante él un&nbsp;&nbsp;reto,
                    en la región había un historial de muchas empresas que
                    habían sido&nbsp;&nbsp;manejadas, en el mejor de los casos,
                    con poco profesionalismo y en el&nbsp;&nbsp;peor de los
                    casos de forma ilegal y con alevosía. <br />
                    <br />
                  </p>
                  <h3 className="ri-h3">
                    Formación del Equipo Fundador <br />
                  </h3>
                  <p className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed sm:leading-[24px] md:leading-[28px] lg:leading-[30px]">
                    Para materializar esta visión y la misión de la naciente
                    Ruiz Inmobiliaria&nbsp;&nbsp;(RI), Jhonathan reunió un
                    equipo íntimo, caracterizado por su dinamismo&nbsp;&nbsp;y
                    creatividad. <br />
                    <br />
                  </p>
                  <h3 className="ri-h3">
                    Crecimiento y Enfoque en la Calidad
                    <br />
                  </h3>
                  <p className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed sm:leading-[24px] md:leading-[28px] lg:leading-[30px]">
                    Desde su inicio, RI ha experimentado un crecimiento anual
                    superior al&nbsp;&nbsp;100%. Sin embargo, Jhonathan planteó
                    una cuestión fundamental: ¿es&nbsp;&nbsp;significativo el
                    crecimiento cuantitativo sin un paralelo aumento en
                    la&nbsp;&nbsp;calidad? <br />
                    <br />
                  </p>
                  <h3 className="ri-h3">
                    Desarrollo Integral
                    <br />
                  </h3>
                  <p className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed sm:leading-[24px] md:leading-[28px] lg:leading-[30px]">
                    En consecuencia, RI ha enfocado sus esfuerzos no solo en la
                    expansión de&nbsp;&nbsp;su personal, sino también en la
                    obtención de certificaciones, reconocimientos y la formación
                    continua de su equipo. Este compromiso con
                    la&nbsp;&nbsp;integridad ha llevado a la empresa a ser
                    reconocida por la Contraloría del&nbsp;&nbsp;estado con la
                    certificación PRO INTEGRIDAD.
                    <br />
                    <br />
                  </p>
                  <h3 className="ri-h3">
                    Filosofía Empresarial
                    <br />
                  </h3>
                  <p className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed sm:leading-[24px] md:leading-[28px] lg:leading-[30px]">
                    La máxima que guía a Ruiz Inmobiliaria es la mejora
                    continua: cada día,&nbsp;&nbsp;mejores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="flex flex-col items-center justify-center gap-20 px-0 py-20 w-full">
          <header ref={bg3.ref} style={bg3.style} className="flex flex-col min-h-[200px] sm:min-h-[270px] gap-10 sm:gap-20 w-full py-10 sm:py-0 bg-cover bg-center items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 flex-1 w-full px-4">
              <RemoteImage
                loading="lazy"
                decoding="async"
                className="w-20 h-14 sm:w-[134px] sm:h-[93px]"
                alt="Earth"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/earth-3-2.png"
              />
              <h2 className="flex flex-wrap items-center justify-center [font-family:'Montserrat',Helvetica] font-normal text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight sm:leading-[60px]">
                <span className="font-bold text-white tracking-tight sm:tracking-[-2.16px]">
                  CONCRETAMENTE
                </span>
                <span className="font-medium text-white tracking-[0]">
                  {" "}
                  FUERTES
                </span>
              </h2>
            </div>
          </header>

          <div className="flex flex-wrap max-w-[1440px] items-center justify-center gap-10 sm:gap-16 md:gap-20 px-6 sm:px-10 md:px-20 py-0 w-full">
            <div className="flex w-full md:min-w-[398px] items-center justify-center gap-2.5 flex-1 grow">
              <div className="flex-1 max-w-[920px] [font-family:'Montserrat',Helvetica] text-left font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0] leading-relaxed sm:leading-[24px] md:leading-[30px]">
                <p className="ri-body">
                  Con el tiempo, RI ha evolucionado desde la comercialización de
                  terrenos&nbsp;&nbsp;hasta ofrecer una amplia gama de
                  servicios. Este crecimiento se funda menta en nuestra misión,
                  visión y valores.
                  <br />
                  Creemos que el <span className="font-semibold">sueño vital</span>,
                  ese anhelo profundo y necesario de cada&nbsp;&nbsp;persona,
                  a menudo se relaciona con poseer un espacio propio. Por
                  ello,&nbsp;&nbsp;aspiramos a ser el mejor aliado para
                  concretar este maravilloso sueño.
                  <br />
                  <br />
                </p>
                <p className="font-semibold">Misión:</p>
                <p className="ri-body">
                  {" "}
                  Ser el aliado en el cumplimiento del sueño vital de
                  nuestros&nbsp;&nbsp;clientes. <br />
                  <br />
                </p>
                <p className="font-semibold">Visión</p>
                <p className="ri-body">
                  : Ser la primera opción en desarrollo inmobiliario de México,
                  logran do que RI sea sinónimo de confianza en el servicio.{" "}
                  <br />
                  <br />
                  Para que depositen su confianza en nosotros para un sueño tan
                  impor tante, nos guiamos por{" "}
                </p>
                <span className="font-semibold">valores esenciales </span>
                <p className="ri-body">
                  que rigen nuestro actuar diario.&nbsp;&nbsp;Inspirados en
                  nuestras experiencias y logros, adoptamos los
                  siguientes&nbsp;&nbsp;principios:
                  <br />
                  <br />
                  {coreValues.map((value, index) => (
                    <span key={index}>
                      • {value}
                      <br />
                    </span>
                  ))}
                  <br />
                  Con la mirada puesta en el futuro, buscamos un crecimiento
                  continuo&nbsp;&nbsp;enfocado en la calidad.
                </p>
              </div>
            </div>

            <div ref={bg4.ref} style={bg4.style} className="inline-flex flex-col items-center justify-center gap-2.5 w-full md:w-auto bg-cover bg-center">
              <RemoteImage
                loading="lazy"
                decoding="async"
                className="w-full max-w-[540px] h-auto aspect-square object-cover"
                alt="Rectangle"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-8-2.png"
              />
            </div>
          </div>
        </article>

        <article className="flex flex-col items-center justify-center gap-20 px-0 py-20 w-full">
          <header ref={bg5.ref} style={bg5.style} className="flex flex-col min-h-[200px] sm:min-h-[270px] items-center justify-center gap-10 sm:gap-20 w-full py-10 sm:py-0 bg-cover bg-center">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-5 flex-1 w-full px-4">
              <RemoteImage
                loading="lazy"
                decoding="async"
                className="w-20 h-14 sm:w-[134px] sm:h-[93px]"
                alt="Earth"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/earth-3-3.png"
              />
              <h2 className="flex flex-wrap items-center justify-center [font-family:'Montserrat',Helvetica] font-normal text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight sm:tracking-[-3.60px] leading-tight sm:leading-[60px]">
                <span className="font-bold text-white tracking-tight sm:tracking-[-2.16px]">
                  SÓLIDO{" "}
                </span>
                <span className="font-medium text-white tracking-tight sm:tracking-[-2.16px]">
                  COMO EL HIERRO
                </span>
              </h2>
            </div>
          </header>

          <div className="flex-col max-w-[1440px] gap-10 w-full flex items-center justify-center">
            <div className="gap-5 sm:gap-[30px] px-6 sm:px-10 md:px-20 py-0 w-full flex flex-wrap items-center justify-center">
              <div className="flex flex-wrap w-full md:min-w-[398px] items-center justify-center gap-[10px_10px] flex-1 grow">
                <div className="flex-1 max-w-[920px] [font-family:'Montserrat',Helvetica] text-left font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0] leading-relaxed sm:leading-[24px] md:leading-[30px]">
                  {teamMembers.map((member, index) => (
                    <p key={index}>
                      <span className="font-bold">{member.role}</span>
                      <span className="ri-body">
                        {" "}
                        {member.name}
                        <br />
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <RemoteImage
                loading="lazy"
                decoding="async"
                className="w-full md:flex-1 md:min-w-[430px] md:grow h-auto max-h-[150px] sm:max-h-[200px] md:max-h-[218.75px] object-contain"
                alt="Sin ttulo"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/sin-t-tulo-1-1.png"
              />
            </div>

            <div className="flex flex-wrap w-full md:min-w-[398px] items-center justify-center gap-[0px_0px] px-6 sm:px-10 md:px-20 py-0 w-full">
              <p className="flex-1 max-w-[920px] [font-family:'Montserrat',Helvetica] text-left font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0] leading-relaxed sm:leading-[24px] md:leading-[30px]">
                Estamos orgullosos de nuestro equipo, dando todos los días el empuje hacia un mejor mañana. Contamos con diversas áreas que dan servicio a nuestros clientes y la misión y visión RI. Nuestro equipo directivo nos enorgullece. Contamos con diversidad de experiencias y perfiles que han ayudado a convertir el RI en lo que es hoy. Dirigiendo <span className="font-semibold">equipos dinámicos</span> que logran los exitoso, día a día. Es un gusto poder presentarlos.
              </p>
            </div>
          </div>
        </article>

        <Card className="flex flex-wrap max-w-[1440px] items-center justify-center gap-[0px_0px] w-full border-0 shadow-none">
          <CardContent className="inline-flex flex-wrap w-full md:min-w-[430px] h-auto md:h-[660px] gap-[0px_0px] px-0 py-10 md:py-20 items-center justify-center p-0">
            <RemoteImage
                loading="lazy"
                decoding="async"
              className="w-full md:w-[540px] h-auto md:h-[660px] md:mt-[-80.00px] md:mb-[-80.00px] object-cover"
              alt="Rectangle"
              src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-7-1.png"
            />
          </CardContent>

          <CardContent className="w-full md:min-w-[430px] gap-[0px_0px] px-6 sm:px-10 md:px-20 py-10 md:py-[60px] flex-1 grow flex flex-wrap items-center justify-center">
            <div className="flex-1 self-stretch ri-body">
              <h3 className="ri-h3-strong">
                Javier Ruiz Coronado
                <br />
              </h3>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight md:leading-snug">
                Socio fundador
                <br />
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-7 md:leading-8">
                <br />
                Sin duda, RI no existiría sin nuestro querido socio fundador,
                Don Javier Ruiz.
                <br />
                Don Javier fue siempre un hombre que inspiraba confianza con su
                palabra. Un hombre honesto, que nos marcó con su sencillez,
                calidez y generosidad; cualidades que hoy buscamos honrar y
                llevar con nosotros cada día.
                <br />
                Lo extrañamos profundamente y, con orgullo, llevamos el nombre
                Ruiz en honor a él y a todos aquellos que se nos han adelantado.
                <br />
                <br />
                Gracias, Don Javier. Descanse en paz.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </section>
  );
};











