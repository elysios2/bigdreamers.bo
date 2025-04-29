// src/pages/Gracias.tsx

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle, Loader2 } from "lucide-react";

export default function Gracias() {
  const [redirecting, setRedirecting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true); // Empezar el fundido
    }, 4000); // A los 4 segundos empieza el fundido

    const timer2 = setTimeout(() => {
      setRedirecting(true);
      window.location.href = "/";
    }, 5000); // A los 5 segundos redirige

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center bg-white dark:bg-[#012941] text-gray-800 dark:text-white px-4 pt-20 pb-16 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Icono de éxito */}
      <CheckCircle className="text-[#048abf] dark:text-[#feba2b] mb-6" size={80} />

      {/* Mensaje principal */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        ¡Tu solicitud fue enviada con éxito!
      </h1>

      {/* Mensaje secundario */}
      <p className="text-gray-600 dark:text-gray-300 text-lg text-center mb-8 max-w-md">
        {redirecting
          ? "Redirigiendo al inicio..."
          : "Nos pondremos en contacto contigo en breve. Estás siendo redirigido al inicio."}
      </p>

      {/* Spinner durante la redirección */}
      {redirecting ? (
        <Loader2 className="animate-spin text-[#048abf] dark:text-[#feba2b]" size={40} />
      ) : (
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#048abf] hover:bg-[#feba2b] text-white font-semibold rounded-xl transition-all duration-300 shadow-md dark:shadow-none"
        >
          Volver al inicio
        </Link>
      )}
    </div>
  );
}
