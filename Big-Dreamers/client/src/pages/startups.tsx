import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Rocket,
  Users,
  LightbulbIcon,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import StartupForm from "@/components/startup-form";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Startups() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="py-12 md:py-20 bg-white dark:bg-[#048abf]">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center text-[#048abf] dark:text-white hover:text-[#036d9f] dark:hover:text-[#feba2b] transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>

            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white"
                data-aos="fade-up"
              >
                Programa para <span className="text-[#feba2b]">Startups</span>
              </h1>

              <p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Conectamos startups innovadoras con inversores que comparten tu
                visión
              </p>

              <div
                className="flex justify-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <a
                  href="#form"
                  className="bg-[#feba2b] hover:bg-[#e0a61f] text-white px-8 py-3 rounded-md text-lg font-medium transition-colors inline-flex items-center"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Postular mi startup
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50 dark:bg-[#036d9f]">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              ¿Por qué elegir{" "}
              <span className="text-[#048abf] dark:text-[#feba2b]">
                BigDreamers
              </span>
              ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className="neumorph p-6 rounded-xl h-full"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="bg-[#048abf] text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  Red de Inversores
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Accede a nuestra exclusiva red de inversores, capital semilla
                  y fondos de capital riesgo especializados en etapas tempranas
                  y de alta rentabilidad.
                </p>
              </div>

              <div
                className="neumorph p-6 rounded-xl h-full"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="bg-[#feba2b] text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <LightbulbIcon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  Mentoría Especializada
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Recibe asesoramiento personalizado de mentores con experiencia
                  en tu sector que te ayudarán a pulir tu propuesta y estrategia
                  de negocio.
                </p>
              </div>

              <div
                className="neumorph p-6 rounded-xl h-full"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="bg-[#048abf] text-white p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  Escalabilidad Garantizada
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Diseñamos planes de financiación que crecen con tu empresa,
                  desde rondas semilla hasta Series A, adaptándonos a tu fase de
                  desarrollo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-white dark:bg-[#048abf]">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              Proceso de <span className="text-[#feba2b]">Selección</span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-9 top-3 h-full w-1 bg-[#feba2b] rounded-full"></div>

                <div className="relative z-10 mb-12" data-aos="fade-up">
                  <div className="flex">
                    <div className="bg-[#feba2b] text-white font-bold text-xl rounded-full w-20 h-20 flex items-center justify-center mr-6 shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                        Postulación
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Completa el formulario con información detallada sobre
                        tu startup, equipo y necesidades de financiación. Es
                        importante que incluyas datos relevantes sobre tu
                        proyecto y mercado objetivo.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative z-10 mb-12"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="flex">
                    <div className="bg-[#feba2b] text-white font-bold text-xl rounded-full w-20 h-20 flex items-center justify-center mr-6 shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                        Evaluación
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Nuestro equipo de analistas revisará tu propuesta en un
                        plazo máximo de 72 horas. Evaluamos aspectos como la
                        innovación, escalabilidad, tamaño de mercado y capacidad
                        del equipo.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative z-10 mb-12"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="flex">
                    <div className="bg-[#feba2b] text-white font-bold text-xl rounded-full w-20 h-20 flex items-center justify-center mr-6 shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                        Presentación
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Si tu proyecto es preseleccionado, te invitaremos a una
                        sesión virtual donde presentarás tu startup a nuestro
                        comité. Te guiaremos en la preparación para maximizar
                        tus posibilidades de éxito.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative z-10"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="flex">
                    <div className="bg-[#feba2b] text-white font-bold text-xl rounded-full w-20 h-20 flex items-center justify-center mr-6 shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                        Financiación
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Las startups seleccionadas accederán a nuestra
                        plataforma de inversión donde se definirán las
                        condiciones y plazos del financiamiento. Trabajaremos
                        contigo para encontrar la estructura óptima para tu caso
                        específico.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50 dark:bg-[#036d9f]">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              Referencias de{" "}
              <span className="text-[#048abf] dark:text-[#feba2b]">
                Éxito en el mundo de las inversiones
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className="neumorph p-6 rounded-xl"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#048abf] rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Truora
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Startup colombiana de ciberseguridad y validación de identidad
                  fundada en 2019. Ha mejorado la seguridad en empresas como
                  Rappi y Addi, y ha recibido una inversión de 15 millones de
                  dólares para expandirse en América Latina y el Mundo.
                </p>
                <div className="text-[#048abf] dark:text-[#feba2b] font-medium">
                  Financiación: 15M$
                </div>
              </div>

              <div
                className="neumorph p-6 rounded-xl"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#feba2b] rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Urbvan (México)
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Startup de transporte compartido que comenzó en 2016 con solo
                  cinco vans. Con una inversión inicial de $800,000 USD, ha
                  crecido significativamente, recaudando $9 millones USD en
                  rondas posteriores. Ofrece servicios de vanpooling eficientes
                  y seguros en varias ciudades mexicanas.
                </p>
                <div className="text-[#048abf] dark:text-[#feba2b] font-medium">
                  Financiación: 800K$
                </div>
              </div>

              <div
                className="neumorph p-6 rounded-xl"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#048abf] rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    PasanaQ (Bolivia)
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Aplicación que digitaliza el tradicional "pasanaku",
                  permitiendo a usuarios crear asociaciones de ahorro
                  colaborativo. Fundada por Diego Rojas e Ignacio Malpartida, ha
                  recaudado $180,000 USD de fondos estadounidenses e inversores
                  ángeles.
                </p>
                <div className="text-[#048abf] dark:text-[#feba2b] font-medium">
                  Financiación: 190K€
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="form" className="py-16 bg-white dark:bg-[#048abf]">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              Postula tu <span className="text-[#feba2b]">Startup ¡ahora!</span>
            </h2>

            <div data-aos="fade-up" data-aos-delay="100">
              <StartupForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ThemeToggle />
      <Chatbot />
    </div>
  );
}
