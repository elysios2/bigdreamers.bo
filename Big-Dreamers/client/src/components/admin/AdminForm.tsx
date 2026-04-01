import { PlusCircle, ImagePlus, X } from "lucide-react";
import type { ChangeEvent, FormEvent, RefObject } from "react";

export type AdminFormState = {
  title: string;
  description: string;
};

interface AdminFormProps {
  formState: AdminFormState;
  imagePreview: string | null;
  submitting: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function AdminForm({
  formState,
  imagePreview,
  submitting,
  fileInputRef,
  onTitleChange,
  onDescriptionChange,
  onImageChange,
  onClearImage,
  onSubmit,
}: AdminFormProps) {
  return (
    <div className="bg-white dark:bg-[#048abf] rounded-2xl shadow-lg p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        <PlusCircle size={20} className="text-[#048abf] dark:text-[#feba2b]" />
        Nuevo artículo
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Título *
          </label>
          <input
            type="text"
            required
            value={formState.title}
            onChange={(event) => onTitleChange(event.target.value)}
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
            value={formState.description}
            onChange={(event) => onDescriptionChange(event.target.value)}
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
                onClick={onClearImage}
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
            onChange={onImageChange}
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
  );
}
