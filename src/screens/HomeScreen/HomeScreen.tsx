import { FooterInfoWrapperSection } from "./sections/FooterInfoWrapperSection";
import { GrowthOpportunityWrapperSection } from "./sections/GrowthOpportunityWrapperSection/GrowthOpportunityWrapperSection";
import { HeroImageWrapperSection } from "./sections/HeroImageWrapperSection";
import { SeoHead } from "../../components/SeoHead";

export const HomeScreen = (): JSX.Element => {
  return (
    <>
      <SeoHead page="home" />
    <div
      className="flex flex-col w-full items-center bg-white"
      data-model-id="119:1289"
    >
      <h1 className="sr-only">Ruiz Inmobiliaria: inversión inmobiliaria en Jalisco</h1>
      <HeroImageWrapperSection />
      <GrowthOpportunityWrapperSection />
      <FooterInfoWrapperSection />
    </div>
    </>
  );
};


