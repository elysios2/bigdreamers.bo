import React from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import Morfeus from "@/assets/morfeus.webp";
import { Link } from "react-router-dom";

export default function HeroV2() {
    return (
        <section className="min-h-screen px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] items-center gap-16 text-white overflow-hidden" id="advice">
            {/* LEFT CONTENT */}
            <div>
                <span className="inline-block mb-6 rounded-full text-gray-700 dark:text-white dark:bg-white/15 bg-blue-100 px-4 py-1 text-xs tracking-wide">
                    TU FUTURO FINANCIERO COMIENZA HOY - ¡MUY PRONTO!
                </span>

                <h2 className="text-4xl text-gray-700 dark:text-white md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                    Tu Sueño <br />
                    <span className="dark:text-yellow-400 text-yellow-500">Sin Límites</span>
                </h2>

                <p className="max-w-xl text-base leading-relaxed dark:text-blue-100 text-gray-700 mb-8">
                    Desde tu primera venta hasta tu expansión nacional.
                    En BigDreamers hacemos posible tu emprendimiento con capital y mentoría experta.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                    <a href="mailto:dreamersb648@gmail.com" className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-yellow-10 transition hover:scale-[1.02]">
                        Asesoría y Mentorías →
                    </a>
                    <Link to="/investments" className="rounded-xl border text-gray-700 border-black dark:border-white/40 px-6 py-3 font-medium transition hover:bg-white/10">
                        Inversiones ↗
                    </Link>
                </div>

                <div className="flex flex-wrap gap-6 text-sm dark:text-blue-100 text-gray-700">
                    <span>✔ Asesores Certificados</span>
                    <span>✔ Seguridad Bancaria</span>
                </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative flex items-center justify-center">
                <div className="relative h-[380px] w-[380px] md:h-[420px] md:w-[420px] rounded-3xl border border-purple-200 overflow-hidden group">
                    <img
                        src={Morfeus}
                        alt="Morfeus"
                        className="h-full w-full object-cover"
                        style={{
                            filter: "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.5))",
                        }}
                    />

                    {/* Comic dialog bubble */}
                    <div
                        className="absolute top-4 left-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-10"
                    >
                        <div className="relative bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-xl max-w-[220px] text-sm font-medium">
                            Hola, soy Morfeus.<br />
                            Tu sueño empieza hoy, y no tienes que hacerlo solo.

                            {/* Triangle (comic tail) */}
                            <div
                                className="
          absolute -bottom-2 right-6
          w-0 h-0
          border-l-8 border-l-transparent
          border-r-8 border-r-transparent
          border-t-8 border-t-white
        "
                            />
                        </div>
                    </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 rounded-2xl bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-lg">
                    <div className="font-semibold flex items-center text-md">
                        <DollarSign className="dark:text-green-200 text-green-500" />
                        <div className="ml-1 flex flex-col leading-tight">
                            <span className="dark:text-green-200 text-green-500">+24.5%</span>
                            <span className="dark:text-white text-gray-700 font-semibold">Rendimiento</span>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-lg">
                    <div className="font-semibold flex items-center text-md">
                        <TrendingUp className="dark:text-green-200 text-green-500" />
                        <div className="ml-1 flex flex-col leading-tight">
                            <span className="dark:text-green-200 text-green-500">Crecimiento</span>
                            <span className="dark:text-white text-gray-700 font-semibold">Anual</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
