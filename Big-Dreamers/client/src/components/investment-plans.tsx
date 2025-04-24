import { CreditCard, Clock, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useModal } from "@/hooks/use-modal";

export default function InvestmentPlans() {
  const { openModal } = useModal();
  
  const plans = [
    {
      id: "short",
      title: "Plan Corto Plazo",
      rate: "1.5%",
      time: "6 meses",
      minInvestment: "1000 $",
      route: "/plan/corto-plazo",
      color: "#048abf",
      features: [
        "Liquidez a los 6 meses",
        "Sin comisiones",
      ]
    },
    {
      id: "medium",
      title: "Plan Mediano Plazo",
      rate: "2.0%",
      time: "12 meses",
      minInvestment: "1500 $",
      route: "/plan/mediano-plazo",
      color: "#feba2b",
      features: [
        "Reportes trimestrales",
        "Acceso a eventos exclusivos"
      ]
    },
    {
      id: "long",
      title: "Plan Largo Plazo",
      rate: "2.5%",
      time: "24 meses",
      minInvestment: "2.000 $",
      route: "/plan/largo-plazo",
      color: "#048abf",
      features: [
        "Máxima rentabilidad",
        "Asesoramiento personalizado"
      ]
    },
    {
      id: "startup",
      title: "Para Startups",
      rate: "Personalizado",
      time: "Flexible",
      minInvestment: "Proyecto viable",
      route: "/startups",
      color: "#feba2b",
      features: [
        "Financiación adaptada a tu proyecto",
        "Mentoría de expertos"
      ]
    }
  ];

  return (
    <section id="investment" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white"
            data-aos="fade-up"
          >
            Planes de <span className="text-[#feba2b]">Inversión</span>
          </h2>
          <p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            Cada meta necesita un plan. Elegí el que mejor se ajuste a tus sueños, tomá el control de tu camino financiero y empezá a hacer que las cosas pasen de verdad. Porque el momento es ahora, y tu futuro lo construimos juntos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className="neumorph rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="p-6 relative" style={{ backgroundColor: `${plan.color}10` }}>
                <div 
                  className="absolute top-0 right-0 px-4 py-2 rounded-bl-lg font-bold text-white"
                  style={{ backgroundColor: plan.color }}
                >
                  {plan.rate}
                </div>
                
                <h3 className="text-xl font-bold mb-4 mt-6 text-gray-800 dark:text-white">
                  {plan.title}
                </h3>
                
                <div className="flex items-center mb-4 text-gray-700 dark:text-gray-300">
                  <Clock className="w-5 h-5 mr-2" style={{ color: plan.color }} />
                  <span>Duración: {plan.time}</span>
                </div>
                
                <div className="flex items-center mb-6 text-gray-700 dark:text-gray-300">
                  <CreditCard className="w-5 h-5 mr-2" style={{ color: plan.color }} />
                  <span>Inversión mínima: {plan.minInvestment}</span>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <TrendingUp className="w-5 h-5 mr-2 mt-0.5" style={{ color: plan.color }} />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Link href={plan.route} className="flex-1">
                    <button 
                      className="w-full py-2 rounded-md text-white font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: plan.color }}
                    >
                      Más Información
                    </button>
                  </Link>
                  
                  <button 
                    className="flex-1 py-2 rounded-md font-medium transition-colors border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#048abf] text-gray-800 dark:text-white"
                    onClick={() => openModal('subscribe', plan.id)}
                  >
                    {plan.id === "startup" ? "Postularme" : "Suscribirme"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}