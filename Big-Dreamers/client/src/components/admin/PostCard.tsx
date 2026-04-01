import { Trash2 } from "lucide-react";
import type { Post } from "@/services/blogService";

interface PostCardProps {
  post: Post;
  isConfirmingDelete: boolean;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PostCard({
  post,
  isConfirmingDelete,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: PostCardProps) {
  return (
    <div className="bg-white dark:bg-[#048abf] rounded-2xl shadow-md overflow-hidden flex" style={{ animation: "fadeUp 0.4s ease both" }}>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="w-28 h-auto object-cover shrink-0" />
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
          <span className="text-xs text-gray-400 dark:text-gray-300">{formatDate(post.created_at)}</span>

          {isConfirmingDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-500 dark:text-red-300 font-medium">¿Confirmar?</span>
              <button
                onClick={onConfirmDelete}
                className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg font-semibold transition"
              >
                Sí, borrar
              </button>
              <button
                onClick={onCancelDelete}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={onRequestDelete}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-300 transition font-medium"
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
