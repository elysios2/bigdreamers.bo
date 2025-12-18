import { useState } from "react";
import { Users, ArrowRight, Target, TrendingUp } from "lucide-react";
import VideoSection from "@/components/video-section";
import ServicesSection from "@/components/services-section";
import FaqSection from "@/components/faq-section";
import Industries from "@/components/induestries";

export default function AdviceMentoring() {
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const benefits = [
        {
            title: "Para Todos los Rubros",
            description:
                "Carpintería, tecnología, gastronomía, belleza, servicios, comercio o cualquier área. Tu rubro no es límite.",
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: "Desde Cero o en Crecimiento",
            description:
                "Desde tu primera idea hasta expandir tu negocio establecido. Te acompañamos en cada etapa de tu emprendimiento.",
            icon: <TrendingUp className="h-6 w-6" />,
        },
        {
            title: "Mentoría Adaptada a Ti",
            description:
                "Guía personalizada según las necesidades específicas de tu negocio, experiencia y recursos disponibles.",
            icon: <Target className="h-6 w-6" />,
        },
    ] as const;

    return (
        <div className="min-h-screen text-slate-900 dark:text-white">
            {/* Industries Section */}
            <Industries />

            {/* Benefits Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Por qué elegir BigDreamers?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-100 mb-12 max-w-3xl">
                        No importa si eres carpintero, chef, diseñador, técnico, comerciante o fundador de una startup.
                        En BigDreamers creemos que cada sueño merece una oportunidad real. Te damos el capital, la mentoría
                        y las herramientas para hacer realidad tu proyecto, sin importar tu experiencia o rubro.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 dark:text-blue-200">
                                        {benefit.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-200">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <VideoSection />
            {/* Services Section */}
            <ServicesSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

            {/* FAQ Section */}
           <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

            {/* CTA Section */}
            <section className="py-20 px-4 " id="contact">
                <div className="container mx-auto max-w-6xl">
                    <div className="rounded-2xl p-12 text-center bg-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                            Haz Realidad Tu Sueño Hoy
                        </h2>
                        <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto dark:text-white">
                            No importa cuál sea tu oficio o tu nivel de experiencia. Si tienes la determinación,
                            nosotros tenemos el camino. Agenda una consulta gratuita y descubre cómo BigDreamers
                            puede impulsar tu emprendimiento.
                        </p>
                        <a
                            href="mailto:dreamersb648@gmail.com"
                            className="text-white bg-yellow-500 hover:bg-yellow-400 font-bold px-10 py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-lg"
                        >
                            Comenzar Ahora
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}