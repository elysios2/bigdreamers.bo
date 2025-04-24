import { useCarousel } from "@/hooks/use-carousel";
import { useModal } from "@/hooks/use-modal";
import hero1 from "@assets/1.gif";
import hero2 from "@assets/2.gif";
import hero3 from "@assets/3.gif";

export default function HeroSection() {
  const { currentIndex, updateCurrentIndex } = useCarousel(3, 8000);
  const { openModal } = useModal();

  const carouselImages = [
    {
      src: hero1,
      title: "CON BIG DREAMERS HARÁS QUE TU DINERO TRABAJE PARA TI",
      description:
        "Invierte desde solo 1000$ en las startups más prometedoras de Bolivia",
      cta: "Comienza a invertir",
    },
    {
      src: hero2,
      title: "30% DE RENDIMIENTO ANUAL",
      description: "Para inversiones a largo plazo con las mejores condiciones",
      cta: "Conoce nuestros planes",
    },
    {
      src: hero3,
      title: "SE PARTE DEL FUTURO Y DE LA INNOVACIÓN",
      description:
        "Conectamos a quienes apuestan por el futuro con Emprendimientos y Start Ups que están cambiando las reglas del juego.",
      cta: "Saber más",
    },
  ];

  const handleLearnMore = () => {
    const investmentSection = document.getElementById("investment");
    if (investmentSection) {
      investmentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = () => {
    openModal("subscribe");
  };

  return (
    <section className="relative h-screen min-h-[650px] max-h-[800px] overflow-hidden">
      {/* Carousel background images */}
      {carouselImages.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/80" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-xl" data-aos="fade-right">
            <div className="mb-2">
              <span className="bg-white text-sm font-semibold text-gray-800 px-3 py-1 rounded-full">
                ¡ Muy Pronto !
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {carouselImages[currentIndex].title}
            </h1>

            <p className="text-xl text-white mb-8">
              {carouselImages[currentIndex].description}
            </p>

            <button
              className="bg-[#048abf] hover:bg-[#e6005c] text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full md:w-auto"
              onClick={handleLearnMore}
            >
              {carouselImages[currentIndex].cta}
            </button>
          </div>
        </div>
      </div>

      {/* Carousel navigation */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => updateCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
