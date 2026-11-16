# Documentación técnica

## 1. Resumen

Ruiz Inmobiliaria es una aplicación web pública construida con React, TypeScript, Vite y Tailwind CSS. El proyecto contiene una interfaz estática con navegación por rutas y un endpoint Express opcional para recibir leads de contacto.

La compilación genera una aplicación frontend en `dist/`. El backend no se empaqueta dentro de ese directorio y debe ejecutarse o desplegarse por separado si se decide utilizarlo en producción.

## 2. Stack

- React 18.
- TypeScript 5.
- Vite 7.
- React Router DOM 6.
- Tailwind CSS 3.
- Radix UI para algunos componentes.
- Lucide React para iconos.
- Express 4 para el API de contacto.
- Nodemailer para correo SMTP opcional.
- `@animaapp/vite-plugin-screen-graph` únicamente durante desarrollo.

## 3. Estructura principal

```text
/
├─ index.html                  Entrada HTML (los metadatos SEO se inyectan en build)
├─ package.json                Scripts y dependencias
├─ vite.config.ts              Configuración de Vite, proxy, Tailwind y plugin SEO
├─ scripts/seo-html-plugin.mjs Genera title/description/canonical/OG por ruta
├─ tests/                      Pruebas unitarias (node:test)
├─ tsconfig*.json              Configuración TypeScript
├─ tailwind.css                Entrada de estilos globales
├─ src/
│  ├─ index.tsx                Punto de entrada React
│  ├─ App.tsx                  Router, normalización de URLs, 404 y errores
│  ├─ components/              Componentes compartidos y UI
│  ├─ lib/navigation.ts        Enlaces y estilos de navegación
│  ├─ lib/seo.ts               Fuente única de metadatos SEO por ruta
│  ├─ lib/phone.ts             Normalización y formato de teléfonos de México
│  ├─ lib/businessData.ts      Cifras comerciales (pendientes de validación)
│  ├─ lib/remoteImages.ts      Dimensiones reales de imágenes externas
│  ├─ lib/useLazyBackground.ts Carga diferida de fondos CSS
│  ├─ screens/                 Páginas y secciones de la web
│  ├─ public/                  favicon.png, robots.txt y sitemap.xml
│  └─ vite-env.d.ts            Tipos de Vite e import.meta.env
├─ server/
│  ├─ contact-api.mjs          API Express de contacto
│  └─ data/                    Leads locales; no versionar
└─ workspace/                  Notas de trabajo del proyecto
```

`src/screens/Home/` no está enlazado desde el router (el inicio usa `src/screens/HomeScreen/`). Se conserva hasta confirmar que puede retirarse.

## 4. Rutas frontend

Las rutas se declaran en `src/App.tsx` dentro de un layout raíz con `errorElement`:

| Ruta | Pantalla |
|---|---|
| `/` | Inicio (URL canónica) |
| `/home` | Redirige a `/` (compatibilidad con enlaces antiguos) |
| `/proyectos` | Proyectos |
| `/alianzas` | Alianzas |
| `/conoce-ri` | Conoce RI |
| `/cert-ri` | Cert RI |
| `/contacto` | Contacto |
| `/aviso-de-privacidad` | Aviso de privacidad (borrador, `noindex`) |
| `*` | Página 404 propia (`noindex`) |

- Las URLs con barra final se normalizan en el cliente: `/proyectos/` → `/proyectos`. `/` no se modifica.
- `base` de Vite es `"/"`: los assets se piden siempre como `/assets/...`. Con el valor anterior (`"./"`) las rutas con barra final quedaban en blanco. Consecuencia: el sitio debe publicarse en la raíz del dominio, no en un subdirectorio.
- Un error inesperado de renderizado muestra la página de error propia en lugar del mensaje técnico de React Router.

## 5. Scripts

| Comando | Uso |
|---|---|
| `npm run dev` | Inicia frontend y API local en paralelo |
| `npm run dev:ui` | Inicia únicamente Vite |
| `npm run dev:api` | Inicia únicamente Express |
| `npm run typecheck` | Ejecuta la compilación de tipos TypeScript |
| `npm run build` | Genera `dist/` para producción |
| `npm run preview` | Sirve localmente el build generado |
| `npm test` | Pruebas unitarias (teléfono). Requiere Node ≥ 22.18 (TypeScript nativo) |
| `node --check server/contact-api.mjs` | Valida sintaxis del backend |

