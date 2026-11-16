import { AffiliationsAndFooterSection } from "./sections/AffiliationsAndFooterSection";
import { CertificationInfoSection } from "./sections/CertificationInfoSection";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { SeoHead } from "../../components/SeoHead";

export const CertRi = (): JSX.Element => {
  return (
    <>
      <SeoHead page="certRi" />
    <div className="flex flex-col w-full bg-white" data-model-id="1:1033">
      <HeroBannerSection />
      <CertificationInfoSection />
      <AffiliationsAndFooterSection />
    </div>
    </>
  );
};


