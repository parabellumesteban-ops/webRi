import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { SeoHead } from "../../components/SeoHead";
import { SimplePageHeader } from "../../components/SimplePageHeader";
import {
  PRIVACY_NOTICE_DOCUMENT_KEY,
  PRIVACY_NOTICE_LAST_UPDATED,
  PRIVACY_NOTICE_VALIDATED,
} from "../../lib/legal";

// Texto transcrito del documento "AVISO DE PRIVACIDAD – RUIZ INMOBILIARIA"
// (clave RH-FO-011, MAR 2024) proporcionado por el cliente. Solo se corrigieron
// saltos de línea y se omitió la marca de paginación "Página 2 de 2".
// Los encabezados h2 son etiquetas de navegación añadidas para accesibilidad;
// no forman parte del texto legal.
//
// PENDIENTE DE REVISIÓN LEGAL: ver DOCUMENTACION_TECNICA.md §15. No modificar
// el texto sin autorización del cliente o su abogado.

const ADDRESS = "Loma Seca Nte. 8109, Loma Dorada Delegación a, 45402 Tonalá, Jal.";
const EMAIL = "contacto@ruizinmobiliaria.com";

const emailLink = (
  <a
    href={`mailto:${EMAIL}`}
    className="font-semibold underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F]"
  >
    {EMAIL}
  </a>
);

type NoticeSection = {
  id: string;
  heading: string;
  paragraphs: ReactNode[];
};

const sections: NoticeSection[] = [
  {
    id: "responsable",
    heading: "Responsable del tratamiento",
    paragraphs: [
      <>
        El presente Aviso de Privacidad se pone a su disposición, en su carácter de titular de los
        datos personales, en cumplimiento a lo dispuesto por la Ley Federal de Protección de Datos
        Personales en Posesión de los Particulares (en lo sucesivo la “Ley”) y demás disposiciones
        legales aplicables.
      </>,
      <>
        Ruiz Inmobiliaria (en lo sucesivo “LA EMPRESA”), con domicilio en {ADDRESS}, responsable del
        tratamiento de datos personales, con responsabilidad en el tratamiento de datos personales y
        los derechos de privacidad y autodeterminación informativa, hace constar en el presente Aviso
        de Privacidad lo siguiente:
      </>,
    ],
  },
  {
    id: "inciso-a",
    heading: "a) Datos personales que se tratan",
    paragraphs: [
      <>
        a) Los datos personales que tratará LA EMPRESA, incluyendo la obtención, uso, divulgación o
        almacenamiento de tales datos por cualquier medio, su acceso, manejo, aprovechamiento,
        transferencia o disposición, son aquellos que han sido previamente proporcionados o serán
        proporcionados a LA EMPRESA por ser necesarios para el proceso de promoción de inmuebles y/o
        elaboración de contratos correspondientes en la compra venta y/o renta de inmuebles.
      </>,
      <>
        Entre otros, podrán recabarse los siguientes datos personales: nombre, fecha y lugar de
        nacimiento, nacionalidad, documento migratorio (en su caso), domicilio, correo electrónico,
        ocupación, comprobante de ingresos.
      </>,
    ],
  },
  {
    id: "inciso-b",
    heading: "b) Finalidades del tratamiento",
    paragraphs: [
      <>
        b) LA EMPRESA recaba, utiliza, almacena, transfiere o transmite sus datos personales, en la
        medida que la ley lo permite, para llevar a cabo, de manera enunciativa, las siguientes
        finalidades: promoción de inmuebles y elaboración de contratos correspondientes en la compra
        venta y/o renta de inmuebles y/o terrenos.
      </>,
      <>
        LA EMPRESA podrá hacer uso de sus datos personales para otras finalidades, siempre y cuando
        dichas finalidades sean compatibles y puedan considerarse análogas a las anteriores.
      </>,
      <>
        Los datos personales serán tratados únicamente por el tiempo necesario a fin de cumplir con
        las finalidades descritas y/o de conformidad con lo que establezcan las disposiciones legales
        aplicables.
      </>,
    ],
  },
  {
    id: "inciso-c",
    heading: "c) Tratamiento por empresas afiliadas, subsidiarias o terceros",
    paragraphs: [
      <>
        c) Los datos personales serán tratados por LA EMPRESA y/o las empresas afiliadas o
        subsidiarias de la misma y/o terceros que tengan a su cargo el tratamiento de los datos
        personales del suscrito por instrucciones de LA EMPRESA, mismas que deberán de cumplir con el
        presente Aviso de Privacidad.
      </>,
    ],
  },
  {
    id: "inciso-d",
    heading: "d) Medidas de seguridad",
    paragraphs: [
      <>
        d) LA EMPRESA establecerá y mantendrá las medidas de seguridad, administrativas, técnicas y
        físicas que permitan proteger los datos personales contra daño, pérdida, alteración,
        destrucción o el uso, acceso o tratamiento no autorizado, incluyendo la custodia de los
        documentos que contengan los datos personales en archivos bajo llave.
      </>,
      <>
        Estas medidas no serán menores de aquellas que mantenga LA EMPRESA para el manejo de su propia
        información.
      </>,
    ],
  },
  {
    id: "inciso-e",
    heading: "e) Derechos ARCO y revocación del consentimiento",
    paragraphs: [
      <>
        e) El cliente, como titular de sus datos personales, podrá ejercer los derechos de acceso,
        cancelación, rectificación y oposición, respecto de sus datos.
      </>,
      <>
        El ejercicio de estos derechos se iniciará a través de la presentación de una solicitud por
        escrito ante el Comité de Protección de Datos Personales de LA EMPRESA, quien puede ser
        localizado en el domicilio ubicado en {ADDRESS}, o bien, contactado vía correo electrónico a
        la dirección {emailLink}.
      </>,
      <>
        Asimismo, el candidato podrá revocar, en todo momento, el consentimiento que haya otorgado y
        que fuere necesario para el tratamiento de sus datos personales.
      </>,
    ],
  },
  {
    id: "inciso-f",
    heading: "f) Modificaciones al Aviso de Privacidad",
    paragraphs: [
      <>
        f) LA EMPRESA se reserva el derecho de enmendar o modificar el presente Aviso de Privacidad
        como estime conveniente.
      </>,
      <>
        LA EMPRESA pondrá a disposición el Aviso de Privacidad actualizado cuando se hagan cambios
        significativos al mismo, así como cuando se requiera recabar nuevamente su consentimiento.
      </>,
    ],
  },
  {
    id: "inciso-g",
    heading: "g) Comité de Protección de Datos Personales",
    paragraphs: [
      <>
        g) El Comité de Protección de Datos Personales de LA EMPRESA dará trámite a las solicitudes de
        acceso, rectificación, cancelación y oposición de los mismos, el cual puede ser contactado en
        el domicilio ubicado en {ADDRESS}, o a través del correo electrónico que ha quedado precisado
        en el inciso e) que antecede, mismo que estará a sus órdenes para cualquier duda o comentario
        respecto al presente Aviso de Privacidad.
      </>,
    ],
  },
  {
    id: "consentimiento",
    heading: "Consentimiento",
    paragraphs: [
      <>
        Al firmar el presente Aviso de Privacidad manifiesto mi conocimiento y conformidad con el
        contenido del mismo, manifiesto expresamente mi consentimiento para que LA EMPRESA lleve a cabo
        el tratamiento de mis datos personales en los términos que en el mismo se señalan.
      </>,
    ],
  },
  {
    id: "autoridad",
    heading: "Protección de derechos ante la autoridad",
    paragraphs: [
      <>
        En términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares
        y su Reglamento (la “Ley”), le informamos que, ante la negativa de respuesta a la solicitud de
        derechos ARCO o inconformidad con la misma, usted puede presentar ante el Instituto Federal de
        Acceso a la Información y Protección de Datos, la correspondiente Solicitud de Protección de
        Derechos en los plazos y términos fijados por el capítulo VII de la Ley y otros relacionados,
        así como los correspondientes del Reglamento.
      </>,
    ],
  },
];

