import { useState } from "react";
import { Users, ArrowRight, ChevronDown, Target, TrendingUp } from "lucide-react";
import Chatbot from "@/components/chatbot";
import ThemeToggle from "@/components/theme-toggle";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function AdviceMentoring() {
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const benefits = [
        {
            title: "Para Todos los Rubros",
            description: "Carpintería, tecnología, gastronomía, belleza, servicios, comercio o cualquier área. Tu rubro no es límite.",
            icon: <Users className="h-6 w-6" />,
        },
        {
            title: "Desde Cero o en Crecimiento",
            description: "Desde tu primera idea hasta expandir tu negocio establecido. Te acompañamos en cada etapa de tu emprendimiento.",
            icon: <TrendingUp className="h-6 w-6" />,
        },
        {
            title: "Mentoría Adaptada a Ti",
            description: "Guía personalizada según las necesidades específicas de tu negocio, experiencia y recursos disponibles.",
            icon: <Target className="h-6 w-6" />,
        },
    ] as const;

    const industries = [
        {
            title: "Oficios y Artesanías",
            examples: "Carpinteros, herreros, costureras, artesanos",
            image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
        },
        {
            title: "Gastronomía y Servicios",
            examples: "Restaurantes, panaderías, catering, salones",
            image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
        },
        {
            title: "Tecnología y Digital",
            examples: "Desarrolladores, diseñadores, agencias, e-commerce",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        },
        {
            title: "Belleza y Bienestar",
            examples: "Peluquerías, spas, entrenadores, terapeutas",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        },
    ] as const;

    const services = [
        {
            title: "Asesoría Financiera para Cualquier Negocio",
            description:
                "Ya sea que vendas muebles hechos a mano, prepares comida casera o desarrolles aplicaciones móviles, te ayudamos con tu modelo financiero, flujo de caja, control de gastos y gestión de recursos desde el primer día. Sin importar tu nivel de experiencia en finanzas.",
        },
        {
            title: "Marketing y Ventas Adaptado a tu Rubro",
            description:
                "Estrategias personalizadas para tu industria: desde presencia en redes sociales para artesanos y comerciantes locales, hasta campañas digitales para servicios profesionales. Te enseñamos a atraer clientes, aumentar tu visibilidad y cerrar más ventas.",
        },
        {
            title: "Operaciones y Productividad",
            description:
                "Optimiza tus procesos de trabajo, mejora tu eficiencia y organiza tu negocio de manera profesional. Desde talleres físicos hasta negocios digitales, te ayudamos a trabajar de forma más inteligente y rentable.",
        },
        {
            title: "Formalización y Crecimiento",
            description:
                "Te acompañamos en la formalización legal de tu negocio, desarrollo de producto o servicio, escalamiento según tus posibilidades y objetivos, y acceso a nuevos mercados y oportunidades de expansión.",
        },
    ] as const;

    const faqs = [
        {
            question: "¿Realmente puedo acceder a asesoría sin importar mi rubro o experiencia?",
            answer:
                "¡Absolutamente! En BigDreamers trabajamos con emprendedores de todos los rubros: desde carpinteros, chefs y costureras hasta desarrolladores y profesionales de servicios. No importa si recién estás empezando o si ya tienes experiencia. Adaptamos nuestra mentoría a tu situación específica.",
        },
        {
            question: "No tengo experiencia en negocios, ¿pueden ayudarme igual?",
            answer:
                "Sí, esa es nuestra especialidad. Muchos de nuestros emprendedores exitosos comenzaron sin conocimientos en finanzas, marketing o administración. Te enseñamos desde lo más básico hasta estrategias avanzadas, adaptándonos a tu ritmo de aprendizaje.",
        },
        {
            question: "¿Cuál es la inversión mínima para acceder a asesoría?",
            answer:
                "La inversión mínima es de 7.000 Bs. Este monto te da acceso a capital para tu negocio y al programa completo de mentoría personalizada. Es una inversión en tu futuro y el crecimiento de tu emprendimiento.",
        },
        {
            question: "¿Qué incluye el programa de mentoría?",
            answer:
                "Incluye sesiones personalizadas con expertos en tu área, asesoría financiera práctica, estrategias de marketing adaptadas a tu rubro, optimización de procesos, apoyo en formalización legal, acceso a nuestra red de contactos y seguimiento continuo de tu progreso.",
        },
        {
            question: "¿Cuánto tiempo dura el acompañamiento?",
            answer:
                "El programa de mentoría se ajusta a la duración de tu contrato de inversión (6 a 24 meses). Durante todo ese tiempo tendrás acceso a sesiones de asesoría, recursos y el apoyo de nuestro equipo para asegurar el éxito de tu negocio.",
        },
        {
            question: "¿Necesito tener un negocio ya establecido?",
            answer:
                "No necesariamente. Trabajamos tanto con emprendedores que recién tienen una idea como con negocios que ya están operando y quieren crecer. Te ayudamos desde la conceptualización hasta la expansión, según tu etapa actual.",
        },
        {
            question: "¿Qué diferencia a BigDreamers de otros programas de asesoría?",
            answer:
                "Combinamos capital con mentoría práctica y personalizada. No solo te damos recursos financieros, sino que te acompañamos paso a paso en el crecimiento de tu negocio. Además, somos inclusivos: no discriminamos por rubro, tamaño o experiencia previa.",
        },
        {
            question: "¿Cómo se adapta la asesoría a mi tipo de negocio específico?",
            answer:
                "Cada rubro tiene sus particularidades. Nuestro equipo cuenta con experiencia en múltiples industrias y adaptamos las estrategias a tu realidad: costos de materiales para artesanos, rotación de inventario para comerciantes, adquisición digital para servicios, etc.",
        },
        {
            question: "¿Puedo empezar aunque mi negocio sea muy pequeño?",
            answer:
                "¡Por supuesto! De hecho, muchos emprendimientos exitosos comenzaron muy pequeños. Lo importante es tu compromiso, tu visión y tus ganas de crecer. Nosotros te damos las herramientas y el conocimiento para escalar a tu propio ritmo.",
        },
        {
            question: "¿Cómo inicio el proceso con BigDreamers?",
            answer:
                "Es muy simple: completa el formulario de contacto en esta página o comunícate directamente con nuestro equipo. Agendaremos una reunión inicial sin compromiso para conocer tu proyecto, explicarte cómo funciona el programa y diseñar un plan personalizado para ti.",
        },
    ] as const;

    return (
        <div className="min-h-screen bg-white text-slate-900 dark:text-white">
            <Navbar />
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-4 overflow-hidden">
                <div className="absolute inset-0"></div>
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Tu Sueño, Sin Límites
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
                            Desde tu primera venta hasta tu expansión nacional. <br />
                            En BigDreamers hacemos posible tu emprendimiento con capital y mentoría experta.
                        </p>
                        <a href="#contact"
                            className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2 text-lg">
                            Agenda tu Consulta Gratuita
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Industries Section */}
            <section className="py-16 px-4 bg-slate-100 dark:bg-slate-800/30">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                        Emprendedores de Todos los Rubros Confían en Nosotros
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-12 text-center max-w-3xl mx-auto">
                        No importa a qué te dediques. Si tienes un sueño y ganas de trabajar, nosotros te damos las herramientas.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industries.map((industry, index) => (
                            <div
                                key={index}
                                className="relative h-64 rounded-xl overflow-hidden group border-2 border-transparent hover:border-blue-500 transition-all"
                            >
                                <img
                                    src={industry.image}
                                    alt={industry.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
                                    <p className="text-slate-200 text-sm">{industry.examples}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Por qué elegir BigDreamers?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-200 mb-12 max-w-3xl">
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

            {/* Services Section */}
            <section className="py-20 px-4 bg-slate-100 dark:bg-slate-800/30">
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

            {/* FAQ Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Preguntas Frecuentes
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
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
                                    <div className="px-6 pb-5 text-slate-600 dark:text-slate-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-slate-100 dark:bg-slate-800/30" id="contact">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-white rounded-2xl p-12 text-center">
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
            <Chatbot />
            <ThemeToggle />
            <Footer />
        </div>
    );
}