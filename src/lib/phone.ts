// Utilidades de teléfono para números de México.
// Solo usa sintaxis TypeScript "borrable" para que tests/phone.test.mjs pueda
// importarlo directamente con Node (type stripping) sin dependencias extra.

const MX_COUNTRY_CODE = "52";
const NATIONAL_LENGTH = 10;

const onlyDigits = (value: string): string => value.replace(/\D/g, "");

/**
 * Devuelve el número nacional de 10 dígitos o null si no es válido.
 * Acepta: 10 dígitos nacionales, +52 / 52 + 10 dígitos, +52 1 + 10 dígitos
 * (formato móvil antiguo) y el prefijo internacional 00.
 * Un número nacional de 10 dígitos nunca se altera.
 */
export const normalizeMxPhone = (raw: string): string | null => {
  let digits = onlyDigits(raw);
  if (digits.length > NATIONAL_LENGTH && digits.startsWith("00")) digits = digits.slice(2);

  if (digits.length === NATIONAL_LENGTH) return digits;
  if (digits.length === 12 && digits.startsWith(MX_COUNTRY_CODE)) return digits.slice(2);
  if (digits.length === 13 && digits.startsWith(`${MX_COUNTRY_CODE}1`)) return digits.slice(3);
  return null;
};

/** Formato visual de un número nacional (parcial o completo): (33) 2954 3360 */
export const formatNationalPhone = (digits: string): string => {
  const d = digits.slice(0, NATIONAL_LENGTH);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 6)} ${d.slice(6)}`;
};

/**
 * Formatea lo que el usuario escribe o pega en el campo, sin perder dígitos:
 * - Nacional: "3329543360" -> "(33) 2954 3360"
 * - Internacional: "+523329543360" o "523329543360" -> "+52 (33) 2954 3360"
 */
export const formatPhoneInput = (raw: string): string => {
  const hasPlus = /^\s*\+/.test(raw);
  let digits = onlyDigits(raw);
  if (digits.length > NATIONAL_LENGTH && digits.startsWith("00")) digits = digits.slice(2);

  const international = hasPlus || (digits.length > NATIONAL_LENGTH && digits.startsWith(MX_COUNTRY_CODE));
  if (!international) return formatNationalPhone(digits);

  digits = digits.slice(0, 13);
  if (!digits.startsWith(MX_COUNTRY_CODE)) return `+${digits}`;

  let rest = digits.slice(MX_COUNTRY_CODE.length);
  let mobilePrefix = "";
  if (rest.length > NATIONAL_LENGTH && rest.startsWith("1")) {
    mobilePrefix = "1 ";
    rest = rest.slice(1);
  }

  return `+${MX_COUNTRY_CODE} ${mobilePrefix}${formatNationalPhone(rest)}`.trimEnd();
};
