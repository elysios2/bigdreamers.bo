import { CreditCard, Clock, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useModal } from "@/hooks/use-modal";

export default function InterestSection() {
    const { openModal } = useModal();

    const plans = [
        {
            id: "simple",
            title: "Interés Simple",
            rate: "1.5% – 2.5%",
            time: "6 – 24 meses",
            minInvestment: "7.000 Bs",
            route: "/plan/interes-simple",
            color: "#048abf",
            features: [
                "Rentabilidad fija mensual según duración",
                "Control total sobre tu inversión",
                "Contratos claros y transparentes, con opción de renovación",
                "Pagos mensuales puntuales",
                "Atención personalizada y acompañamiento financiero",
                "Devolución completa del capital al finalizar el contrato",
                "Ideal para quienes buscan estabilidad",
            ]
        },
        {
            id: "compuesto",
            title: "Interés Compuesto",
            rate: "1.5% – 2.5%",
            time: "6 – 24 meses",
            minInvestment: "7.000 Bs",
            route: "/plan/interes-compuesto",
            color: "#feba2b",
            features: [
                "Crecimiento progresivo del capital",
                "Transparencia y respaldo institucional de Big Dreamers",
                "Flexibilidad al finalizar: retiro o reinversión",
                "Rentabilidad superior al simple a mediano y largo plazo",
                "Seguimiento personalizado y asesoramiento financiero constante",
            ]
        },
        {
            id: "mixto",
            title: "Interés Mixto",
            rate: "1.5% – 2.5%",
            time: "6 – 24 meses",
            minInvestment: "7.000 Bs",
            route: "/plan/interes-mixto",
            color: "#048abf",
            features: [
                "Combina liquidez del simple y crecimiento del compuesto",
                "Permite obtener ganancias periódicas con opción de reinversión parcial",
                "Mayor control sobre retiros y acumulación de intereses",
                "Ideal para quienes buscan equilibrio entre rendimiento y disponibilidad",
                "Respaldo, asesoramiento y seguimiento constante por parte de Big Dreamers"
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
                        Donde Tus <span className="text-yellow-400">Sueños</span> Se Hacen <span className="text-yellow-400">Rentables</span>
                    </h2>
                    <p
                        className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        No esperes más: tu futuro financiero se construye con pasos inteligentes. <br/> 
                        Elegí tu plan y hacé que cada inversión cuente.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className="rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-3 shadow-lg hover:shadow-4xl bg-white"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="p-6 relative">
                                <div
                                    className="absolute top-0 right-0 px-4 py-2 rounded-bl-lg font-bold text-white text-sm"
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
                                            className="w-full py-2 rounded-md font-medium text-white transition-all hover:opacity-90"
                                            style={{ background: `linear-gradient(90deg, ${plan.color} 0%, ${plan.color}99 100%)` }}
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
