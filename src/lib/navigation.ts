export const navigationLinks = [
  { to: "/proyectos", label: "Proyectos" },
  { to: "/alianzas", label: "Alianzas" },
  { to: "/conoce-ri", label: "Conoce RI" },
  { to: "/cert-ri", label: "Cert RI" },
  { to: "/contacto", label: "Contacto" },
];

export const getNavLinkClassName = (pathname: string, to: string): string => {
  const isActive = pathname === to || pathname.startsWith(`${to}/`);
  const base =
    "[font-family:'Montserrat',Helvetica] text-white tracking-[0] leading-normal transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm";

  return isActive
    ? `${base} font-medium underline underline-offset-2`
    : `${base} font-normal`;
};

