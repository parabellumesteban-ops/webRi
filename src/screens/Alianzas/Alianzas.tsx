import { AllianceDetailsSection } from "./sections/AllianceDetailsSection/AllianceDetailsSection";
import { AllianceOverviewSection } from "./sections/AllianceOverviewSection/AllianceOverviewSection";
import { SeoHead } from "../../components/SeoHead";

export const Alianzas = (): JSX.Element => {
  return (
    <>
      <SeoHead page="alianzas" />
    <div
      className="flex flex-col w-full items-center bg-white"
      data-model-id="1:513"
    >
      <AllianceOverviewSection />
      <AllianceDetailsSection />
    </div>
    </>
  );
};


