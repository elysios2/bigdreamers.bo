import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  subject: z.string().min(5, { message: "Asunto debe tener al menos 5 caracteres" }),
  message: z.string().min(10, { message: "Mensaje debe tener al menos 10 caracteres" })
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensaje enviado",
      description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
    });
    
    reset();
    setIsSubmitting(false);
  };
  
  return (
    <section id="contact" className="py-16 bg-[#f0f2f5]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto neumorph p-8 rounded-xl">
          <h2 
            className="text-3xl font-bold text-center mb-8" 
            data-aos="fade-up"
          >
            Contáctanos
          </h2>
          
          <form 
            className="space-y-6" 
            data-aos="fade-up" 
            data-aos-delay="100"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input 
                  {...register("name")}
                  type="text" 
                  id="name" 
                  className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input 
                  {...register("email")}
                  type="email" 
                  id="email" 
                  className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="tu@correo.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <input 
                {...register("subject")}
                type="text" 
                id="subject" 
                className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Asunto de tu mensaje"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea 
                {...register("message")}
                id="message" 
                rows={5} 
                className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>
            
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="neumorph-btn bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
