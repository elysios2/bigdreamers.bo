import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoSvg from "../assets/logo1.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isHome = window.location.pathname === "/";

  const navlinksLeft = [
    { name: "Sobre Nosotros", href: "/about-us" },
    { name: "Inversión", href: "#investment" },
    { name: "Asesoria y Mentoria", href: "/asesoria-mentoria" },
  ];
  
  const navlinksRight = [
    { name: "Inicio", href: '/' },
    { name: "Blog", href: "/blog" },
    { name: "Contáctanos", href: "#contact" },
  ];

  const navlinksMobile = [...navlinksLeft.flat(), ...navlinksRight.flat().reverse()];
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-[#048abf]/95 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-800 dark:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex-1 md:flex-none md:w-1/3">
            <ul className="hidden lg:flex space-x-6 justify-start">
              {
                navlinksLeft.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="flex justify-center md:flex-1">
            <a href="/" className="flex items-center" title="Sueños hechos realidad">
              <img src={logoSvg} alt="BigDreamers" className="h-14 w-auto" />
            </a>
          </div>

          <div className="flex-1 md:flex-none md:w-1/3">
            <ul className="hidden lg:flex space-x-6 justify-end">
              {
                navlinksRight.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[#feba2b] font-semibold hover:text-[#048abf] dark:text-white dark:hover:text-[#feba2b] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} bg-white dark:bg-[#048abf] border-t border-gray-200 dark:border-[#048abf]/80 w-full py-4 px-6 lg:hidden transition-colors`}
      >
        <ul className="space-y-4">
          {
            navlinksMobile.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="block text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  );
}
