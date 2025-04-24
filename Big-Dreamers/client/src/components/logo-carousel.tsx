export default function LogoCarousel() {
  const logos = [
    { name: 'TechStart', color: 'text-primary' },
    { name: 'EcoInno', color: 'text-[#feba2b]' },
    { name: 'FinMaster', color: 'text-primary' },
    { name: 'HealthUp', color: 'text-[#feba2b]' },
    { name: 'DataPro', color: 'text-primary' },
    { name: 'CloudNow', color: 'text-[#feba2b]' }
  ];
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8" data-aos="fade-up">
          Startups que confían en nosotros
        </h2>
        <div className="relative overflow-hidden neumorph-inset p-4" data-aos="fade-up">
          <div className="flex logo-carousel space-x-12">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div 
                key={`logo-1-${index}`} 
                className="flex items-center justify-center min-w-[150px] h-16"
              >
                <div className="bg-gray-200 rounded-lg w-full h-12 flex items-center justify-center">
                  <span className={`font-bold ${logo.color}`}>{logo.name}</span>
                </div>
              </div>
            ))}
            
            {/* Duplicate for infinite scroll */}
            {logos.map((logo, index) => (
              <div 
                key={`logo-2-${index}`} 
                className="flex items-center justify-center min-w-[150px] h-16"
              >
                <div className="bg-gray-200 rounded-lg w-full h-12 flex items-center justify-center">
                  <span className={`font-bold ${logo.color}`}>{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
