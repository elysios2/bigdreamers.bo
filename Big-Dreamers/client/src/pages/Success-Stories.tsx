import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

// Datos de ejemplo para los casos de éxito
const casos = [
  {
    id: 1,
    title: "Airbnb",
    image: "",
    excerpt:
      " Inversión semilla de $600K en 2009; IPO valuada en más de $100B (x166,000).",
    details: `Emprendedores: Brian Chesky, Joe Gebbia y Nathan Blecharczyk
      Inversión inicial: $600 000 (Y Combinator + ángeles)
      Retorno para inversores: multiplicaron su inversión en ~166 000×
      Impacto: revolucionó el alquiler vacacional y hoy factura miles de millones al año.`,
  },
  {
    id: 2,
    title: "Dropbox",
    image: "",
    excerpt: "Semilla de $1.2M en 2008; exit de $10B en 2018 (x8,333).",
    details: `Emprendedores: Drew Houston y Arash Ferdowsi
    Inversión inicial: $1.200.000 (Sequoia, Y Combinator)
    Retorno para inversores: ~8 333× su capital en IPO
    Impacto: estandarizó el almacenamiento en la nube para particulares y empresas.`,
  },
  {
    id: 3,
    title: "Mercado Libre",
    image: "https://via.placeholder.com/400x250?text=Mercado+Libre",
    excerpt: "IPO en 2007 valuada en $1 B; hoy supera los $70 B (x70).",
    details: `Emprendedor: Marcos Galperin
      Inversión inicial: $7.6 M (JP Morgan, Goldman Sachs, etc.)
      Retorno estimado: ~70× desde IPO
      Impacto: mayor plataforma de ecommerce y fintech de LATAM.`,
  },
  {
    id: 4,
    title: "Coinbase",
    image: "",
    excerpt:
      "Semilla de $600 K en 2012; IPO en 2021 valuada en >$85 B (x141 667).",
    details: `Emprendedores: Brian Armstrong y Fred Ehrsam
    Inversión inicial: $600 000 (Y Combinator + ángeles)
    Retorno para inversores: ~141 667× en IPO
    Impacto: una de las mayores exchanges de criptomonedas del mundo.`,
  },
  {
    id: 5,
    title: "Rappi",
    image: "https://via.placeholder.com/400x250?text=Rappi",
    excerpt: "Inversión inicial de $200 K en 2016; valuación >$5 B (x25 000).",
    details: `Emprendedores: Simón Borrero, Felipe Villamarín y Sebastián Mejía
    Inversión inicial: $200 000 (Y Combinator)
    Retorno estimado: ~25 000× desde semilla
    Impacto: líder de delivery en LATAM, presente en +9 países.`,
  },
  {
    id: 6,
    title: "Glovo",
    image: "https://via.placeholder.com/400x250?text=Glovo",
    excerpt:
      "Inversión semilla de €120 K en 2015; exit de €2.3 B en 2022 (x19 167).",
    details: `Emprendedores: Oscar Pierre y Sacha Michaud
    Inversión inicial: €120 000 (Cabiedes & Partners)
    Retorno estimado: ~19 167× al momento del exit con Delivery Hero
    Impacto: presencia en más de 25 países en Europa y África.`,
  },
];

export default function CasosDeExito() {
  const [selectedCaso, setSelectedCaso] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Navegación */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-[#ff0066] dark:text-white mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Volver al inicio
        </Link>

        {/* Título y descripción */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Ejemplos que Inspiran
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Imaginá ser parte del crecimiento de nuevas ideas. Estos ejemplos muestran lo que pequeñas inversiones pueden lograr. Vos podés impulsar el próximo gran proyecto con {" "}
            <strong>
              <span className="text-[#048abf]">Big</span>{" "}
              <span className="text-[#feba2b]">Dreamers</span>
            </strong>
          </p>
        </header>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {casos.map((caso) => (
            <div
              key={caso.id}
              className="bg-white dark:bg-[#03436a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={caso.image}
                alt={caso.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {caso.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {caso.excerpt}
                </p>
                <button
                  onClick={() => setSelectedCaso(caso.id)}
                  className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de detalle */}
        {selectedCaso !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-xl w-full p-6 relative">
              <button
                onClick={() => setSelectedCaso(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
              {casos
                .filter((c) => c.id === selectedCaso)
                .map((c) => (
                  <div key={c.id}>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                      {c.title}
                    </h3>
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-56 object-cover rounded-md mb-4"
                    />
                    <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                      {c.details.split("\n").map((linea, index) => (
                        <li key={index}>{linea}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* CTA final */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ¿Te animás a convertir tu proyecto en un caso de éxito? Súmate a
            Big Dreamers, invertí hoy y comenzá a escribir tu propia historia de
            triunfo.
          </p>
          <Link
            href="/inversion"
            className="inline-block bg-[#feba2b] text-white px-6 py-3 rounded-lg hover:bg-[#048abf] transition"
          >
            Conocé nuestros planes
          </Link>
        </div>
      </div>
    </div>
  );
}
