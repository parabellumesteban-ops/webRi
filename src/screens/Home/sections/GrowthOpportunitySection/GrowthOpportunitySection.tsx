import { CheckIcon, CrownIcon, UsersIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { useEffect, useRef, useState } from "react";

export const GrowthOpportunitySection = (): JSX.Element => {
  const [clientCount, setClientCount] = useState(2400);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Increment counter every 6 seconds by a small random amount (1-3)
    const interval = setInterval(() => {
      setClientCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      icon: UsersIcon,
      label: "Clientes que confian en nosotros",
      value: "2400+",
      iconSize: "w-[60px] h-[77.5px]",
    },
    {
      icon: CrownIcon,
      label: "Proyectos activos",
      value: "10",
      iconSize: "w-[60px] h-[60px]",
    },
  ];

  return (
    <section ref={sectionRef} className="flex flex-wrap max-w-[1440px] items-center justify-center gap-20 p-20 w-full mx-auto">
      <div className="flex flex-col min-w-[464.5px] items-center justify-center gap-20 flex-1">
        <div className="self-stretch [font-family:'Montserrat',Helvetica] text-center">
          <h2 className="font-medium text-[#4D4C4F] text-6xl leading-[60px]">
            Construimos contigo.
          </h2>
          <h2 className="font-bold text-[#FCB640] text-6xl leading-[60px]">
            Juntos Crecemos.
          </h2>
          <p className="font-medium text-[#4D4C4F] text-3xl leading-[30px] mt-[30px]">
            Aporta tu terreno y nosotros{" "}
            <span className="font-semibold">aportamos</span> el desarrollo,
            estructura, comercializacion y proceso legal.
          </p>
        </div>

        <div className="h-[90px] self-stretch w-full">
          <img
            className="w-full h-full object-cover"
            alt="Handshake"
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-4-1.png"
          />
        </div>
      </div>

      <div className="flex flex-wrap min-w-[191px] items-center justify-center gap-20 flex-1">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="w-[191px] border-0 shadow-none bg-transparent"
          >
            <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
              <stat.icon className={`${stat.iconSize} text-[#4D4C4F]`} />
              <p className="w-[203px] [font-family:'Montserrat',Helvetica] font-medium text-[#4D4C4F] text-3xl text-center leading-normal">
                {stat.label}
              </p>
              <div className="flex items-center gap-1">
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-[#4D4C4F] text-3xl leading-normal">
                  {index === 0 ? `${clientCount}+` : stat.value}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col min-w-[464.5px] items-center justify-center gap-20 flex-1">
        <img
          className="h-[90px] self-stretch w-full object-cover"
          alt="Family"
          src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-3-2.png"
        />

        <div className="flex flex-col items-center justify-center gap-[30px] self-stretch w-full">
          <h3 className="self-stretch [font-family:'Montserrat',Helvetica] font-medium text-[#4D4C4F] text-[40px] text-center leading-10">
            Enganches <span className="text-[#FCB640]">accesibles</span> y
            planes <span className="text-[#FCB640]">flexibles</span>. Haz crecer
            tu patrimonio sin complicaciones.
          </h3>

          <Card className="self-stretch w-full border-0 shadow-none bg-transparent rounded-[15px]">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <CheckIcon className="w-[90px] h-[90px] text-[#FCB640]" />

              <div className="self-stretch [font-family:'Montserrat',Helvetica] text-center">
                <p className="font-bold text-[#4D4C4F] text-3xl leading-[60px]">
                  PLANES{" "}
                  <span className="text-[#FCB640]">
                    DESDE
                    <br />
                  </span>
                </p>
                <p className="font-bold text-[#FCB640] text-6xl leading-[60px]">
                  $2,800
                  <br />
                </p>
                <p className="font-bold text-[#FCB640] text-3xl leading-[30px]">
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
