import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { industries } from "@/mockdata/advice-mentoring";
import { getMembers, type Member } from "@/services/membersService";
import defaultImage from "@/assets/morfeus_thinking.webp";
export default function Industries() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
    const [members, setMembers] = useState<Member[]>([]);

    const showModalLeft = (industryName: string) => {
        setSelectedIndustry(industryName);
        setIsSidebarOpen(true);
    };

    useEffect(() => {
        const getMembersByIndustry = async (industryName: string) => {
            try {
                const f = members.find((member) => member.role === industryName);
                if(f) return members;
                
                const membersRegistered = await getMembers(industryName);
                setMembers(membersRegistered || []);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        };

        getMembersByIndustry(selectedIndustry || "");
    }, [selectedIndustry]);

    return (
        <>
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                        Emprendedores de Todos los Rubros Confían en Nosotros
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-12">
                        No importa a qué te dediques. Si tienes un sueño y ganas de trabajar nosotros te damos las herramientas.
                    </p>

                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]">
                            {industries.map((item, index) => (
                                <button
                                    key={index}
                                    aria-label={item.title}
                                    onClick={() => showModalLeft(item.title)}
                                    className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-blue-800/60 shadow-md group ${item.col} ${item.row}`}
                                >
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            loading="lazy"
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-bottom object-cover group-hover:scale-110 transition duration-700"
                                        />
                                    )}

                                    {/* overlay degradado azul */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f4f7c]/90 via-[#2f6ea7]/50 to-[#3B82C4]/10"></div>

                                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                                        <h3 className="text-lg font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-white/80">
                                            {item.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/70"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Contenedor del panel lateral */}
            <div
                className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <header className="pt-6 py-4 px-6 border-b border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-extrabold text-slate-800 mt-1 dark:text-gray-200">
                            {selectedIndustry || "Conoce a nuestro equipo"}
                        </h2>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-slate-400 dark:hover:text-slate-300 hover:text-slate-600 p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Lista de Tarjetas (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
                    {
                        members && members.map((member) => (
                            <article className="bg-white/10 dark:bg-black/10 rounded-3xl p-5 shadow-md shadow-blue-900/90 border border-slate-100" key={member.id}>
                                <div className="flex gap-4 mb-4 items-center">
                                    <a href={member.professional_link} target="_blank" rel="noopener noreferrer">
                                        <img src={`https${member.photo_url.split("https")[2]}`} alt={member?.full_name} className="w-20 h-14 rounded-full object-cover bg-slate-200" title="Conoce más sobre mi" />
                                    </a>
                                    <div>
                                        <h3 className="font-bold text-gray-700 dark:text-gray-200 ">{
                                            member.full_name
                                        }</h3>
                                        <p className="text-[10px] font-bold text-yellow-600 dark:text-blue-300 uppercase tracking-wide">
                                            {member.role}
                                        </p>
                                        <p className="text-xs text-gray-700 dark:text-gray-300  mt-1 leading-relaxed">
                                            {member.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2 text-xs font-semibold">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://wa.me/${member.whatsapp}/?text="Hola, me gustaria saber más sobre Bigdreamers"${selectedIndustry}`} className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-gray-700 dark:text-blue-500 py-2.5 rounded-xl hover:bg-blue-100 transition">
                                        WHATSAPP
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`mailto:${member.email}?subject="Hola, me gustaria saber más sobre Bigdreamers"${selectedIndustry}`} className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-gray-700 dark:text-blue-500 py-2.5 rounded-xl hover:bg-blue-100 transition">
                                        EMAIL
                                    </a>

                                </div>
                            </article>
                        ))
                    }

                    {
                        members && members.length === 0 &&
                        (
                            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                                <h4 className="text-center text-gray-700 dark:text-white/80 text-sm">
                                    No hay miembros en este rubro aún
                                </h4>
                                <img src={defaultImage} alt="..." className="w-64 h-64 object-cover" />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}