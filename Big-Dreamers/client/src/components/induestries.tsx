import { industries } from "@/mockdata/advice-mentoring";

export default function Industries() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Emprendedores de Todos los Rubros Confían en Nosotros
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-12 text-center max-w-3xl mx-auto">
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
    );
}