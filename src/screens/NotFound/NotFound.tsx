import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { SeoHead } from "../../components/SeoHead";
import { SimplePageHeader } from "../../components/SimplePageHeader";

type NotFoundProps = {
  /** true cuando se usa como errorElement (error inesperado, no ruta inexistente). */
  isError?: boolean;
};

const NotFoundContent = ({ isError = false }: NotFoundProps): JSX.Element => (
  <>
    <SeoHead page="notFound" />
    <div className="flex min-h-screen w-full flex-col bg-white">
      <SimplePageHeader />
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-20 text-center [font-family:'Montserrat',Helvetica]">
        <p className="text-6xl font-bold text-[#4D4C4F] md:text-8xl">{isError ? "Error" : "404"}</p>
        <h1 className="text-2xl font-semibold text-[#4D4C4F] md:text-4xl">
          {isError ? "Ocurrió un problema al cargar la página" : "Página no encontrada"}
        </h1>
        <p className="max-w-[48ch] text-base text-[#4D4C4F] md:text-xl">
          {isError
            ? "Intenta recargar la página o vuelve al inicio."
            : "La página que buscas no existe o cambió de dirección."}
        </p>
        <Link
          to="/"
          className="rounded-xl bg-[#4D4C4F] px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCB640] focus-visible:ring-offset-2"
        >
          Volver al inicio
        </Link>
      </section>
      <Footer />
    </div>
  </>
);

export const NotFound = (): JSX.Element => <NotFoundContent />;

export const RouteErrorPage = (): JSX.Element => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  if (!isNotFound) console.error(error);
  return <NotFoundContent isError={!isNotFound} />;
};
