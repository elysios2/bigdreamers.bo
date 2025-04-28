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
import ThreeStepForm from "@/components/ThreeStepForm";

export default function MediumTermPlan() {
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
    "Plazo de 12 meses",
    "Inversión mínima de 2000 $",
    "Reportes trimestrales detallados",
    "Acceso a eventos exclusivos para inversores",
    "Asesoramiento básico sobre tu cartera",
    "Beneficios fiscales especiales",
  ];

  const examples = [
    { amount: "2.000 $us", profit: "480 $", rentability: "24%" },
    { amount: "10.000 $us", profit: "2400 $", rentability: "24%" },
    { amount: "20.000 $us", profit: "4800 $", rentability: "24%" },
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
    const rentabilidadTotal = montoNumerico * 0.02 * 12;
    return `$${rentabilidadTotal.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-[#feba2b] dark:text-white dark:hover:text-[#feba2b] mb-6"
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
                <div className="my-2" />
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Rentabilidad anual:
                </p>
                <p
                  className="text-lg font-semibold dark:text-white"
                  style={{ color: "#048abf" }}
                >
                  {example.rentability}
                </p>
                <div className="my-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="neumorph p-6 md:p-8 rounded-xl mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                <span className="text-[#048abf] dark:text-[#feba2b]">Plan </span>Mediano Plazo
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Un balance inteligente entre crecimiento, seguridad y
                compromiso..
              </p>
              <div className="my-6" />
              <p className="text-gray-600 dark:text-gray-300">
                Este plan está diseñado para inversionistas con visión
                estratégica: aquellos que no quieren esperar años para ver
                resultados, pero que entienden que el verdadero crecimiento no
                se construye de la noche a la mañana. El Plan Mediano Plazo
                ofrece una alternativa sólida y con excelentes proyecciones para
                quienes buscan estabilidad y retorno constante durante un
                período definido.
              </p>
              <div className="my-6" />
              <p className="text-gray-600 dark:text-gray-300">
                Con una duración de 12 meses, este plan permite capitalizar tu
                inversión de forma gradual, manteniendo el riesgo bajo control y
                con la posibilidad de reinversión al final del ciclo. Es
                perfecto para quienes ya tienen cierta experiencia en el mundo
                de las inversiones o desean comenzar a construir un portafolio
                más robusto, diversificando con inteligencia.
              </p>
            </div>
            <div className="mt- md:mt-0">
              <div className="bg-[#feba2b] text-white text-2xl md:text-3xl font-bold py-3 px-6 rounded-lg inline-flex items-center">
                <Percent className="h-6 w-6 mr-2" />
                2.0
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="space-y-6 mb-8">
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
            </div>

            <div className="neumorph-inset p-6 rounded-xl">
              <ThreeStepForm
                rate={2.0}
                duration={12}
                formAction="https://formsubmit.co/elysios2plantillas@gmail.com"
                formSubject="Solicitud Plan Mediano Plazo"
                nextUrl="/gracias"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
