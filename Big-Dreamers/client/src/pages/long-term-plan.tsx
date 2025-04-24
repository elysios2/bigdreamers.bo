import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Percent,
  Calendar,
  DollarSign,
  Wallet,
  ArrowRight,
  BarChart,
} from "lucide-react";
import { Link } from "wouter";

export default function LongTermPlan() {
  const [activeStep, setActiveStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    monto: "",
    fecha: "",
    metodo: "Transferencia bancaria",
  });

  const features = [
    "Plazo de 18 a 24 meses",
    "Inversión mínima de 2500 $",
    "Retiro al final del plazo",
    "Sin comisiones",
    "Seguimiento en tiempo real de tu inversión",
    "Soporte personalizado",
  ];

  const examples = [
    { amount: "2.000 $us", profit: "1375 $" },
    { amount: "5.000 $us", profit: "3438 $" },
    { amount: "10.000 $us", profit: "6.875 $" },
  ];

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const calcularRentabilidad = () => {
    const montoNumerico = parseFloat(formData.monto.replace(/[^0-9.]/g, ""));
    if (isNaN(montoNumerico)) return "N/A";
    const rentabilidadTotal = montoNumerico * 0.025 * 24;
    return `$${rentabilidadTotal.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-[#ff0066] dark:text-white dark:hover:text-[#feba2b] mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>

        {/* CUADRANTES RENTABILIDAD */}

        <div className="bg-white dark:bg-[#048abf] p-6 md:p-8 rounded-xl mb-12 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Ejemplos de <span className="text-[#feba2b]">Rentabilidad</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-[#048abf] rounded-lg p-6 shadow-md hover:scale-105 transition-transform duration-300"
              >
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Inversión:
                </p>
                <p
                  className="text-lg font-semibold dark:text-white"
                  style={{ color: "#048abf" }}
                >
                  {example.amount}
                </p>
                <div className="my-2" />
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Ganancia estimada:
                </p>
                <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                  {example.profit}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="neumorph p-6 md:p-8 rounded-xl mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                <span className="text-[#048abf] dark:text-[#feba2b]">Plan</span> Largo Plazo
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Tu inversión con retorno rápido y sin complicaciones.
              </p>
              <div className="my-6" />
              <p className="text-gray-600 dark:text-gray-300">
                El Plan Largo Plazo está diseñado para quienes buscan construir
                un patrimonio sólido a mediano y largo plazo, sin preocuparse
                por la volatilidad del mercado diario. Con una duración fija de
                24 meses, esta opción te ofrece la tranquilidad de saber que tu
                capital estará invertido durante un horizonte de tiempo
                definido, al final del cual recibirás el reembolso íntegro de tu
                inversión junto con los intereses generados.
              </p>
              <div className="my-6" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                Invertí en el Plan Largo Plazo
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Para acceder a este plan, sólo necesitas un mínimo de inversión
                de 2 000 USD. Desde el primer momento, tu dinero empieza a
                generar rendimientos a una tasa fija del 2,5 %, lo que te
                permite proyectar con precisión el beneficio total que obtendrás
                al concluir los dos años.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-[#feba2b] text-white text-2xl md:text-3xl font-bold py-3 px-6 rounded-lg inline-flex items-center">
                <Percent className="h-6 w-6 mr-2" />
                2.5
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Características
              </h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 p-6 rounded-2xl shadow-xl bg-gradient-to-r from-[#feba2b] to-[#ffcc55] flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white bg-opacity-25 rounded-full animate-pulse">
                    <BarChart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                <p className="text-white text-2xl font-semibold">
                  ¡Invierte Ya!
                </p>
                <p className="text-white text-sm opacity-90">
                  Historias inspiradoras.
                </p>
                </div>
                </div>
                <Link
                href="/casos-de-exito"
                className="mt-4 md:mt-0 inline-flex items-center bg-white text-[#feba2b] dark:text-white px-5 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
                >
                Ver
                <ArrowRight className="h-4 w-4 ml-2 text-[#feba2b] dark:text-white" />
                </Link>
              </div>
            </div>

            {showSuccess ? (
              <div className="neumorph-inset p-6 rounded-xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Hemos recibido tu solicitud para el Plan largo Plazo. Uno de
                  nuestros asesores se pondrá en contacto contigo en las
                  próximas 24 horas.
                </p>
                <Link href="/">
                  <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                    Volver al inicio
                  </button>
                </Link>
              </div>
            ) : (
              <div className="neumorph-inset p-6 rounded-xl">
                <div className="flex justify-between mb-6">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`relative w-1/3 ${step < 3 ? 'after:content-[""] after:absolute after:top-1/2 after:left-full after:w-full after:h-0.5 after:-translate-y-1/2 after:bg-gray-300 dark:after:bg-gray-600' : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${activeStep >= step ? "bg-[#feba2b] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                      >
                        {step}
                      </div>
                      <p
                        className={`text-xs text-center ${activeStep >= step ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
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

                {activeStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Información personal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nombre
                        </label>
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-[#035380] dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          value={formData.apellidos}
                          onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-[#035380] dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-[#035380] dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-[#035380] dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Detalles de la inversión
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Monto a invertir ($)
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                            <DollarSign className="h-5 w-5" />
                          </span>
                          <input
                            type="text"
                            value={formData.monto}
                            onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-[#035380] dark:text-white"
                            placeholder="Mínimo 5000$"
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="range"
                            min="1000"
                            max="10000"
                            step="500"
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>1.000$</span>
                            <span>10.000$</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Fecha de inicio
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                            <Calendar className="h-5 w-5" />
                          </span>
                          <input
                            type="date"
                            value={formData.fecha}
                            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-[#035380] dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Método de pago
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                            <Wallet className="h-5 w-5" />
                          </span>
                          <select
                            value={formData.metodo}
                            onChange={(e) => setFormData({ ...formData, metodo: e.target.value })}
                            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-[#035380] dark:text-white"
                          >
                            <option>Transferencia bancaria</option>
                            <option>Tarjeta de crédito</option>
                            <option>Efectivo</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Confirmación
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Revisa los detalles de tu inversión antes de confirmar:
                    </p>

                    <div className="bg-gray-100 dark:bg-[#03436a] p-4 rounded-lg mb-4">
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-300">
                          Plan
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          largo Plazo (2.5%)
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-300">
                          Monto
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {formData.monto} $
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-300">
                          Duración
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          24 meses
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-300">
                          Fecha de inicio
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {formData.fecha}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600 dark:text-gray-300">
                          Rentabilidad 
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {calcularRentabilidad()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <input type="checkbox" id="terms" className="mr-2" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-600 dark:text-gray-300"
                      >
                        He leído y acepto los{" "}
                        <a href="#" className="text-primary hover:underline">
                          términos y condiciones
                        </a>
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevStep}
                    className={`flex items-center text-gray-700 dark:text-white px-4 py-2 rounded-lg ${activeStep === 1 ? "invisible" : ""}`}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="bg-[#048abf] text-white px-6 py-2 rounded-lg hover:bg-[#feba2b] transition-colors flex items-center"
                  >
                    {activeStep === 3 ? "Confirmar" : "Siguiente"}
                    {activeStep < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
