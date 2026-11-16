import { ContactInfoSection } from "./sections/ContactInfoSection";
import { HeroBannerSection } from "./sections/HeroBannerSection";
import { ProjectGallerySection } from "./sections/ProjectGallerySection/ProjectGallerySection";
import { SeoHead } from "../../components/SeoHead";

export const Proyectos = (): JSX.Element => {
  return (
    <>
      <SeoHead page="proyectos" />
    <div
      className="flex flex-col w-full items-center justify-center relative bg-white"
      data-model-id="103:8834"
    >
      <HeroBannerSection />
      <ProjectGallerySection />
      <ContactInfoSection />
    </div>
    </>
  );
};


