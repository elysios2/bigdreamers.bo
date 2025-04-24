import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, FileText, Check, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const startupSchema = z.object({
  companyName: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres" }),
  founderName: z.string().min(2, { message: "El nombre del fundador debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Ingresa un email válido" }),
  phone: z.string().min(6, { message: "Ingresa un teléfono válido" }),
  description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  fundingNeeded: z.string().min(1, { message: "Ingresa un monto" }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debes aceptar la política de privacidad"
  })
});

type StartupFormValues = z.infer<typeof startupSchema>;

export default function StartupForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      companyName: "",
      founderName: "",
      email: "",
      phone: "",
      description: "",
      fundingNeeded: "",
      acceptTerms: false
    }
  });
  
  const onSubmit = async (data: StartupFormValues) => {
    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbzs17Uln8_A8qRcyiZiDhBFSwdhnpEcDxGi7QHWeZ9cEZJLhSBIz_3d3KQmBsuCM_eA/exec"; // ⬅️ pega aquí tu URL real

      const payload = {
        companyName: data.companyName,
        founderName: data.founderName,
        email: data.email,
        phone: data.phone,
        description: data.description,
        fundingNeeded: data.fundingNeeded,
      };

      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.result === "success") {
        toast({
          title: "¡Formulario enviado!",
          description: "Hemos recibido tu solicitud. Te contactaremos dentro de las próximas 48 horas.",
        });
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error("Error en el servidor de Google Sheets");
      }
    } catch (error) {
      console.error("Error al enviar los datos a Google Sheets:", error);
      toast({
        title: "¡Gracias por tu interés!",
        description: "Si tu startup es seleccionada, pronto uno de nuestros asesores se pondrá en contacto contigo.",
    });
    }
  };

  
  const handleFileUpload = () => {
    // Simulate file upload
    setTimeout(() => {
      setFileUploaded(true);
      toast({
        title: "Archivo subido correctamente",
        description: "Hemos recibido tu pitch deck.",
      });
    }, 500);
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-[#048abf] neumorph p-8 rounded-xl text-center max-w-xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">¡Solicitud Recibida!</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Gracias por postular tu startup a BigDreamers. Nuestro equipo revisará tu solicitud cuidadosamente y te contactará en las próximas 48 horas para discutir los siguientes pasos.
        </p>
        
        <button
          onClick={() => setIsSubmitted(false)}
          className="neumorph-btn bg-[#feba2b] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-[#048abf] neumorph p-8 rounded-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Postula tu Startup</h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Completa el siguiente formulario para iniciar el proceso de evaluación y conectarte con potenciales inversores.
      </p>
      
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre de la Startup
            </label>
            <input 
              {...register("companyName")}
              className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] bg-white dark:bg-[#036da1] dark:text-white" 
              placeholder="BigDreamers Inc."
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre del Fundador
            </label>
            <input 
              {...register("founderName")}
              className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] bg-white dark:bg-[#036da1] dark:text-white" 
              placeholder="Nombre y apellido"
            />
            {errors.founderName && (
              <p className="text-red-500 text-sm mt-1">{errors.founderName.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input 
              {...register("email")}
              type="email"
              className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] bg-white dark:bg-[#036da1] dark:text-white" 
              placeholder="tu@startup.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teléfono de contacto
            </label>
            <input 
              {...register("phone")}
              className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] bg-white dark:bg-[#036da1] dark:text-white" 
              placeholder="+34 612 345 678"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Describe tu startup brevemente
          </label>
          <textarea 
            {...register("description")}
            rows={4}
            className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] bg-white dark:bg-[#036da1] dark:text-white resize-none" 
            placeholder="¿Qué problema resuelves? ¿Cuál es tu propuesta de valor? ¿En qué etapa se encuentra tu startup?"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Financiamiento necesario ($us)
          </label>
          <input 
            {...register("fundingNeeded")}
            type="number"
            className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] bg-white dark:bg-[#036da1] dark:text-white" 
            placeholder="25000"
          />
          {errors.fundingNeeded && (
            <p className="text-red-500 text-sm mt-1">{errors.fundingNeeded.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Pitch Deck / Presentación (opcional)
          </label>
          <div 
            onClick={handleFileUpload}
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              ${fileUploaded 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#048abf]/30'}
            `}
          >
            {fileUploaded ? (
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <FileText className="w-6 h-6" />
                <span>presentacion_proyecto.pdf</span>
                <Check className="w-5 h-5" />
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500 dark:text-gray-300">
                <Upload className="w-10 h-10 mb-2" />
                <span className="font-medium">Haz clic para subir tu presentación</span>
                <span className="text-xs mt-1">PDF, PPT o PPTX (máx. 10MB)</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-start">
          <input 
            {...register("acceptTerms")}
            type="checkbox" 
            id="terms" 
            className="mt-1 mr-2"
          />
          <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
            Acepto la <a href="#" className="text-[#048abf] dark:text-[#feba2b] hover:underline">política de privacidad</a> y entiendo que mis datos serán procesados para la evaluación de mi solicitud.
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm mt-0">{errors.acceptTerms.message}</p>
        )}
        
        <button 
          type="submit" 
          className="w-full neumorph-btn bg-[#feba2b] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : (
            <>
              <ArrowUp className="h-5 w-5 mr-2" />
              Enviar Solicitud
            </>
          )}
        </button>
      </form>
    </div>
  );
}