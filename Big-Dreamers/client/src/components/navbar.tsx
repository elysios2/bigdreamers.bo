import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoSvg from "../assets/logo1.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollAttempts = useRef(0);

  const navlinksLeft = [
    { name: "Sobre Nosotros", href: "/about-us" },
    { name: "Asesoria y Mentoria", href: "/asesoria-mentoria" },
    { name: "Inversión", href: "#investment" },
  ];

  const navlinksRight = [
    { name: "Blog", href: "/blog" },
    { name: "Contáctanos", href: "#contact" },
    { name: "Inicio", href: "/" },
  ];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      scrollAttempts.current = 0;
      return true;
    }
    return false;
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        scrollToSection(sectionId);
      }
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    
    if (!sectionId) return;

    const attemptScroll = () => {
      const success = scrollToSection(sectionId);
      
      if (!success && scrollAttempts.current < 20) {
        scrollAttempts.current++;
        requestAnimationFrame(attemptScroll);
      } else if (success) {
        window.history.replaceState({}, document.title);
      }
    };

    requestAnimationFrame(attemptScroll);
  }, [location]);

  const navlinksMobile = [...navlinksLeft, ...navlinksRight];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-[#048abf]/95 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-800 dark:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="flex-1 md:flex-none md:w-1/3">
            <ul className="hidden lg:flex space-x-6 justify-start">
              {navlinksLeft.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center md:flex-1">
            <Link to="/" className="flex items-center" title="Sueños hechos realidad">
              <img src={logoSvg} alt="BigDreamers" className="h-14 w-auto" />
            </Link>
          </div>

          <div className="flex-1 md:flex-none md:w-1/3">
            <ul className="hidden lg:flex space-x-6 justify-end">
              {navlinksRight.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#feba2b] font-semibold hover:text-[#048abf] dark:text-white dark:hover:text-[#feba2b] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-white dark:bg-[#048abf] border-t border-gray-200 dark:border-[#048abf]/80 w-full py-4 px-6 lg:hidden transition-colors">
          <ul className="space-y-4">
            {navlinksMobile.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-gray-800 dark:text-white hover:text-[#048abf] dark:hover:text-[#feba2b] transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}