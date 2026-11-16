import { CheckIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { RemoteImage } from "../../../../components/RemoteImage";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const introText =
  "En Ruiz Inmobiliaria impulsamos proyectos disenados para crear patrimonio de una manera real y accesible. Cada desarrollo nace bajo una vision clara: ofrecer espacios con potencial de crecimiento, buena ubicacion y planes de pago flexibles que permitan a mas familias dar el paso hacia su propio legado.";

const galleryImages = [
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-2-1.png",
    alt: "Project 1",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-9.png",
    alt: "Project 2",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-10.png",
    alt: "Project 3",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-7.png",
    alt: "Project 4",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-8.png",
    alt: "Project 5",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-6.png",
    alt: "Project 6",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-3-1.png",
    alt: "Project 7",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-4-2.png",
    alt: "Project 8",
  },
  {
    src: "https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-5.png",
    alt: "Project 9",
  },
];

const pricingFeatures = [
  {
    title: "ENGANCHE",
    subtitle: "DESDE",
    price: "$15,000",
    currency: "MXN",
    additional: "",
  },
  {
    title: "PLANES",
    subtitle: "DESDE",
    price: "$2,800",
    currency: "MXN",
    additional: "MENSUALES",
  },
];

const headlineText =
  "Enganches accesibles y planes flexibles. Haz crecer tu patrimonio sin complicaciones.";

export const ProjectGallerySection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-20 px-0 py-20">
        <div className="flex w-full flex-col items-center justify-center gap-20">
          <div className="flex w-full flex-wrap items-center justify-center gap-[60px] px-5 py-0 md:px-20">
            <p className="flex-1 ri-body text-center">{introText}</p>
          </div>

          <div className="relative w-full max-w-[1440px]">
            <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center px-5 md:hidden">
              <RemoteImage
                className="h-[220px] w-full rounded-xl object-cover"
                alt={galleryImages[activeIndex].alt}
                src={galleryImages[activeIndex].src}
              />

              <button
                onClick={handlePrevious}
                className="absolute left-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-[#4D4C4F]" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F]"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-[#4D4C4F]" />
              </button>
            </div>

            <div className="relative hidden h-[360px] w-full md:block">
              <div className="absolute top-0 z-10 h-[25%] w-full rounded-[720px/45px] bg-white" />

              <div className="absolute top-[12.5%] h-[75%] w-full overflow-hidden">
                <div className="relative flex h-full w-full items-center justify-center">
                  <div
                    className="flex items-center gap-8 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(calc(50% - ${activeIndex * 376}px - 180px))`,
                    }}
                  >
                    {galleryImages.map((image, index) => {
                      const offset = Math.abs(index - activeIndex);
                      const isActive = index === activeIndex;

                      return (
                        <div
                          key={index}
                          className="relative flex-shrink-0 transition-all duration-500"
                          style={{
                            opacity: isActive ? 1 : Math.max(0.3, 1 - offset * 0.3),
                            transform: `scale(${isActive ? 1 : Math.max(0.85, 1 - offset * 0.1)})`,
                          }}
                        >
                          <RemoteImage
                            className="h-[270px] w-[360px] object-cover"
                            alt={image.alt}
                            src={image.src}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handlePrevious}
                    className="absolute left-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F]"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-8 w-8 text-[#4D4C4F]" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F]"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-8 w-8 text-[#4D4C4F]" />
                  </button>
                </div>
              </div>

              <div className="absolute top-[75%] h-[25%] w-full rounded-[720px/45px] bg-white" />
            </div>
          </div>
        </div>

        <div className="flex h-[120px] w-full items-center justify-center gap-3 overflow-hidden px-4 py-0 sm:gap-5 md:gap-[90px] md:px-20">
          <Separator className="h-[3px] w-[72px] bg-[#FCB640] sm:w-[140px] md:w-[360px]" />

          <RemoteImage
            className="h-[88px] w-[88px] object-cover sm:h-[110px] sm:w-[110px] md:h-[120px] md:w-[120px]"
            alt="Crown logo"
            src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-5-2.png"
          />

          <Separator className="h-[3px] w-[72px] bg-[#FCB640] sm:w-[140px] md:w-[360px]" />
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-[10px]">
          <div className="flex w-full max-w-[1440px] flex-1 flex-wrap items-center justify-between gap-10 md:gap-[80px]">
            <div className="flex flex-1 flex-wrap items-center justify-center gap-[10px]">
              <RemoteImage
                className="h-[431px] flex-1 object-cover"
                alt="Contract signing"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/rectangle-2-2.png"
              />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-[30px]">
              <div className="flex w-full flex-wrap items-center justify-center gap-[10px] px-5 py-0 md:px-20">
                <p className="flex-1 ri-body-lg text-center">{headlineText}</p>
              </div>

              <div className="flex w-full flex-wrap items-start justify-center gap-8 md:gap-12">
                {pricingFeatures.map((feature, index) => (
                  <Card key={index} className="flex-1 border-0 bg-transparent shadow-none">
                    <CardContent className="flex flex-col items-center justify-center rounded-[15px] p-4 sm:p-6 md:p-8">
                      <CheckIcon className="mb-2 h-[82px] w-[82px] stroke-[3] text-[#FCB640] sm:h-[90px] sm:w-[90px]" />

                      <div className="[font-family:'Montserrat',Helvetica] space-y-2 text-center text-2xl font-normal leading-tight tracking-[0] text-transparent sm:text-3xl">
                        <p className="font-bold leading-tight text-[#4D4C4F]">{feature.title}</p>
                        <p className="font-bold leading-tight text-[#FCB640]">{feature.subtitle}</p>
                        <p className="text-5xl font-bold leading-tight text-[#FCB640] md:text-6xl">{feature.price}</p>
                        <p className="font-bold text-[#FCB640]">{feature.currency}</p>
                        {feature.additional && (
                          <p className="text-[15px] font-semibold leading-[15px] text-[#4D4C4F]">{feature.additional}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
