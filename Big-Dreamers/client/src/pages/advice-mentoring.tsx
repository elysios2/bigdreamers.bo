import { Users, ArrowRight, ChevronDown, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";
import ThreeStepForm from '../components/ThreeStepForm';

export default function AdviceMentoring() {
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const benefits = [
        {
            title: "Guía Experta",
            description: "Mentoría de fundadores con el consejo de expertos en la industria.",
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: "Crecimiento Estratégico",
            description: "Diseñamos e implementamos planes para acelerar tu crecimiento empresarial.",
            icon: <TrendingUp className="h-6 w-6" />,
        },
        {
            title: "Red Vasta",
            description: "Accede a una red establecida de la industria e inversores.",
            icon: <Target className="h-6 w-6" />,
        },
    ] as const;

    const services = [
        {
            title: "Asesoría Financiera",
            description:
                "Te acompañamos desde la evaluación TOTAL, desde la incubación de fondos a tu modelo de financiero hasta la gestión del flujo de caja y la garantía de rentabilidad y crecimiento.",
        },
        {
            title: "Estrategias de Marketing y Ventas",
            description:
                "Desarrollamos estrategias personalizadas para aumentar tu visibilidad, atraer clientes y optimizar tus conversiones de ventas.",
        },
        {
            title: "Eficiencia Operativa",
            description:
                "Optimizamos tus procesos internos, implementamos tecnología adecuada y mejoramos la productividad de tu equipo.",
        },
        {
            title: "Tecnología y Desarrollo de Producto",
            description:
                "Te asesoramos en la selección de tecnologías, desarrollo de producto y escalabilidad técnica de tu startup.",
        },
    ] as const;

    const faqs = [
        {
            question: "¿Qué tipo de personas o empresas pueden invertir en BigDreamers?",
            answer:
                "Cualquier persona mayor de edad con capacidad legal para invertir puede participar. También aceptamos startups y emprendedores que busquen inversión y mentoría estratégica para hacer crecer su negocio.",
        },
        {
            question: "¿Cuál es la inversión mínima requerida?",
            answer:
                "La inversión mínima es de 7.000 Bs. Esto aplica para todos los tipos de interés: simple, compuesto o mixto. Nuestro objetivo es hacer que la inversión sea accesible, segura y transparente.",
        },
        {
            question: "¿Qué tipo de retorno puedo esperar y cómo se calcula?",
            answer:
                "Ofrecemos tres modalidades: \n\n- Interés Simple: rentabilidad fija mensual según la duración del contrato.\n- Interés Compuesto: crecimiento progresivo del capital, con reinversión automática de los intereses.\n- Interés Mixto: combina liquidez del simple y crecimiento del compuesto, ideal para quienes buscan equilibrio entre rendimiento y disponibilidad.\n\nTodos los cálculos son claros y explicados antes de la inversión.",
        },
        {
            question: "¿Cuál es la duración de los contratos?",
            answer:
                "Los contratos tienen una duración flexible de 6 a 24 meses, según tus objetivos y necesidades. Al finalizar, puedes optar por retirar tu capital o renovarlo para seguir obteniendo ganancias.",
        },
        {
            question: "¿Qué pasa si necesito retirar mi dinero antes de la finalización del contrato?",
            answer:
                "Dependiendo del tipo de interés elegido, algunas modalidades permiten retiros anticipados parciales. Siempre tendrás claridad sobre cómo afectará esto tu rentabilidad, y nuestro equipo te asesora para tomar la mejor decisión.",
        },
        {
            question: "¿Mi inversión está segura?",
            answer:
                "Sí, todas las inversiones están respaldadas por contratos claros y transparentes. Además, BigDreamers ofrece seguimiento constante, asesoramiento financiero y control total sobre tu inversión para que siempre sepas cómo se está manejando tu capital.",
        },
        {
            question: "¿Cómo se realiza el seguimiento de mi inversión?",
            answer:
                "Contamos con un sistema de seguimiento personalizado. Recibirás reportes periódicos sobre el rendimiento, el estado de tu inversión y recomendaciones financieras de nuestros expertos.",
        },
        {
            question: "¿Qué pasa al finalizar el contrato?",
            answer:
                "Al finalizar el contrato, recibirás la devolución completa de tu capital junto con los intereses generados según la modalidad seleccionada. También tienes la opción de reinvertir o suscribirte a un nuevo ciclo.",
        },
        {
            question: "¿Qué incluye el acompañamiento de mentoría?",
            answer:
                "Si eres emprendedor, el programa de mentoría incluye sesiones uno a uno con expertos, acceso a nuestra red de mentores, talleres especializados y apoyo estratégico en finanzas, marketing, operaciones y tecnología.",
        },
        {
            question: "¿Cómo puedo suscribirme o iniciar mi inversión?",
            answer:
                "Puedes suscribirte directamente desde nuestro sitio web o contactando a nuestro equipo. Te guiaremos paso a paso, desde la elección de la modalidad de interés hasta la firma del contrato y seguimiento de tu inversión.",
        },
        {
            question: "¿BigDreamers ofrece garantías o respaldo institucional?",
            answer:
                "Sí, nuestras inversiones están respaldadas por la transparencia de nuestros contratos, el seguimiento constante del equipo y nuestra red de socios e inversores. Siempre tendrás visibilidad completa sobre tu capital y rendimientos.",
        },
    ] as const;


    return (
        <>
            <Navbar />
            <div className="bg-slate-900 text-white">
                {/* Hero Section */}
                <section className="relative py-40 px-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                    <div className="container mx-auto max-w-6xl relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Desbloquea tu Potencial. Crece con Mentoría Experta.
                            </h1>
                            <p className="text-xl text-slate-300 mb-8">
                                Obtén el capital y el acompañamiento estratégico que tu startup necesita para alcanzar el siguiente nivel.
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2">
                                Agendar una Consulta
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 px-4 bg-slate-800/50">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            ¿Por qué asociarse con BigDreamers?
                        </h2>
                        <p className="text-slate-400 mb-12 max-w-3xl">
                            Obtén una ventaja competitiva con la guía personalizada de expertos experimentados que han
                            estado en tu lugar. Proporcionamos las herramientas, la red y las competencias estratégicas para
                            convertir tu visión en una realidad.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                                            {benefit.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                        <p className="text-slate-400">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12">
                            Servicios de Asesoría a tu Medida
                        </h2>

                        <div className="space-y-4">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq && Number(openFaq) === index ? null : `${index}`)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                                    >
                                        <span className="text-lg font-semibold">{service.title}</span>
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform ${openFaq && Number(openFaq)=== index ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    {openFaq && Number(openFaq) === index && (
                                        <div className="px-6 pb-5 text-slate-400">
                                            {service.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 px-4 bg-slate-800/50">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12">
                            Preguntas Frecuentes
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(`faq-${index}` === openFaq ? null : `faq-${index}`)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                                    >
                                        <span className="text-lg font-semibold">{faq.question}</span>
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform flex-shrink-0 ml-4 ${openFaq === `faq-${index}` ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    {openFaq === `faq-${index}` && (
                                        <div className="px-6 pb-5 text-slate-400">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Comienza tu Viaje Hoy
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                ¿Listo para llevar tu negocio al siguiente nivel? Conéctate con nuestro equipo y
                                descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales.
                            </p>
                            <div className="neumorph-inset p-6 rounded-xl">
                                <ThreeStepForm
                                    rate={2.5}
                                    duration={24}
                                    formAction="https://formsubmit.co/dreamersb648@gmail.com"
                                    formSubject={`Hola, me llamo${name}, me gustaría solicitar un plan de asesoría personalizada para mi empresa`}
                                    nextUrl="https://bigdreamerss.com/gracias"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            <ThemeToggle />
            <Chatbot />
        </>
    );
}