import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNavLinkClassName, navigationLinks } from "../../../../lib/navigation";
import { Button } from "../../../../components/ui/button";
import { RemoteImage } from "../../../../components/RemoteImage";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { MenuIcon, XIcon } from "lucide-react";
import { formatPhoneInput, normalizeMxPhone } from "../../../../lib/phone";

const emptyForm = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  telefono: "",
  correo: "",
  ayuda: "",
};

// Orden en que se enfoca el primer campo con error.
const fieldOrder = ["nombre", "apellidoPaterno", "telefono", "correo", "ayuda", "consentimiento"];

const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const contactInfo = [
  {
    icon: "https://c.animaapp.com/mmjez8tnoH67O3/img/whats-app-svgrepo-com.svg",
    text: "(33) 2954 3360",
  },
  {
    icon: "https://c.animaapp.com/mmjez8tnoH67O3/img/lucide-map-pin.svg",
    text: "Loma Seca Nte. 8109, Loma Dorada Delegación a, 45402 Tonalá, Jal.",
  },
  {
    icon: "https://c.animaapp.com/mmjez8tnoH67O3/img/lucide-mail.svg",
    text: "support.ri@ruizinmobiliaria.com",
  },
];

export const ContactFormSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState(emptyForm);
  const [consentimiento, setConsentimiento] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Escribe tu nombre.";
    if (!formData.apellidoPaterno.trim())
      newErrors.apellidoPaterno = "Escribe tu apellido paterno.";
    const phoneDigits = formData.telefono.replace(/\D/g, "");
    if (!phoneDigits) newErrors.telefono = "Escribe tu telefono.";
    else if (!normalizeMxPhone(formData.telefono))
      newErrors.telefono = "El telefono debe tener 10 digitos (puedes incluir +52).";
    if (!formData.correo.trim()) newErrors.correo = "Escribe tu correo.";
    else if (!isValidEmail(formData.correo))
      newErrors.correo = "Escribe un correo valido.";
    if (!formData.ayuda) newErrors.ayuda = "Selecciona el tema de tu consulta.";
    if (!consentimiento)
      newErrors.consentimiento = "Debes aceptar el aviso de privacidad para enviar tu solicitud.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === "sending") return;
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("idle");
      const firstInvalid = fieldOrder.find((field) => newErrors[field]);
      if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    setSubmitStatus("sending");
    setSubmitMessage("");

    const directEndpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() || "";
    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || "";
    const endpoint = directEndpoint || (apiBaseUrl ? `${apiBaseUrl.replace(/\/$/, "")}/api/contact` : "/api/contact");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Se envía el número nacional normalizado (10 dígitos).
          telefono: normalizeMxPhone(formData.telefono) ?? formData.telefono,
          consentimiento: true,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitStatus("error");
        setSubmitMessage(data.message || "No pudimos enviar tu solicitud en este momento. Intentalo de nuevo.");
        return;
      }

      setSubmitStatus("success");
      setSubmitMessage("Recibimos tu solicitud. Un asesor se pondra en contacto contigo pronto.");
      setFormData(emptyForm);
      setConsentimiento(false);
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("No logramos conectar con el servidor. Revisa tu conexion e intentalo de nuevo.");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full h-[810px] overflow-hidden bg-[url(https://c.animaapp.com/mmjez8tnoH67O3/img/frame-90.png)] bg-cover bg-center">
        {/* Strong golden treatment to match reference look */}
        <div className="absolute inset-0 bg-[#4D4C4F]/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#FCB640]/62 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(34,20,0,0.38)] via-[rgba(56,34,0,0.2)] to-[rgba(34,20,0,0.38)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(252,182,64,0.28)] to-[rgba(43,26,0,0.30)]" />

        {/* Centered title and subtitle */}
        <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 flex flex-col items-center justify-center">
          <h1 className="[font-family:'Montserrat',Helvetica] font-bold text-[#FCB640] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] tracking-[0] leading-tight text-center">
            CONTACTO
          </h1>
          <p className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl tracking-[0] leading-tight text-center mt-2 md:mt-4">
            ATENCION A CLIENTES
          </p>
        </div>

        <header className="flex max-w-[1440px] w-full h-[180px] items-center justify-between px-5 md:px-20 py-[60px] absolute top-0 left-1/2 -translate-x-1/2 bg-transparent z-10">
          <Link to="/" className="z-50">
            <RemoteImage
              className="w-[60px] h-[100px]"
              alt="Capa"
              src="https://c.animaapp.com/mmjez8tnoH67O3/img/capa-1.svg"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Navegacion principal" className="hidden md:flex items-center justify-end gap-[30px] flex-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                className={getNavLinkClassName(location.pathname, link.to)}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white z-50 bg-transparent hover:bg-transparent"
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-contacto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="w-9 h-9" /> : <MenuIcon className="w-8 h-8" />}
          </Button>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav id="mobile-nav-contacto" aria-label="Navegacion movil" className="md:hidden fixed top-24 right-5 flex flex-col items-end gap-4 pt-4 z-50 animate-fade-in [&_a]:text-right [&_a]:text-[24px] [&_a]:leading-tight [&_a]:font-normal">
{navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getNavLinkClassName(location.pathname, link.to)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </header>
      </div>

      <div className="relative w-full">
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="w-full flex flex-col gap-6 md:gap-8">
              <h2 className="ri-h3-strong">
                <span className="font-medium text-[#FCB640]">
                  Una buena inversion{" "}
                </span>
                <span className="text-[#4D4C4F]">comienza con </span>
                <span className="font-medium text-[#FCB640]">
                  una buena conversacion.
                </span>
              </h2>

              <p className="ri-body-lg">
                Estamos aqui para{" "}
                <span className="font-semibold">orientarte</span> con claridad y
                vision.
                <br />
                <br />
                Cuentanos un poco sobre ti y un asesor se pondra en contacto
                contigo para{" "}
                <span className="font-semibold">brindarte orientacion</span>{" "}
                precisa.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full">
                <div className="flex flex-col w-full items-center justify-center gap-2">
                  <div className={`flex flex-col items-start justify-center px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 w-full rounded-xl md:rounded-2xl border-2 md:border-[3px] border-solid ${
                    errors.nombre ? "border-red-500" : "border-[#4D4C4F]"
                  }`}>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      className="bg-white border-0 h-auto [font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center tracking-[0] leading-tight p-0"
                      placeholder="Nombre"
                      aria-label="Nombre"
                      aria-invalid={Boolean(errors.nombre)}
                      aria-describedby={errors.nombre ? "nombre-error" : undefined}
                      autoComplete="given-name"
                      maxLength={80}
                    />
                  </div>
                  {errors.nombre && (
                    <p id="nombre-error" className="text-red-500 text-xs sm:text-sm self-start">{errors.nombre}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                  <div className="flex flex-col w-full items-center justify-center gap-2 flex-1">
                    <div className={`flex flex-col items-start justify-center px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 w-full rounded-xl md:rounded-2xl border-2 md:border-[3px] border-solid ${
                      errors.apellidoPaterno ? "border-red-500" : "border-[#4D4C4F]"
                    }`}>
                      <Input
                        id="apellidoPaterno"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={(e) =>
                          handleInputChange("apellidoPaterno", e.target.value)
                        }
                        className="bg-white border-0 h-auto [font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center tracking-[0] leading-tight p-0"
                        placeholder="Apellido paterno"
                        aria-label="Apellido paterno"
                        aria-invalid={Boolean(errors.apellidoPaterno)}
                        aria-describedby={errors.apellidoPaterno ? "apellido-paterno-error" : undefined}
                        autoComplete="family-name"
                        maxLength={80}
                      />
                    </div>
                    {errors.apellidoPaterno && (
                        <p id="apellido-paterno-error" className="text-red-500 text-xs sm:text-sm self-start">
                        {errors.apellidoPaterno}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full items-start gap-2 flex-1">
                    <div className="flex flex-col justify-center w-full border-2 md:border-[3px] border-solid border-[#4D4C4F] items-center px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl">
                      <Input
                        id="apellidoMaterno"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={(e) =>
                          handleInputChange("apellidoMaterno", e.target.value)
                        }
                        className="bg-white border-0 h-auto [font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center tracking-[0] leading-tight p-0"
                        placeholder="Apellido materno"
                        aria-label="Apellido materno"
                        autoComplete="additional-name"
                        maxLength={80}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                  <div className="flex flex-col w-full items-center justify-center gap-2 flex-1">
                    <div className={`flex flex-col items-start justify-center px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 w-full rounded-xl md:rounded-2xl border-2 md:border-[3px] border-solid ${
                      errors.telefono ? "border-red-500" : "border-[#4D4C4F]"
                    }`}>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange("telefono", formatPhoneInput(e.target.value))}
                        className="bg-white border-0 h-auto [font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center tracking-[0] leading-tight p-0"
                        placeholder="Telefono"
                        aria-label="Telefono"
                        aria-invalid={Boolean(errors.telefono)}
                        aria-describedby={errors.telefono ? "telefono-error" : undefined}
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={24}
                      />
                    </div>
                    {errors.telefono && (
                        <p id="telefono-error" className="text-red-500 text-xs sm:text-sm self-start">
                        {errors.telefono}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full items-center justify-center gap-2 flex-1">
                    <div className={`flex flex-col items-start justify-center px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 w-full rounded-xl md:rounded-2xl border-2 md:border-[3px] border-solid ${
                      errors.correo ? "border-red-500" : "border-[#4D4C4F]"
                    }`}>
                      <Input
                        id="correo"
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={(e) => handleInputChange("correo", e.target.value)}
                        className="bg-white border-0 h-auto [font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center tracking-[0] leading-tight p-0"
                        placeholder="Correo"
                        aria-label="Correo electronico"
                        aria-invalid={Boolean(errors.correo)}
                        aria-describedby={errors.correo ? "correo-error" : undefined}
                        autoComplete="email"
                        inputMode="email"
                        maxLength={254}
                      />
                    </div>
                    {errors.correo && (
                      <p id="correo-error" className="text-red-500 text-xs sm:text-sm self-start">{errors.correo}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 w-full">
                  <Select
                    value={formData.ayuda}
                    onValueChange={(value) => handleInputChange("ayuda", value)}
                  >
                    <SelectTrigger id="ayuda" aria-label="Tipo de ayuda" aria-invalid={Boolean(errors.ayuda)} aria-describedby={errors.ayuda ? "ayuda-error" : undefined} className={`w-full h-auto border-2 md:border-[3px] border-solid ${
                      errors.ayuda ? "border-red-500" : "border-[#4D4C4F]"
                    } rounded-xl md:rounded-2xl px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 [font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}>
                      <SelectValue placeholder="Como podemos ayudarte?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info-general">Solicitar informacion general</SelectItem>
                      <SelectItem value="dudas-desarrollo">Dudas sobre un desarrollo</SelectItem>
                      <SelectItem value="asesoria-inversion">Asesoria sobre inversion inmobiliaria</SelectItem>
                      <SelectItem value="consulta-legal">Consulta legal o contractual</SelectItem>
                      <SelectItem value="seguimiento-proceso">Seguimiento a un proceso</SelectItem>
                      <SelectItem value="aclaracion-pagos">Aclaracion de pagos o financiamiento</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.ayuda && (
                    <p id="ayuda-error" className="text-red-500 text-xs sm:text-sm self-start">{errors.ayuda}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <div className="flex items-start gap-3">
                  <input
                    id="consentimiento"
                    name="consentimiento"
                    type="checkbox"
                    checked={consentimiento}
                    onChange={(e) => {
                      setConsentimiento(e.target.checked);
                      if (errors.consentimiento) setErrors((prev) => ({ ...prev, consentimiento: "" }));
                    }}
                    required
                    aria-invalid={Boolean(errors.consentimiento)}
                    aria-describedby={errors.consentimiento ? "consentimiento-error" : undefined}
                    className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#4D4C4F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F] focus-visible:ring-offset-2"
                  />
                  <label
                    htmlFor="consentimiento"
                    className="[font-family:'Montserrat',Helvetica] text-sm leading-snug text-[#4D4C4F] sm:text-base"
                  >
                    He leído y acepto el{" "}
                    <Link
                      to="/aviso-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D4C4F]"
                    >
                      aviso de privacidad
                    </Link>{" "}
                    y autorizo el uso de mis datos para atender mi solicitud.
                  </label>
                </div>
                {errors.consentimiento && (
                  <p id="consentimiento-error" className="text-red-500 text-xs sm:text-sm self-start">
                    {errors.consentimiento}
                  </p>
                )}
              </div>

              {submitStatus === "success" && (
                <div role="status" aria-live="polite" className="w-full bg-green-100 border-2 border-green-500 rounded-xl md:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 mt-4">
                  <p className="[font-family:'Montserrat',Helvetica] font-semibold text-green-700 text-base sm:text-lg md:text-xl text-center tracking-[0] leading-tight">
                    Solicitud enviada: {submitMessage}
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div role="alert" aria-live="assertive" className="w-full rounded-xl border-2 border-red-400 bg-red-50 px-4 py-4 md:rounded-2xl">
                  <p className="[font-family:'Montserrat',Helvetica] text-center text-sm font-medium text-red-700 sm:text-base md:text-lg">
                    {submitMessage}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitStatus === "sending"}
                className="w-full h-auto bg-[#FCB640] hover:bg-[#FCB640]/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-xl md:rounded-2xl mt-4 md:mt-6"
              >
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-lg sm:text-xl md:text-2xl lg:text-3xl text-center tracking-[0] leading-tight">
                  {submitStatus === "sending" ? "Enviando..." : "Enviar solicitud"}
                </span>
              </Button>
            </div>

            <div className="w-full flex items-center justify-center">
              <RemoteImage
                className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-full h-auto aspect-square object-cover rounded-2xl lg:rounded-3xl"
                alt="Conversacion"
                src="https://c.animaapp.com/mmjez8tnoH67O3/img/conversacion.png"
                loading="lazy"
              />
            </div>
          </div>
        </form>

        <div className="flex flex-col w-full max-w-[1440px] mx-auto items-center justify-center gap-8 md:gap-12 lg:gap-16 px-5 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20">
          <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="mx-auto flex min-h-[220px] w-full max-w-[420px] flex-col items-center justify-start gap-5 px-4 py-4 md:min-h-[260px] md:gap-6 md:px-6"
              >
                <RemoteImage
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-24 lg:w-24 xl:h-[90px] xl:w-[90px]"
                  alt={`Contact info ${index + 1}`}
                  src={info.icon}
                />
                <p
                  className={`[font-family:'Montserrat',Helvetica] text-center font-medium tracking-[0] text-[#4D4C4F] ${
                    index === 2
                      ? 'max-w-[420px] text-[22px] leading-[1.2] md:text-[28px] lg:text-[32px] break-words'
                      : index === 1
                        ? 'max-w-[360px] text-[22px] leading-[1.22] md:text-[28px] lg:text-[32px]'
                        : 'max-w-[320px] text-[24px] leading-[1.2] md:text-[30px] lg:text-[34px]'
                  }`}
                >
                  {info.text}
                </p>
              </div>
            ))}
          </div>

          <div className="[font-family:'Montserrat',Helvetica] font-normal text-[#4D4C4F] text-center tracking-[0] leading-tight">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 md:mb-4">
              Horarios de Atencion:
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Lunes a viernes, de 9:00 a.m. a 6:30 p.m.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

























