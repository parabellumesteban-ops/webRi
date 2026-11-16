import express from "express";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const leadsFile = path.join(dataDir, "contact-leads.ndjson");

const app = express();
const port = Number(process.env.CONTACT_API_PORT || 8787);
const destinationEmail = process.env.CONTACT_TO_EMAIL || "support.ri@ruizinmobiliaria.com";
const senderEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || "support.ri@ruizinmobiliaria.com";
const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 10;
const requestCounts = new Map();

// Valores permitidos de "ayuda"; deben coincidir con los SelectItem de
// src/screens/Contacto/sections/ContactFormSection/ContactFormSection.tsx.
const allowedTopics = new Set([
  "info-general",
  "dudas-desarrollo",
  "asesoria-inversion",
  "consulta-legal",
  "seguimiento-proceso",
  "aclaracion-pagos",
]);

// Solo se confía en X-Forwarded-For de proxies configurados. Por defecto
// "loopback" (proxy inverso en el mismo servidor). Ajustar TRUST_PROXY según el
// hosting (por ejemplo "1" detrás de un balanceador gestionado, o "false" si el
// API se expone directamente). Antes era 1 fijo, lo que permitía falsear la IP.
const parseTrustProxy = (value) => {
  if (value === undefined || value === "") return "loopback";
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^\d+$/.test(value)) return Number(value);
  return value;
};

app.disable("x-powered-by");
app.set("trust proxy", parseTrustProxy(process.env.TRUST_PROXY));
app.use(express.json({ limit: "100kb" }));

// Normaliza teléfonos de México a 10 dígitos nacionales (misma regla que
// src/lib/phone.ts). Devuelve "" si el número no es válido.
const normalizePhone = (value = "") => {
  let digits = String(value).replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("52")) return digits.slice(2);
  if (digits.length === 13 && digits.startsWith("521")) return digits.slice(3);
  return "";
};
const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const isRateLimited = (key) => {
  const now = Date.now();
  const previous = requestCounts.get(key);

  if (!previous || now - previous.startedAt >= rateLimitWindowMs) {
    requestCounts.set(key, { startedAt: now, count: 1 });
    return false;
  }

  previous.count += 1;
  return previous.count > rateLimitMaxRequests;
};

const cleanupRateLimits = () => {
  const now = Date.now();
  for (const [key, record] of requestCounts) {
    if (now - record.startedAt >= rateLimitWindowMs) requestCounts.delete(key);
  }
};

const validatePayload = (payload = {}) => {
  const errors = {};
  const maxLengths = {
    nombre: 80,
    apellidoPaterno: 80,
    apellidoMaterno: 80,
    telefono: 30,
    correo: 254,
    ayuda: 80,
  };

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { payload: "Formato invalido." };
  }

  for (const [field, maxLength] of Object.entries(maxLengths)) {
    const value = payload[field];
    if (value !== undefined && value !== null && typeof value !== "string") {
      errors[field] = "Formato invalido.";
    } else if (String(value ?? "").length > maxLength) {
      errors[field] = "El valor excede la longitud permitida.";
    }
  }

  const text = (field) => (typeof payload[field] === "string" ? payload[field] : "");

  if (!errors.nombre && !text("nombre").trim()) errors.nombre = "Nombre requerido.";
  if (!errors.apellidoPaterno && !text("apellidoPaterno").trim()) {
    errors.apellidoPaterno = "Apellido paterno requerido.";
  }

  if (!errors.telefono && !normalizePhone(text("telefono"))) errors.telefono = "Telefono invalido.";

  if (!errors.correo && !isValidEmail(text("correo"))) {
    errors.correo = "Correo invalido.";
  }

  if (!errors.ayuda && !allowedTopics.has(text("ayuda").trim())) {
    errors.ayuda = "Tipo de consulta requerido.";
  }

  if (payload.consentimiento !== true) {
    errors.consentimiento = "Se requiere aceptar el aviso de privacidad.";
  }

  return errors;
};

const createMailTransport = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true").toLowerCase() !== "false",
    auth: {
      user,
      pass,
    },
  });
};

