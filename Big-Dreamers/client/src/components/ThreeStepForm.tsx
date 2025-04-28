import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  DollarSign,
  Calendar,
  Wallet,
} from "lucide-react";

interface FormData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  monto: string;
  fecha: string;
  metodo: string;
}

interface ThreeStepFormProps {
  rate: number;                // porcentaje de rentabilidad (e.g. 2.0)
  duration: number;            // duración en meses (e.g. 12)
  formAction: string;          // URL de FormSubmit (e.g. "https://formsubmit.co/elysios2plantillas@gmail.com")
  formSubject?: string;        // asunto opcional del correo
  nextUrl?: string;            // URL para redirigir tras éxito
}

export default function ThreeStepForm({
  rate,
  duration,
  formAction,
  formSubject = "Solicitud de inversión",
  nextUrl,
}: ThreeStepFormProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    monto: "",
    fecha: "",
    metodo: "Transferencia bancaria",
  });

  const handleNext = () =>
    activeStep < 3 ? setActiveStep((s) => s + 1) : undefined;
  const handlePrev = () => activeStep > 1 && setActiveStep((s) => s - 1);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularRentabilidad = () => {
    const num = parseFloat(formData.monto.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return "N/A";
    const total = num * (rate / 100) * duration;
    return `$${total.toFixed(2)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    // el envío real lo maneja el atributo action del <form>
  };

  if (showSuccess) {
    return (
      <div className="neumorph-inset p-6 rounded-xl text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">¡Solicitud Enviada!</h3>
        <p className="mb-4">
          Hemos recibido tu solicitud. En breve recibirás confirmación en tu correo.
        </p>
        {nextUrl && (
          <a
            href={nextUrl}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Ir a inicio
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      method="POST"
      onSubmit={handleSubmit}
      className="neumorph p-6 md:p-8 rounded-xl"
    >
      {/* Campos ocultos para FormSubmit */}
      <input type="hidden" name="_subject" value={formSubject} />
      <input type="hidden" name="_captcha" value="false" />
      {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}

      {/* Paso 1: Indicador */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((step) => (
          <div key={step} className="relative w-1/3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${{
                true: "bg-[#feba2b] text-white",
              }[activeStep >= step] || "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
            >
              {step}
            </div>
            <p
              className={`text-xs text-center ${{
                true: "text-gray-800 dark:text-white",
              }[activeStep >= step] || "text-gray-500 dark:text-gray-400"}`}
            >
              {step === 1
                ? "Información"
                : step === 2
                ? "Monto"
                : "Confirmación"}
            </p>
          </div>
        ))}
      </div>

      {/* Paso 2: Contenido */}
      {activeStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Información personal</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {(["nombre", "apellidos", "email", "telefono"] as const).map(
              (field) => (
                <div key={field}>
                  <label className="block mb-1 capitalize">{field}</label>
                  <input
                    name={field}
                    type={field === "email" ? "email" : field === "telefono" ? "tel" : "text"}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detalles de la inversión</h3>
          <div>
            <label className="block mb-1">Monto a invertir ($)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <DollarSign />
              </span>
              <input
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded"
                placeholder={`Mínimo ${duration === 12 ? 2000 : 2500}$`}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Fecha de inicio</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Calendar />
              </span>
              <input
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Método de pago</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Wallet />
              </span>
              <select
                name="metodo"
                value={formData.metodo}
                onChange={handleChange}
                className="w-full p-2 pl-10 border rounded"
              >
                <option>Transferencia bancaria</option>
                <option>Tarjeta de crédito</option>
                <option>Efectivo</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Confirmación</h3>
          <div className="bg-gray-100 p-4 rounded">
            <div className="flex justify-between py-2 border-b">
              <span>Plan</span>
              <span>{duration} meses ({rate}%)</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Monto</span>
              <span>{formData.monto} $</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Fecha</span>
              <span>{formData.fecha}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Rentabilidad</span>
              <span>{calcularRentabilidad()}</span>
            </div>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
              Acepto los <a href="#" className="text-primary">términos y condiciones</a>
            </label>
          </div>
        </div>
      )}

      {/* Navegación */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrev}
          className={`px-4 py-2 rounded ${
n          activeStep === 1 ? "invisible" : ""
          }`}
        >
          <ArrowLeft className="inline-block mr-1" /> Anterior
        </button>
        <button
          type={activeStep === 3 ? "submit" : "button"}
          onClick={activeStep === 3 ? undefined : handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded flex items-center"
        >
          {activeStep === 3 ? (
            <><Check className="mr-2" /> Enviar</>
          ) : (
            <>Siguiente <ArrowRight className="ml-1" /></>
          )}
        </button>
      </div>
    </form>
  );
}
