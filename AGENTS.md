# Instrucciones para agentes

## Alcance

Este archivo define las reglas para Codex, Claude Code y cualquier otro agente que trabaje en este proyecto.

Antes de modificar código, leer este archivo y `DOCUMENTACION_TECNICA.md`. También revisar `README.md` y el estado actual de los archivos relevantes.

## Objetivo del proyecto

Mantener una web inmobiliaria en React/Vite para Ruiz Inmobiliaria, con navegación pública, páginas informativas, galería de proyectos, SEO básico y formulario de contacto.

## Reglas de seguridad y operación

- Preservar el comportamiento visible y el flujo de contacto existente.
- No publicar, desplegar ni cambiar DNS sin autorización explícita.
- No sustituir Formspree por el backend Express ni hacer el cambio inverso sin una decisión documentada.
- No introducir claves, contraseñas, tokens o datos personales en el repositorio.
- No borrar componentes o assets aparentemente antiguos sin confirmar que no se usan.
- No modificar `server/data/` salvo que la tarea lo solicite expresamente.
- Evitar cambios globales de estilos cuando una corrección local sea suficiente.
- No actualizar dependencias mayores durante una tarea de depuración funcional, salvo que sea necesario y se valide el impacto.
- Si una decisión depende del hosting, dominio o proveedor de correo, detenerse y documentar la decisión requerida.

## Flujo de trabajo obligatorio

1. Revisar la documentación y localizar los archivos afectados.
2. Diagnosticar antes de editar.
3. Aplicar cambios pequeños y reversibles.
4. Ejecutar `npm run typecheck`.
5. Ejecutar `npm run build`.
6. Validar la API con `node --check server/contact-api.mjs` cuando se toque el backend.
7. Informar archivos modificados, validaciones ejecutadas y riesgos restantes.

## Comandos principales

```powershell
npm install
npm run dev
npm run dev:ui
npm run dev:api
npm run typecheck
npm run build
npm run preview
node --check server/contact-api.mjs
```

## Convenciones de código

- Usar TypeScript para componentes y utilidades nuevas.
- Mantener componentes funcionales de React.
- Usar `Link` para navegación interna y enlaces `https`/`tel` para destinos externos.
- Mantener textos y etiquetas accesibles en español.
- Para formularios, conservar `id`, `name`, `autocomplete`, estados ARIA y mensajes de error asociados.
- Escapar cualquier dato de usuario antes de interpolarlo en HTML de correo.
- Preferir cambios localizados y evitar duplicar lógica de navegación, contacto o SEO.

## Coordinación entre agentes

- El primer agente realiza diagnóstico y delimita el cambio.
- El segundo agente revisa de forma independiente los riesgos y la posible regresión.
- No editar simultáneamente los mismos archivos sin acordar el alcance.
- El agente que integra debe revisar el diff lógico y ejecutar las validaciones antes de entregar.
- Las observaciones del segundo agente son recomendaciones; no se aplican automáticamente si pueden cambiar funcionalidades.

## Criterios de terminado

Una tarea se considera terminada cuando:

- El objetivo solicitado está implementado.
- `npm run typecheck` termina correctamente.
- `npm run build` termina correctamente.
- No se introdujeron secretos ni datos personales.
- Se documentaron decisiones, limitaciones y pasos pendientes.