const buildMailHtml = (lead) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;max-width:640px">
    <h2 style="margin:0 0 16px;color:#4D4C4F;">Nuevo formulario de contacto</h2>
    <p><strong>Fecha:</strong> ${escapeHtml(lead.createdAt)}</p>
    <p><strong>Nombre:</strong> ${escapeHtml(`${lead.nombre} ${lead.apellidoPaterno} ${lead.apellidoMaterno}`)}</p>
    <p><strong>Telefono:</strong> ${escapeHtml(lead.telefono)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(lead.correo)}</p>
    <p><strong>Consulta:</strong> ${escapeHtml(lead.ayuda)}</p>
    <p><strong>Origen:</strong> ${escapeHtml(lead.source)}</p>
  </div>
`;

const sendLeadEmail = async (lead) => {
  const transporter = createMailTransport();

  if (!transporter) {
    console.warn("[contact-api] SMTP no configurado. El lead se guardo localmente, pero no se envio por correo.");
    return false;
  }

  await transporter.sendMail({
    from: senderEmail,
    to: destinationEmail,
    replyTo: lead.correo,
    subject: `Nuevo lead web: ${lead.nombre} ${lead.apellidoPaterno}`,
    text: [
      "Nuevo formulario de contacto",
      `Fecha: ${lead.createdAt}`,
      `Nombre: ${lead.nombre} ${lead.apellidoPaterno} ${lead.apellidoMaterno}`,
      `Telefono: ${lead.telefono}`,
      `Correo: ${lead.correo}`,
      `Consulta: ${lead.ayuda}`,
      `Origen: ${lead.source}`,
    ].join("\n"),
    html: buildMailHtml(lead),
  });

  return true;
};

const webhookTimeoutMs = 10_000;

const notifyLead = async (lead) => {
  try {
    await sendLeadEmail(lead);
  } catch (error) {
    console.error(`[contact-api] No se pudo enviar el correo del lead ${lead.id}`, error);
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(webhookTimeoutMs),
    });
    if (!response.ok) {
      console.error(`[contact-api] Webhook respondió ${response.status} para el lead ${lead.id}`);
    }
  } catch (error) {
    console.error(`[contact-api] No se pudo enviar el webhook del lead ${lead.id}`, error);
  }
};

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "contact-api" });
});

app.post("/api/contact", async (req, res) => {
  cleanupRateLimits();
  if (isRateLimited(req.ip)) {
    return res.status(429).json({
      ok: false,
      message: "Demasiadas solicitudes. Intenta de nuevo en un momento.",
    });
  }

  const errors = validatePayload(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, message: "Payload invalido.", errors });
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    nombre: String(req.body.nombre || "").trim(),
    apellidoPaterno: String(req.body.apellidoPaterno || "").trim(),
    apellidoMaterno: String(req.body.apellidoMaterno || "").trim(),
    telefono: normalizePhone(req.body.telefono || ""),
    correo: String(req.body.correo || "").trim().toLowerCase(),
    ayuda: String(req.body.ayuda || "").trim(),
    source: "website",
    consentimiento: true,
  };

  try {
    await mkdir(dataDir, { recursive: true });
    await appendFile(leadsFile, JSON.stringify(lead) + "\n", "utf8");
  } catch (error) {
    console.error("[contact-api] Error guardando el lead", error);
    return res.status(500).json({
      ok: false,
      message: "No se pudo guardar el lead. Intenta de nuevo.",
    });
  }

  // El lead ya está guardado: un fallo de correo o webhook se registra pero no
  // devuelve 500, para que el usuario no reenvíe y se dupliquen leads.
  await notifyLead(lead);

  return res.status(201).json({
    ok: true,
    message: "Lead recibido correctamente.",
    leadId: lead.id,
  });
});

// Respuestas JSON para errores de parseo (JSON mal formado, cuerpo demasiado
// grande) sin exponer stack traces ni rutas del servidor.
// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  const status = Number(error?.status || error?.statusCode) || 500;
  if (status >= 500) console.error("[contact-api] Error no controlado", error);
  const message =
    status === 413
      ? "La solicitud es demasiado grande."
      : status === 400
        ? "Solicitud invalida."
        : "Error interno del servidor.";
  res.status(status >= 400 && status < 600 ? status : 500).json({ ok: false, message });
});

app.listen(port, () => {
  console.log(`[contact-api] running at http://localhost:${port}`);
});
