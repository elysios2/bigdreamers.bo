import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  companyName: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres"),
  founderName: z.string().min(2, "El nombre del fundador debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().min(6, "Ingresa un teléfono válido"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  fundingNeeded: z.string().min(1, "Ingresa un monto"),
  pitchDeckLink: z.string().url("Debe ser un enlace válido").optional().or(z.literal("")),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function StartupForm() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = () => {
    toast({
      title: "¡Formulario enviado!",
      description: "Revisaremos tu solicitud y te contactaremos en 48h.",
    });
    reset();
  };

  return (
    <div className="bg-white dark:bg-[#048abf] neumorph p-8 rounded-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Postula tu Startup</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Completa el siguiente formulario para iniciar el proceso de evaluación.
      </p>

      <form
        action="https://formsubmit.co/dreamersb648@gmail.com"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Hidden fields */}
        <input type="hidden" name="_subject" value="Nueva solicitud de startup" />
        <input type="hidden" name="_captcha" value="false" />

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Nombre de la Startup</label>
            <input {...register("companyName")} name="companyName" className="input" placeholder="Ej. BigDreamers Inc." />
            {errors.companyName && <p className="error">{errors.companyName.message}</p>}
          </div>
          <div>
            <label className="label">Nombre del Fundador</label>
            <input {...register("founderName")} name="founderName" className="input" placeholder="Nombre y Apellido" />
            {errors.founderName && <p className="error">{errors.founderName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Correo electrónico</label>
            <input {...register("email")} type="email" name="email" className="input" placeholder="correo@startup.com" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label">Teléfono</label>
            <input {...register("phone")} name="phone" className="input" placeholder="+591 70000000" />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Descripción de la startup</label>
          <textarea {...register("description")} name="description" className="input resize-none" rows={4} placeholder="¿Qué hace tu startup?" />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        <div>
          <label className="label">Financiamiento requerido ($us)</label>
          <input {...register("fundingNeeded")} type="number" name="fundingNeeded" className="input" placeholder="25000" />
          {errors.fundingNeeded && <p className="error">{errors.fundingNeeded.message}</p>}
        </div>

        <div>
          <label className="label">Enlace al Pitch Deck (Drive, Notion, etc.)</label>
          <input {...register("pitchDeckLink")} name="pitchDeckLink" type="url" className="input" placeholder="https://drive.google.com/..." />
          {errors.pitchDeckLink && <p className="error">{errors.pitchDeckLink.message}</p>}
        </div>

        <div className="flex items-start">
          <input type="checkbox" {...register("acceptTerms")} name="acceptTerms" className="mt-1 mr-2" />
          <label htmlFor="acceptTerms" className="text-sm text-gray-600 dark:text-gray-300">
            Acepto la{" "}
            <a href="#" className="text-[#048abf] dark:text-[#feba2b] hover:underline">
              política de privacidad
            </a>
            .
          </label>
        </div>
        {errors.acceptTerms && <p className="error">{errors.acceptTerms.message}</p>}

        {/* Botón */}
        <button
          type="submit"
          className="w-full neumorph-btn bg-[#feba2b] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center"
          disabled={isSubmitting}
        >
          <ArrowUp className="h-5 w-5 mr-2" />
          {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
        </button>
      </form>
    </div>
  );
}

/* ✅ Estilos utilitarios tailwind (reutilizables si gustas) */
const input = "neumorph-inset w-full p-3 rounded-lg bg-white dark:bg-[#036da1] dark:text-white";
const label = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
const error = "text-red-500 text-sm mt-1";
