import { LogIn } from "lucide-react";

export default function Footer() {
  const links = [
    {
      name: "Inicio",
      href: "#"
    },
    {
      name: "Sobre Nosotros",
      href: "/about-us"
    },
    {
      name: "Inversión",
      href: "/investments"
    },
    {
      name: "Blog",
      href: "/blog"
    },
    {
      name: "Contacto",
      href: "#contact"
    },
  ];
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">Big</span>
              <span className="text-[#feba2b]">Dreamers</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Conectamos inversionistas con startups prometedoras para construir
              valor y avanzar juntos.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              {
                links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/investor-guide" className="text-gray-300 hover:text-white transition-colors">
                  Guía del inversor
                </a>
              </li>
            </ul>
          </div>

          {/* Admin access */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Equipo</h4>
            <p className="text-gray-400 text-sm mb-4">
              ¿Eres parte del equipo de Bigdreamers?
            </p>
            <a href="/login" className="inline-flex items-center gap-2 bg-[#048abf] hover:bg-[#036d9f] text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 group">
              <LogIn size={17} className="group-hover:translate-x-0.5 transition-transform" />
              Iniciar sesión
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col justify-center items-center">
          <a href="https://www.bytetwo.digital"
            rel="opener, referrer"
            target="_blank"
            className="uppercase text-gray-400 text-xl hover:text-blue-400 cursor-pointer">
            powered by bytetwo
          </a>
          <p className="text-gray-400 text-sm my-4 md:mb-0">
            © {new Date().getFullYear()} Big Dreamers. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}