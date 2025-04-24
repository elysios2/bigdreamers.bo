import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";

// Guía simplificada e intuitiva para inversores principiantes
const steps = [
  {
    title: "1. Define tu meta",
    image: "/assets/images/step1.png", // Reemplaza con la ruta real de tu imagen
    content: [
      "Antes de invertir, identifica con claridad el propósito de tu dinero:",
      "¿Buscas hacer crecer tu patrimonio a largo plazo, generar ingresos adicionales, proteger tus ahorros de la inflación o financiar un proyecto específico, como la compra de una casa o el inicio de un negocio?",
    ],
    lists: [
      "Establece metas SMART (Específicas, Medibles, Alcanzables, Relevantes y Temporales)",
      "Define tu horizonte de inversión (corto, mediano o largo plazo)",
      "Anota tus objetivos en un plan para revisarlos periódicamente"
    ]
  },
  {
    title: "2. Conoce tu presupuesto",
    image: "/assets/images/step2.png",
    content: [
      "Analiza tus ingresos, gastos fijos y nivel de liquidez disponible.",
      "Crea un presupuesto mensual detallado y asigna un porcentaje de tus ingresos —por ejemplo, del 10% al 20%— para destinarlo a inversiones.",
      "Antes de comprometer montos mayores, asegúrate de contar con un fondo de emergencia equivalente a 3 a 6 meses de gastos."
    ]
  },
  {
    title: "3. Elige tu tipo de inversión",
    image: "/assets/images/step3.png",
    content: [
      "Explora las diferentes alternativas según tu perfil de riesgo y objetivo financiero:",
    ],
    lists: [
      "Cuentas de ahorro de alto rendimiento: capital seguro y liquidez diaria.",
      "Bonos gubernamentales o corporativos: pagos periódicos de intereses con menor volatilidad.",
      "Fondos comunes de inversión y ETFs: diversificación y gestión profesional a bajo costo.",
      "Acciones y fondos de crecimiento: mayor potencial de ganancia a largo plazo con mayor volatilidad."
    ]
  },
  {
    title: "4. Comprende el riesgo",
    image: "/assets/images/step4.png",
    content: [
      "Todo instrumento financiero con posibilidad de alto rendimiento conlleva fluctuaciones de mercado.",
      "Reflexiona sobre tu tolerancia al riesgo:",
    ],
    lists: [
      "¿Qué porcentaje de pérdida podrías tolerar sin tomar decisiones impulsivas?",
      "¿Tu situación financiera actual te permite soportar períodos de baja sin afectar tu estilo de vida?",
      "Diseña una asignación de activos equilibrada (ej. 50% bajo, 30% medio, 20% alto)."
    ]
  },
  {
    title: "5. Monitorea y ajusta",
    image: "/assets/images/step5.png",
    content: [
      "El mercado y tus necesidades personales cambian con el tiempo.",
      "Revisa tu portafolio al menos cada seis meses para evaluar rendimiento y rebalancear activos.",
      "Utiliza herramientas en línea, asesoría profesional o aplicaciones móviles que te alerten sobre desviaciones importantes."
    ]
  }
];

export default function InvestorGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (!isLast) setCurrentStep((s) => s + 1);
  };
  const handlePrev = () => {
    if (!isFirst) setCurrentStep((s) => s - 1);
  };

  const { title, image, content, lists } = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-3xl mx-auto space-y-8">
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Contenedor del paso */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="prose dark:prose-dark mx-auto"
        >
          {/* Imagen ilustrativa */}
          {image && (
            <motion.img
              src={image}
              alt={title}
              className="w-full rounded-xl shadow-lg mb-6"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Título */}
          <h2 className="text-2xl font-bold mb-4">{title}</h2>

          {/* Párrafos de contenido */}
          {content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          {/* Lista de puntos clave */}
          {lists && (
            <ul className="list-disc list-inside space-y-2 mt-4">
              {lists.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Navegación */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={isLast}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
          >
            {isLast ? "Finalizar" : "Siguiente"}
          </button>
        </div>
      </main>
      <Footer />
      <ThemeToggle />
      <Chatbot />
    </div>
  );
}