## 6. Variables de entorno

### Frontend

`.env.production` define:

```env
VITE_CONTACT_ENDPOINT=https://formspree.io/f/<id>
VITE_SITE_URL=https://www.ruizinmobiliaria.com
```

- Cuando existe `VITE_CONTACT_ENDPOINT`, el formulario envía directamente a ese endpoint (Formspree, flujo de producción actual). Si no existe, utiliza `/api/contact` o `VITE_API_BASE_URL/api/contact`.
- `VITE_SITE_URL` es el origen público usado en canonical, `og:url` y `og:image`, tanto en el HTML generado como en el cliente. No se usa `window.location`, para que staging o localhost no aparezcan como canónicos. Si falta o no es una URL válida se usa `https://www.ruizinmobiliaria.com`.

### Backend

Las variables documentadas en `.env.example` son:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=ri@ruizinmobiliaria.com
SMTP_PASS=
CONTACT_FROM_EMAIL=ri@ruizinmobiliaria.com
CONTACT_TO_EMAIL=support.ri@ruizinmobiliaria.com
CONTACT_API_PORT=8787
CONTACT_WEBHOOK_URL=
TRUST_PROXY=loopback
```

`TRUST_PROXY` controla de qué proxies se acepta `X-Forwarded-For` para el rate limiting: `loopback` (por defecto; proxy inverso en el mismo servidor), un número de saltos (`1`) detrás de un balanceador gestionado, o `false` si el API se expone directamente.

Nunca colocar credenciales reales en `.env.example`, archivos versionados, capturas ni mensajes de agentes.

## 7. Flujo del formulario de contacto

1. El usuario completa nombre, apellidos, teléfono, correo y tema, y marca la casilla de consentimiento con enlace al aviso de privacidad.
2. El frontend valida los campos (`noValidate` en el formulario: solo se muestran los mensajes propios en español) y enfoca el primer campo con error.
3. Teléfono: se aceptan 10 dígitos nacionales, `+52`/`52` + 10 dígitos y `+52 1` + 10 dígitos. En pantalla se muestra con formato (`(33) 1234 5678` o `+52 (33) 1234 5678`); se envía normalizado a 10 dígitos. Un número nacional de 10 dígitos nunca se altera. Lógica en `src/lib/phone.ts`, probada en `tests/phone.test.mjs`.
4. El frontend envía JSON al endpoint configurado con `consentimiento: true`. El botón se deshabilita mientras se envía (sin doble envío).
5. Con Formspree, el proveedor procesa el envío.
6. Con el backend propio, Express valida tipo, longitud, contenido, tema permitido y consentimiento, limita solicitudes por IP y guarda el lead en NDJSON.
7. Si hay SMTP configurado, Nodemailer envía un correo; si existe `CONTACT_WEBHOOK_URL`, se reenvía el lead (timeout de 10 s). Un fallo de correo o webhook se registra en el log, pero la respuesta sigue siendo 201 porque el lead ya está guardado (evita reenvíos duplicados).

El backend escapa los valores antes de incluirlos en el HTML del correo y responde JSON (sin stack traces) ante JSON mal formado o cuerpos demasiado grandes. El archivo local `server/data/contact-leads.ndjson` contiene datos personales y debe permanecer fuera de Git.

## 8. SEO y recursos públicos

- `src/lib/seo.ts` es la fuente única de title y description por ruta.
- `scripts/seo-html-plugin.mjs` inserta esos metadatos en el marcador `<!-- ri:seo -->` de `index.html` y, en el build, genera un HTML por ruta (`dist/proyectos.html`, `dist/contacto.html`, …, `dist/404.html`) para que crawlers y previsualizadores sin JavaScript reciban metadatos correctos.
- `src/components/SeoHead.tsx` actualiza los mismos metadatos al navegar dentro de la SPA.
- Twitter Card: `summary_large_image`.
- Imagen Open Graph: el build busca `src/public/og-image.jpg` (1200×630). **El archivo no existe todavía**: mientras falte, el build muestra un aviso y omite `og:image`/`twitter:image` (antes apuntaba a un archivo inexistente o a `favicon.svg`). Al añadir el archivo y recompilar, las etiquetas aparecen automáticamente en todas las rutas.
- `src/public/robots.txt` y `src/public/sitemap.xml` se copian al build. El sitemap no incluye `/home` ni el aviso de privacidad (borrador `noindex`).
- Las imágenes se sirven desde `c.animaapp.com` (ver §13).

## 9. Seguridad y operación

Medidas actuales:

- Límite de tamaño del JSON: `100kb`.
- Validación de tipo y longitud por campo, lista de temas permitidos y consentimiento obligatorio.
- Rate limiting básico en memoria: 10 solicitudes por minuto y por IP, con `trust proxy` configurable.
- `X-Powered-By` desactivado y errores en JSON sin detalles internos.
- Escape de HTML en correos.
- Enlaces externos con `noopener noreferrer`.
- Datos de leads excluidos de Git mediante `.gitignore`.

Limitaciones conocidas:

- El rate limiting en memoria se reinicia al reiniciar el proceso y no coordina múltiples instancias.
- No hay CAPTCHA ni honeypot en el formulario (Formspree ofrece protección anti-spam configurable en su panel).
- La retención, cifrado y eliminación de leads deben definirse según el hosting y la política de privacidad.
- Si el backend se expone públicamente, debe colocarse detrás de HTTPS y un proxy con límites adecuados.

## 10. Despliegue

### Frontend estático

```powershell
npm ci
npm run typecheck
npm test
npm run build
```

Publicar el contenido de `dist/` en la **raíz** del dominio. El hosting debe:

1. Servir `/<ruta>` desde `/<ruta>.html` cuando exista (metadatos correctos sin JavaScript).
2. Para cualquier otra ruta, servir `index.html` (fallback SPA) para que la recarga y la entrada directa a rutas profundas no devuelvan 404.

No se incluye configuración de ningún proveedor en el repositorio porque el hosting no está decidido. Reglas de referencia:

**Apache / Hostinger (`dist/.htaccess`)**

```apache
RewriteEngine On
# /proyectos -> /proyectos.html si existe
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+?)/?$ $1.html [L]
# Fallback SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]
```

**Netlify (`dist/_redirects`)**: Netlify ya sirve `proyectos.html` en `/proyectos`.

```text
/*  /index.html  200
```

**Vercel (`vercel.json`)**

```json
{ "cleanUrls": true, "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Nginx**

```nginx
location / { try_files $uri $uri.html /index.html; }
```

Con estas reglas una URL inexistente devuelve `index.html` con estado 200 y la aplicación muestra la página 404 (`noindex`). Si se prefiere un estado HTTP 404 real, el hosting puede servir `dist/404.html` para rutas no listadas.

### Backend opcional

El backend requiere Node.js, las variables SMTP/Webhook correspondientes y un almacenamiento persistente para `server/data/`. El comando de ejecución es:

```powershell
node server/contact-api.mjs
```

Frontend y backend deben compartir la configuración de CORS, dominio, HTTPS y variables de entorno definida por el proveedor de hosting. Actualmente no existe una estrategia única de despliegue para ambos; debe decidirse antes de usar el API propio en producción.

## 11. Checklist antes de publicar

- [ ] `npm ci` termina correctamente.
- [ ] `npm run typecheck`, `npm test` y `npm run build` terminan correctamente.
- [ ] Se resolvieron los pendientes del cliente de §13.
- [ ] Se probaron `/`, `/proyectos`, `/alianzas`, `/conoce-ri`, `/cert-ri`, `/contacto`, `/aviso-de-privacidad` y una ruta inexistente.
- [ ] Se probaron rutas profundas y con barra final directamente en el dominio publicado.
- [ ] El formulario se probó con éxito, con datos inválidos y sin consentimiento.
- [ ] Se confirmó el destino real de los leads.
- [ ] No existen secretos en el build ni en el repositorio.
- [ ] Existe fallback SPA en el hosting (§10).
- [ ] `robots.txt`, `sitemap.xml`, favicon e imagen Open Graph responden correctamente.
- [ ] Se verificaron las imágenes externas y sus licencias/disponibilidad.
- [ ] Se definieron retención y aviso de privacidad para datos de contacto.

## 12. Historial técnico reciente

- Se incorporó `src/vite-env.d.ts` para tipar `import.meta.env` y hojas de estilo.
- Se añadió validación reproducible mediante `npm run typecheck`.
- Se corrigió el conflicto de tipos del plugin de screen graph sin retirarlo del modo desarrollo.
- Se añadieron límites de entrada, rate limiting básico y escape HTML al API.
- Se mejoró la accesibilidad del formulario y se eliminó el `<main>` anidado.
- Nov 2026 (correcciones tras auditoría QA):
  - Rutas: `base: "/"`, normalización de barra final, `/home` → `/`, página 404 y `errorElement`.
  - Privacidad: ruta `/aviso-de-privacidad` (estructura), enlace en footer y formulario, consentimiento obligatorio.
  - Formulario: normalización de teléfono `+52`, `noValidate`, foco en el primer error, validación de correo estricta.
  - SEO: metadatos por ruta en el HTML generado, origen configurable (`VITE_SITE_URL`), `summary_large_image`, sin `favicon.svg` como imagen social.
  - Contenido: contador de clientes determinista; cifras en `src/lib/businessData.ts`.
  - Imágenes: `width`/`height` reales, `RemoteImage` con fallback en todas las imágenes, prioridad alta solo en el elemento principal del inicio, fondos de Conoce RI diferidos.
  - Backend: validación de tipos, temas permitidos, consentimiento, `TRUST_PROXY`, errores JSON, notificaciones que no provocan reenvíos.
  - Dependencias: `npm audit fix` sin cambios mayores (de 14 a 4 vulnerabilidades en producción; ver §14).

## 13. Pendientes que requieren decisión o material del cliente

| Pendiente | Estado técnico | Qué se necesita |
|---|---|---|
| Aviso de privacidad | Texto del documento del cliente (clave RH-FO-011, MAR 2024) publicado en `/aviso-de-privacidad` con `noindex` (el aviso visible de revisión legal se retiró a petición del cliente) | Revisión legal de los puntos de §15 y confirmación explícita. Después solo hay que cambiar `PRIVACY_NOTICE_VALIDATED` a `true` en `src/lib/legal.ts` (retira `noindex`, añade la ruta al sitemap en el build y muestra la fecha como vigente) |
| Términos y condiciones | El footer conserva el texto sin enlace | Decidir si existirá la página y su contenido |
| Cifras comerciales | Unificadas en `src/lib/businessData.ts` (2,500 clientes, tomado del texto de Cert RI; 10 proyectos activos; "quince" desarrollos) | Confirmar valores y cambiar `BUSINESS_FIGURES_VALIDATED` |
| Certificaciones y afiliaciones (PROFECO, Contraloría, AMPI…) | Sin cambios de contenido; editables en el arreglo `certifications` de `CertificationInfoSection.tsx` | Revisión del cliente de la redacción y de los logotipos del footer |
| Imagen Open Graph | Integración lista | Archivo oficial `src/public/og-image.jpg`, 1200×630 |
| Optimización de imágenes | Ver abajo | Originales en alta calidad y confirmación de licencia/uso |
| Hosting y fallback SPA | Reglas documentadas (§10) | Elegir proveedor |

Imágenes: los 46 archivos de `c.animaapp.com` suman 78.6 MB. Varias son JPG de hasta 4096 px con extensión `.png` (`frame-37.png` 18.7 MB, `rectangle-7-1.png` 13.4 MB, `frame-37-2.png` 10.2 MB, `frame-83.png` 8.3 MB, `rectangle-2-1.png` 4.2 MB, `frame-87.png` 4.0 MB, `frame-37-1.png` 3.9 MB, `cm-1.png` 2.9 MB, `rectangle-8-1.png` 2.3 MB, `pro-integridad-empresas-logo-design-3-6.png` 2.1 MB). Las mejoras aplicadas reducen la descarga inicial (Conoce RI: de 46.7 MB a 29.8 MB al abrir la página), pero el peso total solo bajará cuando se sustituyan por versiones optimizadas (WebP/AVIF ≤ 1920 px, alojadas en `src/public/` o un CDN propio). No se descargaron ni sustituyeron assets para no alterar encuadre, calidad ni licencia sin autorización. También depende de `c.animaapp.com` la disponibilidad del sitio.

## 14. Dependencias

Estado tras `npm audit fix` (sin `--force`, sin cambios de versión mayor):

| Paquete | Severidad | Corrección disponible | Impacto |
|---|---|---|---|
| `nodemailer` 6.10.1 | Alta | 10.x (mayor) | Solo backend opcional |
| `react-router-dom` 6.30.6 | Moderada | 7.x (mayor) | Frontend; avisos de open redirect en APIs de navegación |
| `qs` (vía Express) | Moderada | Requiere actualizar Express | Solo backend opcional |
| `vite` 7.3.1, `esbuild`, plugin screen-graph | Alta/Moderada | Versión fijada o mayor | Solo servidor de desarrollo/build |

Las actualizaciones mayores quedan pendientes de una tarea específica con pruebas de regresión.

## 15. Aviso de privacidad: puntos pendientes de revisión legal

La página `/aviso-de-privacidad` (`src/screens/AvisoPrivacidad/AvisoPrivacidad.tsx`) reproduce el documento "AVISO DE PRIVACIDAD – RUIZ INMOBILIARIA" (clave RH-FO-011, MAR 2024) entregado por el cliente. Solo se corrigieron saltos de línea y se omitió la marca de paginación "Página 2 de 2". Los encabezados `h2` son etiquetas de navegación añadidas por accesibilidad y no forman parte del texto legal. **La implementación no constituye una validación legal.**

Se conservaron sin cambios los siguientes puntos, que conviene revisar con el cliente o su abogado antes de marcar el aviso como validado:

1. **Domicilio unificado (2026-11-14).** Por indicación del cliente, el aviso, el footer y la página de contacto usan el mismo domicilio: "Loma Seca Nte. 8109, Loma Dorada Delegación a, 45402 Tonalá, Jal.". Sustituye a las versiones anteriores ("P.º Loma Nte. 7806, Loma Dorada (Ejidal), 45418 Tonalá, Jal." en el aviso y "Paseo Loma Norte 7806, Col. Loma Dorada…" en el sitio).
2. **Correo distinto al del sitio.** El aviso indica `contacto@ruizinmobiliaria.com` para derechos ARCO; el sitio muestra `support.ri@ruizinmobiliaria.com`. Confirmar que el buzón del aviso existe y se atiende.
3. **Teléfono no listado.** El formulario web recaba teléfono, que no figura en la lista del inciso a). La lista empieza con "Entre otros", pero conviene confirmar que cubre los datos del formulario (nombre, apellidos, teléfono, correo y tema de consulta).
4. **Finalidad del formulario.** El inciso b) menciona "promoción de inmuebles y elaboración de contratos". El texto de la casilla del formulario dice "autorizo el uso de mis datos para atender mi solicitud". Confirmar que ambas formulaciones son compatibles.
5. **Redacción de documento físico o de recursos humanos.** El texto usa "Al firmar el presente Aviso de Privacidad", "del suscrito" (inciso c), "el candidato" (inciso e) y "archivos bajo llave" (inciso d). La clave "RH-FO-011" sugiere un formato de recursos humanos. En el sitio el consentimiento se otorga con una casilla, no con firma.
6. **Autoridad y marco legal citados.** El texto remite al "Instituto Federal de Acceso a la Información y Protección de Datos" y al "capítulo VII de la Ley". Verificar la denominación y competencia vigentes de la autoridad y la vigencia de la ley y el reglamento citados a la fecha de publicación.
7. **Transferencias.** Los incisos b) y c) mencionan transferencia a afiliadas, subsidiarias o terceros. No se identifican destinatarios ni se describe el consentimiento para transferencias.
8. **Medios digitales.** El documento no menciona el sitio web, formularios en línea ni proveedores tecnológicos que reciben los datos (por ejemplo Formspree, que procesa los envíos del formulario).
9. **Fecha.** "MAR 2024" se muestra tal cual; mientras el aviso no esté validado se presenta como fecha del documento fuente pendiente de confirmar.

Ninguno de estos puntos se modificó en el texto. Cualquier cambio debe venir del cliente o de su asesor legal.