export const AvisoPrivacidad = (): JSX.Element => {
  return (
    <>
      <SeoHead page="avisoPrivacidad" />
      <div className="flex min-h-screen w-full flex-col bg-white">
        <SimplePageHeader />
        <article className="mx-auto flex w-full max-w-[920px] flex-1 flex-col gap-8 px-5 py-12 text-[#4D4C4F] [font-family:'Montserrat',Helvetica] md:py-20">
          <Link
            to="/"
            className="self-start rounded-sm text-base font-semibold underline underline-offset-4 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F] focus-visible:ring-offset-2"
          >
            ← Volver al inicio
          </Link>

          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold uppercase leading-tight md:text-5xl">Aviso de privacidad</h1>
            <p className="text-xl font-semibold uppercase md:text-2xl">Ruiz Inmobiliaria</p>
            <p className="text-sm">Clave: {PRIVACY_NOTICE_DOCUMENT_KEY}</p>
          </header>

          <nav aria-label="Contenido del aviso de privacidad">
            <ul className="flex flex-col gap-1 text-base">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F]"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-titulo`}
              className="flex scroll-mt-6 flex-col gap-3"
            >
              <h2 id={`${section.id}-titulo`} className="text-xl font-semibold leading-snug md:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed md:text-lg">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p className="text-base font-semibold">
            {PRIVACY_NOTICE_VALIDATED
              ? `Fecha de última actualización: ${PRIVACY_NOTICE_LAST_UPDATED}`
              : `Fecha de última actualización según el documento fuente: ${PRIVACY_NOTICE_LAST_UPDATED} (pendiente de confirmar como versión vigente).`}
          </p>

          <Link
            to="/"
            className="self-start rounded-xl bg-[#4D4C4F] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCB640] focus-visible:ring-offset-2"
          >
            Volver al inicio
          </Link>
        </article>
        <Footer />
      </div>
    </>
  );
};
