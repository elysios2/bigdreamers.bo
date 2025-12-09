import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Percent,
  ArrowRight,
  BarChart,
} from "lucide-react";
import { Link } from "react-router-dom";
import ThreeStepForm from "@/components/ThreeStepForm";

export default function LongTermPlan() {
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

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Link
          to="/"
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
                to="/casos-de-exito"
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
                formSubject="Solicitud Plan Largo Plazo"
                nextUrl="https://bigdreamerss.com/gracias"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
