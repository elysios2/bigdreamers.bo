import { useState, useEffect, useRef } from "react";
import {
  PlusCircle,
  Trash2,
  LogOut,
  ImagePlus,
  X,
  CheckCircle,
  AlertCircle,
  Newspaper,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import ThemeToggle from "@/components/theme-toggle";

type Post = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
};

type Toast = { type: "success" | "error"; message: string } | null;

export default function Admin() {
  // ── Todos los hooks PRIMERO, sin excepción ──
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || !session) {
      window.location.href = "/login";
    } else {
      setChecking(false);
    }
  });

  return () => subscription.unsubscribe();
}, []);

  useEffect(() => {
    if (!checking) fetchPosts();
  }, [checking]);

  // ── Funciones ──
  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);

    let image_url: string | null = null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const filename = `${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filename, imageFile, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        showToast("error", `Error al subir imagen: ${uploadError.message}`);
        setSubmitting(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filename);
      image_url = urlData.publicUrl;
    }

    const { error } = await supabase
      .from("blog_posts")
      .insert([{ title: title.trim(), description: description.trim(), image_url }]);

    if (error) {
      showToast("error", "Error al guardar el artículo.");
    } else {
      showToast("success", "¡Artículo publicado exitosamente!");
      setTitle("");
      setDescription("");
      clearImage();
      fetchPosts();
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      showToast("error", "No se pudo eliminar el artículo.");
    } else {
      showToast("success", "Artículo eliminado.");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleteConfirm(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  // ── Returns condicionales AL FINAL, después de todos los hooks ──
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#036d9f]">
        <span className="animate-spin rounded-full h-10 w-10 border-2 border-[#048abf] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#036d9f]">
      <Navbar />

      {toast && (
        <div
          className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-sm font-medium ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ animation: "slideIn 0.3s ease both" }}
        >
          {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </div>
      )}

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Panel <span className="text-[#feba2b]">Administrador</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-200 text-sm mt-1">
                Gestiona los artículos del blog
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-300 transition font-medium text-sm"
            >
              <LogOut size={17} />
              Cerrar sesión
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-[#048abf] rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
                  <PlusCircle size={20} className="text-[#048abf] dark:text-[#feba2b]" />
                  Nuevo artículo
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                      Título *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ej: Kavak cierra ronda Series F…"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Resumen o contenido del artículo…"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] text-sm transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                      Imagen (opcional)
                    </label>
                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden">
                        <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover" />
                        <button
                          type="button"
                          onClick={clearImage}
                          className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-28 rounded-xl border-2 border-dashed border-gray-300 dark:border-[#036d9f] hover:border-[#048abf] dark:hover:border-[#feba2b] flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-300 hover:text-[#048abf] dark:hover:text-[#feba2b] transition"
                      >
                        <ImagePlus size={24} />
                        <span className="text-xs font-medium">Haz clic para subir imagen</span>
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#048abf] hover:bg-[#036d9f] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {submitting ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <PlusCircle size={18} />
                        Publicar artículo
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Posts list */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Newspaper size={20} className="text-[#048abf] dark:text-[#feba2b]" />
                Artículos publicados
                <span className="ml-auto text-sm font-normal text-gray-400 dark:text-gray-300">
                  {posts.length} total
                </span>
              </h2>

              {loading ? (
                <div className="flex justify-center py-16">
                  <span className="animate-spin rounded-full h-8 w-8 border-2 border-[#048abf] border-t-transparent" />
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white dark:bg-[#048abf] rounded-2xl shadow p-10 text-center text-gray-400 dark:text-gray-300">
                  <Newspaper size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Aún no hay artículos publicados.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-[#048abf] rounded-2xl shadow-md overflow-hidden flex"
                    style={{ animation: "fadeUp 0.4s ease both" }}
                  >
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-28 h-auto object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400 dark:text-gray-300">
                          {new Date(post.created_at).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {deleteConfirm === post.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-500 dark:text-red-300 font-medium">¿Confirmar?</span>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg font-semibold transition"
                            >
                              Sí, borrar
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(post.id)}
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-300 transition font-medium"
                          >
                            <Trash2 size={14} />
                            Eliminar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <ThemeToggle />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}