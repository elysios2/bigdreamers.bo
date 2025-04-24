import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Users, LightbulbIcon, TrendingUp } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";

import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutUs() {
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
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white"
                data-aos="fade-up"
              >
                Sueña con <span className="text-[#feba2b]">BigDreamers</span>
              </h1>

              <p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Empoderamos a las empresas con visión para construir un futuro
                mejor
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-gray-50 dark:bg-[#036d9f]">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              Nuestra{" "}
              <span className="text-[#048abf] dark:text-[#feba2b]">Misión</span>
            </h2>

            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                En BigDreamers, nos dedicamos a apoyar a startups innovadoras,
                conectándolas con los recursos y oportunidades que necesitan
                para crecer, escalar y tener éxito en un mundo empresarial cada
                vez más competitivo.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white dark:bg-[#048abf]">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              ¿Por qué elegir{" "}
              <span className="text-[#feba2b]">BigDreamers</span>?
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
                  Accede a nuestra red de inversores y expertos que están listos
                  para apoyar el crecimiento de tu startup.
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
                  Te ayudamos a perfeccionar tu estrategia de negocio y a
                  optimizar tus propuestas con el apoyo de expertos de la
                  industria.
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
                  Escalabilidad Asegurada
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Te ayudamos a crear un plan de crecimiento adaptable,
                  asegurando que tu startup esté preparada para escalar cuando
                  sea el momento adecuado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>

      <ThemeToggle />
      <Chatbot />
    </div>
  );
}
