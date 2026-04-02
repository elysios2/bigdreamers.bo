import { useState, useEffect, useRef, useCallback, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import ThemeToggle from "@/components/theme-toggle";
import AdminForm, { AdminFormState } from "@/components/admin/AdminForm";
import PostList from "@/components/admin/PostList";
import ToastNotification, { ToastData } from "@/components/admin/ToastNotification";
import { Post, getBlogPosts, createBlogPost, deleteBlogPost } from "@/services/blogService";

const initialFormState: AdminFormState = {
  title: "",
  description: "",
};

const TOAST_TIMEOUT = 3500;

export default function Admin() {
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastData>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formState, setFormState] = useState<AdminFormState>(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimeoutRef = useRef<number>();
  const navigate = useNavigate();

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), TOAST_TIMEOUT);
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch {
      showToast("error", "No se pudo cargar los art�culos.");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      } else {
        setChecking(false);
      }
    });

    return () => data?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (!checking) {
      fetchPosts();
    }
  }, [checking, fetchPosts]);

  useEffect(() => {
    return () => {
      window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleTitleChange = useCallback((value: string) => {
    setFormState((previous) => ({ ...previous, title: value }));
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setFormState((previous) => ({ ...previous, description: value }));
  }, []);

  const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const clearImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!formState.title.trim() || !formState.description.trim()) return;

      setSubmitting(true);
      try {
        await createBlogPost({
          title: formState.title,
          description: formState.description,
          imageFile,
        });

        showToast("success", "Articulo publicado exitosamente!");
        setFormState(initialFormState);
        clearImage();
        await fetchPosts();
      } catch {
        showToast("error", "No se pudo guardar el art�culo.");
      } finally {
        setSubmitting(false);
      }
    },
    [clearImage, fetchPosts, formState.description, formState.title, imageFile, showToast],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteBlogPost(id);
        setPosts((previous) => previous.filter((post) => post.id !== id));
        showToast("success", "Articulo eliminado.");
      } catch {
        showToast("error", "No se pudo eliminar el articulo.");
      } finally {
        setDeleteConfirm(null);
      }
    },
    [showToast],
  );

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    navigate("/login");
  }, []);

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
      <ToastNotification toast={toast} />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Panel <span className="text-[#feba2b]">Administrador</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-200 text-sm mt-1">Gestiona los art�culos del blog</p>
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
            <div className="lg:col-span-2">
              <AdminForm
                formState={formState}
                imagePreview={imagePreview}
                submitting={submitting}
                fileInputRef={fileInputRef}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onImageChange={handleImageChange}
                onClearImage={clearImage}
                onSubmit={handleSubmit}
              />
            </div>

            <PostList
              posts={posts}
              loading={loading}
              deleteConfirmId={deleteConfirm}
              onRequestDelete={setDeleteConfirm}
              onCancelDelete={() => setDeleteConfirm(null)}
              onConfirmDelete={handleDelete}
            />
          </div>

          <div className="mt-10">
            <div className="bg-white dark:bg-[#048abf] rounded-2xl shadow-lg p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Registrar miembro del equipo
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-200 mt-2 max-w-2xl">
                    Solo los administradores pueden agregar miembros del equipo. La categoría se obtendrá desde la base de datos.
                  </p>
                </div>
                <Link
                  to="/admin/registrar-miembro"
                  className="inline-flex items-center justify-center rounded-xl bg-[#048abf] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#036d9f]"
                >
                  Ir al formulario de registro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ThemeToggle />
    </div>
  );
}
