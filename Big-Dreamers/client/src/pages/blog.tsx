import { useEffect, useState } from "react";
import { Link } from "wouter";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";

// Datos de ejemplo de noticias: reemplaza con fetch real o una API.
const newsArticles = [
  {
    id: 1,
    title: "Kavak cierra ronda Series F de $700M liderada por SoftBank",
    date: "2025-04-10",
    summary:
      "La fintech mexicana Kavak fortalece su valoración en Latinoamérica tras atraer capital de SoftBank para acelerar su expansión internacional.",
    content: `
      <p>La startup mexicana Kavak anunció el cierre de su ronda Series F por 700 millones de dólares, liderada por SoftBank Vision Fund 2.</p>
      <p>Con esta inyección de capital, Kavak planea expandir su plataforma de compra-venta de autos usados a nuevos mercados en América Latina y Estados Unidos.</p>
      <p>El CEO, Ricardo Weder, declaró que los fondos se destinarán a mejorar la experiencia del usuario y acelerar el desarrollo de productos tecnológicos.</p>
    `,
    url: "https://ejemplo.com/noticia/kavak-softbank",
    image: "/images/kavak.jpg",
  },
  {
    id: 2,
    title: "Rappi alcanza rentabilidad operativa en 2024",
    date: "2025-03-28",
    summary:
      "La superapp colombiana reporta márgenes positivos tras optimizar sus servicios de última milla y consolidar alianzas estratégicas.",
    content: `
      <p>Rappi, fundada en 2015, anunció que alcanzó rentabilidad operativa en el cierre de 2024, un hito clave en su trayectoria.</p>
      <p>La compañía atribuyó este logro a la mejora en la logística y a acuerdos con grandes cadenas de retail y supermercados.</p>
      <p>En un comunicado oficial, Sebastián Mejía mencionó que esta rentabilidad fortalecerá las inversiones en nuevas verticales como RappiPay y RappiHealth.</p>
    `,
    url: "https://ejemplo.com/noticia/rappi-rentable",
    image: "/images/rappi.jpg",
  },
  {
    id: 3,
    title: "Nubank entra al mercado argentino con nueva licencia bancaria",
    date: "2025-04-05",
    summary:
      "La neobanco brasileña expande su footprint en Latam, ofreciendo cuentas digitales sin comisiones y nuevas herramientas de inversión.",
    content: `
      <p>Nubank obtuvo la licencia de banco comercial en Argentina, permitiendo a la firma ofrecer cuentas de ahorro y préstamos.</p>
      <p>El anuncio marca la tercera operación bancaria de Nubank en la región, tras Brasil y México.</p>
      <p>David Vélez, cofundador, señaló que la estrategia busca democratizar el acceso a servicios financieros en Latam.</p>
    `,
    url: "https://ejemplo.com/noticia/nubank-argentina",
    image: "/images/nubank.jpg",
  },
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
    return () => AOS.refresh();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="py-12 md:py-20 bg-white dark:bg-[#048abf]">
          <div className="container mx-auto px-4 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              Blog de <span className="text-[#feba2b]">Noticias Financieras</span>
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Tendencias, inversión y startups en el mundo y Latinoamérica
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 bg-gray-50 dark:bg-[#036d9f]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white dark:bg-[#048abf] rounded-xl shadow-lg overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={article.id * 100}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                      {article.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {article.summary}
                    </p>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-[#048abf] dark:text-[#feba2b] font-medium hover:underline"
                    >
                      Leer más →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto p-6 relative">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                {selectedArticle.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {selectedArticle.date}
              </p>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ThemeToggle />
      <Chatbot />
    </div>
  );
}
