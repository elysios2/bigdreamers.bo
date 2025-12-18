import { ChevronDown } from "lucide-react";
import { services } from "@/mockdata/advice-mentoring";
import { AdviceMentoringSection } from "@/types/advice-mentoring-section";



export default function ServicesSection({ openFaq, setOpenFaq }: AdviceMentoringSection) {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Servicios de Asesoría Adaptados a Tu Realidad
                </h2>
                <p className="text-slate-600 dark:text-slate-200 mb-12 max-w-3xl">
                    Cada negocio es diferente. Por eso, nuestra mentoría se ajusta a lo que realmente necesitas,
                    en un lenguaje claro y con soluciones prácticas.
                </p>

                <div className="space-y-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq && Number(openFaq) === index ? null : `${index}`)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <span className="text-lg font-semibold">{service.title}</span>
                                <ChevronDown
                                    className={`h-5 w-5 transition-transform ${openFaq && Number(openFaq) === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openFaq && Number(openFaq) === index && (
                                <div className="px-6 pb-5 text-slate-600 dark:text-slate-200">
                                    {service.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}