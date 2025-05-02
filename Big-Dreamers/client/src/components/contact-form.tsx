import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  subject: z.string().min(5, { message: "Asunto debe tener al menos 5 caracteres" }),
  message: z.string().min(10, { message: "Mensaje debe tener al menos 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!formRef.current) return;

    setIsSubmitting(true);

    // Envía el formulario nativamente a FormSubmit
    formRef.current.submit();

    // Feedback visual
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
          <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
            Contáctanos
          </h2>

          <form
            ref={formRef}
            action="https://formsubmit.co/dreamersb648@gmail.com" // <-- CAMBIA esto a tu correo real
            method="POST"
            className="space-y-6"
            data-aos="fade-up"
            data-aos-delay="100"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Hidden extras for FormSubmit */}
            <input type="hidden" name="_subject" value="Nuevo mensaje desde el formulario de contacto" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  {...register("name")}
                  name="name"
                  id="name"
                  type="text"
                  className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  {...register("email")}
                  name="email"
                  id="email"
                  type="email"
                  className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@correo.com"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto
              </label>
              <input
                {...register("subject")}
                name="subject"
                id="subject"
                type="text"
                className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Asunto de tu mensaje"
                required
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                {...register("message")}
                name="message"
                id="message"
                rows={5}
                className="neumorph-inset w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="neumorph-btn bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}