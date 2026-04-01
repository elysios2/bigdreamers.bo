import { Newspaper } from "lucide-react";
import type { Post } from "@/services/blogService";
import PostCard from "@/components/admin/PostCard";

interface PostListProps {
  posts: Post[];
  loading: boolean;
  deleteConfirmId: string | null;
  onRequestDelete: (id: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (id: string) => void;
}

export default function PostList({
  posts,
  loading,
  deleteConfirmId,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}: PostListProps) {
  return (
    <div className="lg:col-span-3 space-y-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <Newspaper size={20} className="text-[#048abf] dark:text-[#feba2b]" />
        Artículos publicados
        <span className="ml-auto text-sm font-normal text-gray-400 dark:text-gray-300">{posts.length} total</span>
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
          <PostCard
            key={post.id}
            post={post}
            isConfirmingDelete={deleteConfirmId === post.id}
            onRequestDelete={() => onRequestDelete(post.id)}
            onCancelDelete={onCancelDelete}
            onConfirmDelete={() => onConfirmDelete(post.id)}
          />
        ))
      )}
    </div>
  );
}
