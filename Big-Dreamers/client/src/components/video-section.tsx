
import "lite-youtube-embed";
import "lite-youtube-embed/src/lite-yt-embed.css"; 
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": {
        videoid: string;
        children?: React.ReactNode;
        className?: string; 
        style?: React.CSSProperties;
      };
    }
  }
}

export default function VideoSection() {
  const handleInvestClick = () => {
    const investmentSection = document.getElementById("investment");
    if (investmentSection) {
      investmentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">

    <div className="w-full md:w-1/2" data-aos="fade-right">
  <div className="neumorph overflow-hidden rounded-xl aspect-video relative">
    <lite-youtube 
      videoid="DKIdyhNi-3Q"
      className="w-full h-full block"
      style={{ maxWidth: '100%' }} 
    >
      <a
        className="lite-youtube-fallback"
        href="https://youtu.be/DKIdyhNi-3Q?si=nG_Z3QpVlaXq8Gyr"
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>
    </lite-youtube>
  </div>
            <div className="my-6"></div>

            <h3 className="text-xl font-bold mb-2">Nuestra Visión</h3>
            <p className="text-gray-600">
              Soñamos con un mundo donde las grandes ideas no mueren por falta
              de apoyo, y donde cada inversión se convierte en una historia de
              cambio, crecimiento y propósito compartido.
            </p>

            <div className="my-6"></div>

            <h3 className="text-xl font-bold mb-2">Nuestra Misión</h3>
            <p className="text-gray-600">
              Acompañamos a emprendedores valientes que quieren cambiar el
              mundo, conectándolos con personas que creen en ellos y quieren
              invertir más que dinero:
              <br />
              Quieren dejar huella.
              <br />
              Creamos puentes entre ideas con alma e inversionistas con visión,
              generando crecimiento real, humano y financiero para todos.
            </p>

            <div className="my-6"></div>
          </div>

          {/* TEXTO */}
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-[#048abf] dark:text-white">Sueña </span>
              en <span className="text-[#feba2b]">Grande</span>
            </h2>

            <p className="text-gray-600 mb-6">
              Big Dreamers redefine la conexión entre inversionistas y startups.
              <br />
              Nuestro enfoque único garantiza que solo los proyectos más
              prometedores lleguen a nuestra plataforma. A través de un riguroso
              proceso de verificación, analizamos cada detalle del proyecto para
              asegurar su calidad, viabilidad y potencial de crecimiento.
              Además, priorizamos la transparencia en cada paso, brindando a los
              inversionistas la seguridad de que su capital está respaldado por
              emprendimientos cuidadosamente seleccionados.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="mt-1 mr-4 rounded-full h-6 w-6 flex items-center justify-center bg-primary text-white">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Regístrate</h3>
                  <p className="text-gray-600">
                    Crea tu cuenta y completa tu perfil de inversor.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-4 rounded-full h-6 w-6 flex items-center justify-center bg-primary text-white">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Elige tu plan</h3>
                  <p className="text-gray-600">
                    Selecciona el plan que mejor se ajuste a tus objetivos
                    financieros.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-4 rounded-full h-6 w-6 flex items-center justify-center bg-primary text-white">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Invierte</h3>
                  <p className="text-gray-600">
                    Realiza tu inversión de forma segura y empieza a generar
                    rendimientos.
                  </p>
                </div>
              </li>
            </ul>

            <button
              className="neumorph-btn bg-primary text-white px-6 py-3 rounded-lg font-semibold"
              onClick={handleInvestClick}
            >
              Comienza a invertir
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
