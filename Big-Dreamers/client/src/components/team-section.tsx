import { 
  Linkedin, 
  Twitter, 
  Mail
} from "lucide-react";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Carlos Rodríguez",
      position: "CEO & Fundador",
      bio: "Ex-director de banca de inversión con más de 15 años de experiencia en el sector financiero.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Elena Martínez",
      position: "Directora de Operaciones",
      bio: "Especialista en escalabilidad de startups y procesos de inversión. MBA por IESE Business School.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Miguel Sánchez",
      position: "CTO",
      bio: "Ingeniero informático y experto en fintech con experiencia en desarrollar plataformas financieras seguras.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];
  
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl font-bold text-center mb-4" 
          data-aos="fade-up"
        >
          Nuestro Equipo
        </h2>
        <p 
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto" 
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          Conoce a los expertos detrás de InvertiConnect, profesionales con amplia experiencia 
          en el sector financiero y tecnológico.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="neumorph p-6 rounded-xl text-center" 
              data-aos="fade-up" 
              data-aos-delay={150 + (index * 50)}
            >
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-4">{member.position}</p>
              <p className="text-gray-600 mb-6">{member.bio}</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
