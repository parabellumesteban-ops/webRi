// Ejecutar con: npm test  (requiere Node >= 22.18 por el soporte nativo de TypeScript)
// Los números usados son ficticios.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatPhoneInput, normalizeMxPhone } from "../src/lib/phone.ts";

describe("normalizeMxPhone", () => {
  it("conserva un número nacional de 10 dígitos", () => {
    assert.equal(normalizeMxPhone("3312345678"), "3312345678");
    assert.equal(normalizeMxPhone("(33) 1234 5678"), "3312345678");
  });

  it("no altera un número nacional que empieza por 52", () => {
    assert.equal(normalizeMxPhone("5212345678"), "5212345678");
  });

  it("quita el código de país +52", () => {
    assert.equal(normalizeMxPhone("+52 33 1234 5678"), "3312345678");
    assert.equal(normalizeMxPhone("+52 (33) 1234-5678"), "3312345678");
  });

  it("quita el código de país 52 sin +", () => {
    assert.equal(normalizeMxPhone("523312345678"), "3312345678");
  });

  it("acepta el formato móvil antiguo +52 1 y el prefijo 00", () => {
    assert.equal(normalizeMxPhone("+52 1 33 1234 5678"), "3312345678");
    assert.equal(normalizeMxPhone("0052 33 1234 5678"), "3312345678");
  });

  it("rechaza entradas inválidas", () => {
    for (const value of ["", "abc", "33 12", "331234567", "33123456789", "+1 415 555 0100", "+52 33 1234 567"]) {
      assert.equal(normalizeMxPhone(value), null, value);
    }
  });
});

describe("formatPhoneInput", () => {
  it("formatea números nacionales mientras se escriben", () => {
    assert.equal(formatPhoneInput("33"), "33");
    assert.equal(formatPhoneInput("3312"), "(33) 12");
    assert.equal(formatPhoneInput("3312345678"), "(33) 1234 5678");
  });

  it("limita el número nacional a 10 dígitos", () => {
    assert.equal(formatPhoneInput("33123456789"), "(33) 1234 5678");
  });

  it("no corta los dígitos cuando se pega un número con +52 o 52", () => {
    assert.equal(formatPhoneInput("+52 33 1234 5678"), "+52 (33) 1234 5678");
    assert.equal(formatPhoneInput("523312345678"), "+52 (33) 1234 5678");
    assert.equal(formatPhoneInput("+5213312345678"), "+52 1 (33) 1234 5678");
  });

  it("el valor formateado sigue normalizando al mismo número", () => {
    for (const value of ["+52 33 1234 5678", "523312345678", "3312345678", "+5213312345678"]) {
      assert.equal(normalizeMxPhone(formatPhoneInput(value)), "3312345678", value);
    }
  });

  it("permite escribir el prefijo + progresivamente", () => {
    assert.equal(formatPhoneInput("+"), "+");
    assert.equal(formatPhoneInput("+5"), "+5");
    assert.equal(formatPhoneInput("+52"), "+52");
    assert.equal(formatPhoneInput("+523"), "+52 3");
  });
});
