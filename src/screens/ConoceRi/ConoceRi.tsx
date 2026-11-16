import { AboutUsSection } from "./sections/AboutUsSection";
import { TeamAndContactSection } from "./sections/TeamAndContactSection/TeamAndContactSection";
import { SeoHead } from "../../components/SeoHead";

export const ConoceRi = (): JSX.Element => {
  return (
    <>
      <SeoHead page="conoceRi" />
    <div
      className="flex flex-col w-full items-center justify-center bg-white"
      data-model-id="104:1423"
    >
      <AboutUsSection />
      <TeamAndContactSection />
    </div>
    </>
  );
};


