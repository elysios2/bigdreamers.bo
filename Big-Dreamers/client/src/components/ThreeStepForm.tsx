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
  rate: number;
  duration: number;
  formAction: string;
  formSubject?: string;
  nextUrl?: string;
}

export default function ThreeStepForm({
  rate,
  duration,
  formAction,
  formSubject = "Solicitud de inversión",
  nextUrl,
}: ThreeStepFormProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    monto: "",
    fecha: "",
    metodo: "Transferencia bancaria",
  });

  const handleNext = () => {
    if (activeStep < 3) setActiveStep((s) => s + 1);
  };
  const handlePrev = () => {
    if (activeStep > 1) setActiveStep((s) => s - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularRentabilidad = () => {
    const num = parseFloat(formData.monto.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return "N/A";
    const total = num * (rate / 100) * duration;
    return `$${total.toFixed(2)}`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Formulario enviado");
    // Dejar que el navegador envíe normalmente a FormSubmit
  };

  return (
    <form
      action={formAction}
      method="POST"
      onSubmit={handleSubmit}
      className="neumorph p-6 md:p-8 rounded-xl"
    >
      <input type="hidden" name="_subject" value={formSubject} />
      <input type="hidden" name="_captcha" value="false" />
      {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}

      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((step) => (
          <div key={step} className="relative w-1/3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                activeStep >= step
                  ? "bg-[#feba2b] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {step}
            </div>
            <p
              className={`text-xs text-center ${
                activeStep >= step
                  ? "text-gray-800 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step === 1 ? "Información" : step === 2 ? "Monto" : "Confirmación"}
            </p>
          </div>
        ))}
      </div>

      {activeStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Información personal</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {(["nombre", "apellidos", "email", "telefono"] as const).map((field) => (
              <div key={field}>
                <label className="block mb-1 capitalize">{field}</label>
                <input
                  name={field}
                  type={field === "email" ? "email" : field === "telefono" ? "tel" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
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
                type="text"
                value={formData.monto}
                onChange={handleChange}
                placeholder={`Mínimo ${duration === 12 ? 2000 : 2500}$`}
                className="w-full p-2 pl-10 border rounded"
                required
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
                required
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
                required
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
          <div className="bg-gray-100 dark:bg-[#03436a] p-4 rounded-lg mb-4">
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
            <input type="checkbox" id="terms" name="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm">
              Acepto los <a href="#" className="text-primary">términos y condiciones</a>
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => {
            if (activeStep < 3) {
              handleNext(); // avanzar al siguiente paso
            } else {
              const form = document.querySelector("form");
              if (form) form.submit(); // enviar manualmente el formulario
            }
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded flex items-center"
        >
          {activeStep === 3 ? (
            <>
              <Check className="mr-2" /> Enviar
            </>
          ) : (
            <>
              Siguiente <ArrowRight className="ml-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
