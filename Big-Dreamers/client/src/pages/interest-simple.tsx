import {
  ArrowLeft,
  Check,
  Percent,
  ArrowRight,
  BarChart,
} from "lucide-react";
import { Link } from "wouter";
import ThreeStepForm from "@/components/ThreeStepForm";

export default function InterestSimple() {
  const features = [
    "Rendimiento con interés simple",
    "Inversión mínima de 2.000 USD",
    "Pagos claros y predecibles",
    "Sin comisiones ni costos ocultos",
    "Cálculo directo y transparente",
    "Acompañamiento y soporte personalizado",
  ];

  const examples = [
    { amount: "2.000 USD", profit: "1.375 USD" },
    { amount: "5.000 USD", profit: "3.438 USD" },
    { amount: "10.000 USD", profit: "6.875 USD" },
  ];

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
                <span className="text-[#048abf] dark:text-[#feba2b]">Interés</span> Simple
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                La forma más clara y directa de hacer crecer tu dinero.
              </p>
              <div className="my-6" />
              <p className="text-gray-600 dark:text-gray-300">
                El Interés Simple te permite proyectar tus rendimientos desde el
                inicio, sin cálculos complejos. La ganancia se calcula siempre 
                sobre tu capital inicial, lo que hace este sistema ideal para
                quienes buscan claridad, estabilidad y un retorno predecible.
              </p>
              <div className="my-6" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                ¿Por qué elegir Interés Simple?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Con una tasa fija del 2.5 % y un esquema de inversión accesible
                desde 2.000 USD, obtenés un rendimiento estable que podés
                calcular desde el primer día. Todo es transparente, directo y sin
                comisiones adicionales.
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
                      Empezá Hoy
                    </p>
                    <p className="text-white text-sm opacity-90">
                      Conocé experiencias reales de otros inversores.
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

            <div className="neumorph-inset p-6 rounded-xl">
              <ThreeStepForm
                rate={2.5}
                duration={24}
                formAction="https://formsubmit.co/dreamersb648@gmail.com"
                formSubject="Solicitud Interés Simple"
                nextUrl="https://bigdreamerss.com/gracias"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
