import { X } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { planInfo } from "@/lib/plan-info";

const subscribeSchema = z.object({
  name: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debes aceptar la política de privacidad"
  })
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

export default function Modals() {
  const { activeModal, modalData, closeModal } = useModal();
  const { toast } = useToast();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: "",
      email: "",
      acceptTerms: false
    }
  });
  
  const onSubscribeSubmit = async (data: SubscribeFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Suscripción completada",
      description: "Te has suscrito correctamente a nuestra newsletter.",
    });
    
    reset();
    closeModal();
  };
  
  const handleInvestNow = () => {
    closeModal();
    
    const investmentSection = document.getElementById('investment');
    if (investmentSection) {
      investmentSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: "¡Genial!",
      description: "Selecciona el plan que más te interese para invertir.",
    });
  };
  
  return (
    <>
      {/* Subscribe Modal */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
          activeModal === 'subscribe' ? 'block' : 'hidden'
        }`}
        onClick={closeModal}
      >
        <div 
          className="neumorph bg-white rounded-xl p-8 max-w-md w-full mx-4" 
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Suscríbete a nuestra newsletter</h3>
            <button 
              className="text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Recibe información sobre nuevas oportunidades de inversión y noticias del sector.
          </p>
          
          <form className="space-y-4" onSubmit={handleSubmit(onSubscribeSubmit)}>
            <div>
              <label htmlFor="subscribe-name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input 
                {...register("name")}
                type="text" 
                id="subscribe-name" 
                className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Tu nombre"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="subscribe-email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input 
                {...register("email")}
                type="email" 
                id="subscribe-email" 
                className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="tu@correo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div className="flex items-start">
              <input 
                {...register("acceptTerms")}
                type="checkbox" 
                id="privacy-policy" 
                className="mt-1 mr-2"
              />
              <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                Acepto la <a href="#" className="text-primary hover:underline">política de privacidad</a> y recibir comunicaciones comerciales.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
            )}
            
            <button 
              type="submit" 
              className="w-full neumorph-btn bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </div>
      
      {/* Plan Modal */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
          activeModal === 'plan' ? 'block' : 'hidden'
        }`}
        onClick={closeModal}
      >
        <div 
          className="neumorph bg-white rounded-xl p-8 max-w-2xl w-full mx-4" 
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">
              {modalData && planInfo[modalData as keyof typeof planInfo]?.title}
            </h3>
            <button 
              className="text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-gray-600">
            {modalData && (
              <div dangerouslySetInnerHTML={{ 
                __html: planInfo[modalData as keyof typeof planInfo]?.content 
              }} />
            )}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              className="neumorph-btn bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors mr-4"
              onClick={handleInvestNow}
            >
              Invertir ahora
            </button>
            <button 
              className="neumorph-btn bg-white text-gray-700 px-6 py-2 rounded-lg font-semibold"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
