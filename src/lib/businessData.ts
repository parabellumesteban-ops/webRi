// Fuente única de cifras comerciales mostradas en el sitio.
//
// PENDIENTE CLIENTE: estas cifras deben ser confirmadas por Ruiz Inmobiliaria
// antes de publicar. Antes de esta corrección el sitio mostraba datos
// contradictorios:
//   - Inicio: contador que empezaba en 2400 y subía al azar cada 6 segundos.
//   - Cert RI: "más de 2500 clientes" y "más de quince desarrollos".
//   - Inicio: "Proyectos activos 10".
// Se unificó el número de clientes en el valor declarado como texto fijo en
// Cert RI (2500). No se inventó ningún dato nuevo.
// "Proyectos activos" (actuales) y "desarrollos en los que hemos participado"
// (histórico) son métricas distintas y se conservan por separado.

export const BUSINESS_FIGURES_VALIDATED = false;

/** Clientes atendidos. Se muestra como "más de N" / "N+". */
export const CLIENTS_SERVED = 2500;

/** Proyectos activos actualmente (Inicio). */
export const ACTIVE_PROJECTS = 10;

/** Desarrollos en los que se ha participado (Cert RI), en texto. */
export const DEVELOPMENTS_PARTICIPATED_TEXT = "quince";

export const formatFigure = (value: number): string => value.toLocaleString("es-MX");
