import React, { useState, ChangeEvent } from "react";
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
    if (activeStep === 2) {
      if (!formData.monto || !formData.fecha) {
        alert("Completa todos los campos antes de continuar.");
        return;
      }
    }
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
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

  return (
    <form
      action={formAction}
      method="POST"
      className="neumorph p-6 md:p-8 rounded-xl"
    >
      {/* FormSubmit hidden fields */}
      <input type="hidden" name="_subject" value={formSubject} />
      <input type="hidden" name="_captcha" value="false" />
      {nextUrl && (
        <input type="hidden" name="_next" value={nextUrl} />
      )}

      {/* Step indicators */}
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
              {step === 1
                ? "Información"
                : step === 2
                ? "Monto"
                : "Confirmación"}
            </p>
          </div>
        ))}
      </div>

      {/* Paso 1 */}
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
                    type={
                      field === "email"
                        ? "email"
                        : field === "telefono"
                        ? "tel"
                        : "text"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Paso 2 */}
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

      {/* Paso 3: confirmación + inputs hidden */}
      {activeStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Confirmación</h3>
          <div className="bg-gray-100 dark:bg-[#03436a] p-4 rounded-lg mb-4">
            <div className="flex justify-between py-2 border-b">
              <span>Plan</span>
              <span>
                {duration} meses ({rate}%)
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Monto</span>
              <span>{formData.monto || "N/A"} $</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Fecha</span>
              <span>{formData.fecha || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Método de pago</span>
              <span>{formData.metodo || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Rentabilidad</span>
              <span>{calcularRentabilidad()}</span>
            </div>
          </div>

          {/* Hidden fields para FormSubmit */}
          {Object.entries(formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm">
              Acepto los{" "}
              <a href="#" className="text-primary">
                términos y condiciones
              </a>
            </label>
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeStep === 1}
          className={`px-4 py-2 rounded ${
            activeStep === 1 ? "invisible" : "bg-gray-300 text-black"
          }`}
        >
          <ArrowLeft className="inline-block mr-1" /> Anterior
        </button>

        {activeStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded flex items-center"
          >
            Siguiente <ArrowRight className="ml-1" />
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Editar información
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#048abf] text-white rounded flex items-center hover:bg-[#feba2b] transition"
            >
              <Check className="mr-2" /> Enviar
            </button>
          </div>
        )}
      </div>
    </form>
  );
}