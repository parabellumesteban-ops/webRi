import { Link } from "react-router-dom";
import { FooterInfoWrapperSection } from "../HomeScreen/sections/FooterInfoWrapperSection";
import { GrowthOpportunityWrapperSection } from "../HomeScreen/sections/GrowthOpportunityWrapperSection/GrowthOpportunityWrapperSection";
import { HeroImageWrapperSection } from "../HomeScreen/sections/HeroImageWrapperSection";

export const Home = (): JSX.Element => {
  return (
    <Link
      className="flex flex-col w-full items-center justify-center bg-white"
      data-model-id="251:1929"
      to="/"
    >
      <HeroImageWrapperSection />
      <GrowthOpportunityWrapperSection />
      <FooterInfoWrapperSection />
    </Link>
  );
};

