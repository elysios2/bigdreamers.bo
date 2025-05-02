import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  pitchDeck: z.string().url({ message: "Debe ser un enlace válido (https://...)" }).optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

type StartupFormValues = z.infer<typeof startupSchema>;

export default function StartupForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      companyName: "",
      founderName: "",
      email: "",
      phone: "",
      description: "",
      fundingNeeded: "",
      pitchDeck: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async () => {
    toast({
      title: "¡Formulario enviado!",
      description: "Hemos recibido tu solicitud. Te contactaremos pronto.",
    });
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-[#048abf] neumorph p-8 rounded-xl text-center max-w-xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">¡Solicitud Recibida!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Gracias por postular tu startup a BigDreamers. Nuestro equipo revisará tu solicitud y te contactará pronto.
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

      <form
        action="https://formsubmit.co/dreamersb648@gmail.com"
        method="POST"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Hidden fields para FormSubmit */}
        <input type="hidden" name="_subject" value="Nueva solicitud de startup" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de la Startup</label>
            <input {...register("companyName")} name="companyName" className="neumorph-inset w-full p-3 rounded-lg bg-white dark:bg-[#036da1] dark:text-white" placeholder="BigDreamers Inc." />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del Fundador</label>
            <input {...register("founderName")} name="founderName" className="neumorph-inset w-full p-3 rounded-lg bg-white dark:bg-[#036da1] dark:text-white" placeholder="Nombre y apellido" />
            {errors.founderName && <p className="text-red-500 text-sm mt-1">{errors.founderName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
            <input {...register("email")} name="email" type="email" className="neumorph-inset w-full p-3 rounded-lg bg-white dark:bg-[#036da1] dark:text-white" placeholder="tu@startup.com" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono de contacto</label>
            <input {...register("phone")} name="phone" className="neumorph-inset w-full p-3 rounded-lg bg-white dark:bg-[#036da1] dark:text-white" placeholder="+591 70000000" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Describe tu startup brevemente</label>
          <textarea {...register("description")} name="description" rows={4} className="neumorph-inset w-full p-3 rounded-lg bg-white dark:bg-[#036da1] dark:text-white resize-none" placeholder="¿Qué problema resuelves? ¿Cuál es tu propuesta de valor?" />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Financiamiento necesario ($us)</label>
          <input {...register("fundingNeeded")} name="fundingNeeded" type="number" className="neumorph-inset w-full p-3 rounded-lg bg-white dark:bg-[#036da1] dark:text-white" placeholder="25000" />
          {errors.fundingNeeded && <p className="text-red-500 text-sm mt-1">{errors.fundingNeeded.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enlace al Pitch Deck (Drive u otro)</label>
          <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.pitchDeck ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#048abf]/30'}`}>
            <div className="flex items-center space-x-3 justify-center text-gray-500 dark:text-gray-300">
              <Upload className="w-6 h-6" />
              <input {...register("pitchDeck")} name="pitchDeck" type="url" className="bg-transparent outline-none w-full" placeholder="https://drive.google.com/..." />
            </div>
            {errors.pitchDeck && <p className="text-red-500 text-sm mt-2">{errors.pitchDeck.message}</p>}
          </div>
        </div>

        <div className="flex items-start">
          <input {...register("acceptTerms")} name="acceptTerms" type="checkbox" id="terms" className="mt-1 mr-2" />
          <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
            Acepto la <a href="#" className="text-[#048abf] dark:text-[#feba2b] hover:underline">política de privacidad</a>.
          </label>
        </div>
        {errors.acceptTerms && <p className="text-red-500 text-sm mt-0">{errors.acceptTerms.message}</p>}

        <button type="submit" className="w-full neumorph-btn bg-[#feba2b] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center" disabled={isSubmitting}>
          <ArrowUp className="h-5 w-5 mr-2" />
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}