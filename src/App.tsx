import { Navigate, Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import { Alianzas } from "./screens/Alianzas/Alianzas";
import { AvisoPrivacidad } from "./screens/AvisoPrivacidad/AvisoPrivacidad";
import { CertRi } from "./screens/CertRi/CertRi";
import { ConoceRi } from "./screens/ConoceRi";
import { Contacto } from "./screens/Contacto";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import { NotFound, RouteErrorPage } from "./screens/NotFound/NotFound";
import { Proyectos } from "./screens/Proyectos/Proyectos";

// Normaliza las URLs con barra final (/proyectos/ -> /proyectos) sin tocar "/".
const RootLayout = (): JSX.Element => {
  const { pathname, search, hash } = useLocation();

  if (pathname.length > 1 && pathname.endsWith("/")) {
    const normalized = pathname.replace(/\/+$/, "") || "/";
    return <Navigate to={`${normalized}${search}${hash}`} replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: "/", element: <HomeScreen /> },
      // /home se conserva por compatibilidad con enlaces antiguos; la URL canónica es "/".
      { path: "/home", element: <Navigate to="/" replace /> },
      { path: "/cert-ri", element: <CertRi /> },
      { path: "/alianzas", element: <Alianzas /> },
      { path: "/proyectos", element: <Proyectos /> },
      { path: "/contacto", element: <Contacto /> },
      { path: "/conoce-ri", element: <ConoceRi /> },
      { path: "/aviso-de-privacidad", element: <AvisoPrivacidad /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const App = () => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:outline-none focus:ring-2 focus:ring-black"
      >
        Saltar al contenido principal
      </a>

      <main id="main-content" tabIndex={-1} className="w-full">
        <RouterProvider router={router} />
      </main>
    </>
  );
};
