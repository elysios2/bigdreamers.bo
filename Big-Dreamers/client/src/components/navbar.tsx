import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoSvg from "../assets/logo1.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-[#048abf]/95 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="md:hidden">
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
            <ul className="hidden md:flex space-x-6 justify-start">
              <li>
                <a
                  href="/about-us"
                  className="text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#investment"
                  className="text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                >
                  Inversión
                </a>
              </li>
            </ul>
          </div>

          <div className="flex justify-center flex-1">
            <a href="/" className="flex items-center">
              <img src={logoSvg} alt="BigDreamers" className="h-14 w-auto" />
            </a>
          </div>

          <div className="flex-1 md:flex-none md:w-1/3">
            <ul className="hidden md:flex space-x-6 justify-end">
              <li>
                <a
                  href="#contact"
                  className="text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                >
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1 md:flex-none md:w-1/3">
            <ul className="hidden md:flex space-x-6 justify-end">
              <li>
                <a
                  href="/blog"
                  className="text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} bg-white dark:bg-[#048abf] border-t border-gray-200 dark:border-[#048abf]/80 w-full py-4 px-6 md:hidden transition-colors`}
      >
        <ul className="space-y-4">
          <li>
            <a
              href="/about-us"
              className="block text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nosotros
            </a>
          </li>
          <li>
            <a
              href="#investment"
              className="block text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inversión
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contáctanos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
