import { useState, useEffect, useCallback, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import ThemeToggle from "@/components/theme-toggle";
import ToastNotification, { ToastData } from "@/components/admin/ToastNotification";
import { createTeamMember, getTeamCategories, type TeamMemberFormPayload } from "@/services/blogService";
import { Link } from "react-router-dom";

const initialTeamMemberState: TeamMemberFormPayload = {
    full_name: "",
    role: "",
    description: "",
    photo_url: "",
    whatsapp: "",
    email: "",
    professional_link: "",
    category_name: "",
};

export default function TeamMemberRegistration() {
    const [formState, setFormState] = useState<TeamMemberFormPayload>(initialTeamMemberState);
    const [categories, setCategories] = useState<string[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<ToastData>(null);

    const showToast = useCallback((type: "success" | "error", message: string) => {
        setToast({ type, message });
        window.setTimeout(() => setToast(null), 3500);
    }, []);

    useEffect(() => {
        const loadCategories = async () => {
            setLoadingCategories(true);
            try {
                const data = await getTeamCategories();
                setCategories(data);
            } catch {
                showToast("error", "No se pudo cargar las categorías desde la base de datos.");
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, [showToast]);

    const handleChange = useCallback((field: keyof TeamMemberFormPayload, value: string) => {
        setFormState((previous) => ({ ...previous, [field]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setSubmitting(true);

            try {
                if(formState.whatsapp.length < 8) {
                    showToast("error", "El número de WhatsApp debe tener al menos 8 caracteres.");
                    return;
                }
                await createTeamMember(formState);
                showToast("success", "Miembro agregado correctamente.");
                setFormState(initialTeamMemberState);
            } catch {
                showToast("error", "No se pudo guardar el miembro del equipo.");
            } finally {
                setSubmitting(false);
            }
        },
        [formState, showToast],
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#036d9f]">
            <Navbar />
            <ToastNotification toast={toast} />

            <main className="pt-24 pb-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                                Registrar miembro del equipo
                            </h2>
                            <p className="text-gray-500 dark:text-gray-200 text-sm mt-1">
                                Solo el administrador puede agregar nuevos miembros. Todos los datos se guardan con el mismo estilo de administración.
                            </p>
                        </div>
                        <Link
                            to="/admin"
                            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition  dark:text-white"
                        >
                            <ArrowLeft size={16} /> Volver
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-[#048abf] rounded-2xl shadow-lg p-6">
                        <form onSubmit={handleSubmit} className="grid gap-5">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <input
                                        value={formState.full_name}
                                        required
                                        type="text"
                                        onChange={(event) => handleChange("full_name", event.target.value)}
                                        placeholder="Nombre completo"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                                    />
                                </div>
                                <div>
                                    <input
                                        value={formState.role}
                                        onChange={(event) => handleChange("role", event.target.value)}
                                        placeholder="Rol"
                                        required
                                        type="text"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <textarea
                                    value={formState.description}
                                    onChange={(event) => handleChange("description", event.target.value)}
                                    rows={4}
                                    required
                                    placeholder="Descripción breve"
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition resize-none"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <input
                                        value={formState.photo_url}
                                        required
                                        type="url"
                                        onChange={(event) => handleChange("photo_url", event.target.value)}
                                        placeholder="Enlace de foto"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                                    />
                                    {
                                        formState.photo_url && (
                                            <img src={formState.photo_url} alt="Foto del miembro" className="w-full h-36 object-cover" />
                                        )
                                    }
                                </div>

                                <div>
                                    <input
                                        value={formState.whatsapp}
                                        required
                                        type="tel"
                                        onChange={(event) => handleChange("whatsapp", event.target.value)}
                                        placeholder="WhatsApp"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <input
                                        value={formState.email}
                                        onChange={(event) => handleChange("email", event.target.value)}
                                        placeholder="Email"
                                        required
                                        type="email"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                                    />
                                </div>
                                <div>
                                    <input
                                        value={formState.professional_link}
                                        onChange={(event) => handleChange("professional_link", event.target.value)}
                                        placeholder="Enlace profesional"
                                        required
                                        type="url"
                                        className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-200 mb-1">
                                    Categoría
                                </label>
                                <select
                                    value={formState.category_name}
                                    required
                                    onChange={(event) => handleChange("category_name", event.target.value)}
                                    disabled={loadingCategories}
                                    className="w-full rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] px-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                                >
                                    <option value="" disabled>
                                        {loadingCategories ? "Cargando categorías..." : "Selecciona una categoría"}
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#048abf] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#036d9f] disabled:opacity-60"
                            >
                                {submitting ? "Guardando..." : "Guardar miembro"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <ThemeToggle />
        </div>
    );
}
