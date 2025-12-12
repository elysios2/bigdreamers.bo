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
      className="border dark:bg-blue-600 bg-white border-slate-700 p-8 md:p-10 rounded-2xl shadow-2xl"
    >
      <input type="hidden" name="_subject" value={formSubject} />
      <input type="hidden" name="_captcha" value="false" />
      {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}

      <div className="flex justify-between mb-10 relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-700">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
          />
        </div>
        {[1, 2, 3].map((step) => (
          <div key={step} className="relative w-1/3 flex flex-col items-center">
            <div
              className={`w-10 h-10 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 font-semibold transition-all duration-300 relative z-10 ${
                activeStep >= step
                  ? "bg-blue-600  shadow-lg shadow-blue-600/50"
                  : "bg-slate-700 text-slate-200"
              }`}
            >
              {activeStep > step ? <Check className="w-5 h-5" /> : step}
            </div>
            <p
              className={`text-sm dark:text-slate-300 text-center transition-colors duration-300 ${
                activeStep >= step
                  ? " font-medium"
                  : "text-slate-300"
              }`}
            >
              {step === 1 ? "Información" : step === 2 ? "Monto" : "Confirmación"}
            </p>
          </div>
        ))}
      </div>

      {activeStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold  mb-6">Información personal</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {(["nombre", "apellidos", "email", "telefono"] as const).map(
              (field) => (
                <div key={field}>
                  <label className="block mb-2 capitalize dark:text-slate-300 font-medium">
                    {field}
                  </label>
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
                    className="w-full p-3 border text-black border-slate-700 rounded-lg  placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                    required
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold dark:text-slate-200 mb-6">Detalles de la inversión</h3>
          <div>
            <label className="block mb-2 dark:text-slate-300 font-medium">Monto a invertir ($)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <DollarSign className="w-5 h-5" />
              </span>
              <input
                name="monto"
                type="text"
                value={formData.monto}
                onChange={handleChange}
                placeholder={`Mínimo ${duration === 12 ? 2000 : 2500}$`}
                className="w-full p-3 pl-12 text-black  border border-slate-700 rounded-lg  placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 dark:text-slate-300 font-medium">Fecha de inicio</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Calendar className="w-5 h-5" />
              </span>
              <input
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full p-3 pl-12 text-black border border-slate-700 rounded-lg placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 dark:text-slate-300 font-medium">Método de pago</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Wallet className="w-5 h-5" />
              </span>
              <select
                name="metodo"
                value={formData.metodo}
                onChange={handleChange}
                className="w-full p-3 pl-12 text-black border border-slate-700 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none cursor-pointer"
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
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">Confirmación</h3>
          <div className=" border border-slate-700 p-6 rounded-xl mb-6">
            <div className="flex justify-between py-3 border-b border-slate-700">
              <span className="text-slate-400">Plan</span>
              <span className="text-white font-medium">
                {duration} meses ({rate}%)
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-700">
              <span className="text-slate-400">Monto</span>
              <span className=" font-medium">{formData.monto || "N/A"} $</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-700">
              <span className="text-slate-400">Fecha</span>
              <span className=" font-medium">{formData.fecha || "N/A"}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-700">
              <span className="text-slate-400">Método de pago</span>
              <span className=" font-medium">{formData.metodo || "N/A"}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-slate-400">Rentabilidad</span>
              <span className="text-blue-400 font-bold text-lg">{calcularRentabilidad()}</span>
            </div>
          </div>

          {Object.entries(formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

          <div className="flex items-center border border-slate-700 p-4 rounded-lg">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-3 w-5 h-5 accent-blue-600"
              required
            />
            <label htmlFor="terms" className="text-sm text-slate-300">
              Acepto los{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                términos y condiciones
              </a>
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeStep === 1
              ? "invisible"
              : " hover:bg-slate-600 border border-slate-600"
          }`}
        >
          <ArrowLeft className="inline-block mr-2 w-5 h-5" /> Anterior
        </button>

        {activeStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 rounded-lg flex items-center hover:bg-blue-700 transition-all font-medium shadow-lg shadow-blue-600/30"
          >
            Siguiente <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600  rounded-lg flex items-center hover:bg-blue-700 transition-all font-medium shadow-lg shadow-blue-600/30"
          >
            <Check className="mr-2 w-5 h-5" /> Enviar
          </button>
        )}
      </div>
    </form>
  );
}