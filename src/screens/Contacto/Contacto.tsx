import { ContactFormSection } from "./sections/ContactFormSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { SeoHead } from "../../components/SeoHead";

export const Contacto = (): JSX.Element => {
  return (
    <>
      <SeoHead page="contacto" />
    <div
      className="flex flex-col w-full items-center justify-center relative bg-white"
      data-model-id="1:1357"
    >
      <ContactFormSection />
      <ContactInfoSection />
    </div>
    </>
  );
};


