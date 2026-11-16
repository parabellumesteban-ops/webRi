import { CheckIcon, CrownIcon, UsersIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { RemoteImage } from "../../../../components/RemoteImage";
import { ACTIVE_PROJECTS, CLIENTS_SERVED, formatFigure } from "../../../../lib/businessData";

export const GrowthOpportunityWrapperSection = (): JSX.Element => {
  return (
    <section className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-4 py-12 sm:px-5 md:flex-row md:flex-wrap md:gap-20 md:p-20">
      <div className="flex w-full max-w-[520px] flex-col items-center justify-center gap-10 md:max-w-none md:min-w-[464.5px] md:flex-1 md:gap-20">
        <div className="self-stretch [font-family:'Montserrat',Helvetica] text-center">
          <h2 className="ri-h3 px-2">
            Construimos contigo.
          </h2>
          <h2 className="ri-h3-strong px-2 text-[#FCB640]">
            Juntos Crecemos.
          </h2>
          <p className="ri-body-lg mt-6 max-w-[36ch] px-2">
            Aporta tu terreno y nosotros{" "}
            <span className="font-semibold">aportamos</span> el desarrollo,
            estructura, comercializacion y proceso legal.
          </p>
        </div>

        <div className="h-[90px] self-stretch w-full">
          <RemoteImage
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            alt="Rectangle"
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-4-1.png"
          />
        </div>
      </div>

      <div className="flex w-full max-w-[520px] items-start justify-evenly gap-8 md:max-w-none md:min-w-[191px] md:flex-1 md:flex-wrap md:items-center md:justify-center md:gap-20">
        <Card className="w-[191px] border-0 shadow-none bg-transparent">
          <CardContent className="flex flex-col items-center justify-center p-0 gap-4">
            <UsersIcon className="w-[60px] h-[60px] text-[#4D4C4F]" />
            <p className="font-medium [font-family:'Montserrat',Helvetica] text-[#4D4C4F] text-2xl sm:text-3xl text-center leading-normal w-full max-w-[203px]">
              Clientes que confian en nosotros
            </p>
            <div className="flex items-start gap-1">
              <span className="[font-family:'Montserrat',Helvetica] font-semibold text-[#4D4C4F] text-2xl sm:text-3xl leading-normal">
                {formatFigure(CLIENTS_SERVED)}+
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[191px] border-0 shadow-none bg-transparent">
          <CardContent className="flex flex-col items-center justify-center p-0 gap-4">
            <CrownIcon className="w-[60px] h-[60px] text-[#4D4C4F]" />
            <p className="font-medium [font-family:'Montserrat',Helvetica] text-[#4D4C4F] text-2xl sm:text-3xl text-center leading-normal w-full max-w-[203px]">
              Proyectos activos
            </p>
            <div className="[font-family:'Montserrat',Helvetica] font-semibold text-[#4D4C4F] text-2xl sm:text-3xl leading-normal">
              {formatFigure(ACTIVE_PROJECTS)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full max-w-[520px] flex-col items-center justify-center gap-10 md:max-w-none md:min-w-[464.5px] md:flex-1 md:gap-20">
        <RemoteImage
            loading="lazy"
            decoding="async"
          className="h-[90px] self-stretch w-full object-cover"
          alt="Rectangle"
          src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-3-2.png"
        />

        <div className="flex flex-col items-center justify-center gap-[30px] self-stretch w-full">
          <h3 className="[font-family:'Montserrat',Helvetica] text-center text-3xl sm:text-4xl md:text-[40px] leading-snug md:leading-10 px-2">
            <span className="font-medium text-[#4D4C4F]">Enganches </span>
            <span className="font-medium text-[#FCB640]">accesibles</span>
            <span className="font-medium text-[#4D4C4F]"> y planes </span>
            <span className="font-medium text-[#FCB640]">flexibles</span>
            <span className="font-medium text-[#4D4C4F]">
              . Haz crecer tu patrimonio sin complicaciones.
            </span>
          </h3>

          <Card className="self-stretch w-full rounded-[15px] border-0 shadow-none bg-transparent">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <CheckIcon className="w-[90px] h-[90px] text-[#FCB640]" />
              <div className="[font-family:'Montserrat',Helvetica] text-center">
                <p className="font-bold text-[#4D4C4F] text-2xl sm:text-3xl leading-tight">
                  PLANES{" "}
                  <span className="text-[#FCB640]">
                    DESDE
                    <br />
                  </span>
                </p>
                <p className="ri-h3-strong px-2 text-[#FCB640]">
                  $2,800
                  <br />
                </p>
                <p className="font-bold text-[#FCB640] text-2xl sm:text-3xl leading-tight">
                  MXN
                  <br />
                </p>
                <p className="font-semibold text-[#4D4C4F] text-[15px] leading-[15px]">
                  MENSUALES
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};






