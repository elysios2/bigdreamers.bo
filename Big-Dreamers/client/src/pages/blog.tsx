import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";
import { supabase } from "@/lib/supabase";
import defaultImage from "@/assets/morfiblog.webp";

type Post = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });

    async function fetchPosts() {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="py-12 md:py-20 bg-white dark:bg-[#048abf]">
          <div className="container mx-auto px-4 text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white"
              data-aos="fade-up"
            >
              Blog de <span className="text-[#feba2b]">Noticias Financieras</span>
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Tendencias, inversión y startups en el mundo y Latinoamérica
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 bg-gray-50 dark:bg-[#036d9f]">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <span className="animate-spin rounded-full h-10 w-10 border-2 border-[#048abf] border-t-transparent" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-gray-400 dark:text-gray-300">
                <p className="text-xl">No hay artículos publicados aún.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-[#048abf] rounded-xl shadow-lg overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <img
                      src={post.image_url ?? defaultImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className="inline-block text-xs font-bold text-[#048abf] dark:text-[#feba2b] uppercase tracking-wide mb-2">
                        BigDreamers Informa
                      </span>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                        {new Date(post.created_at).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.description}
                      </p>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-[#048abf] dark:text-[#feba2b] font-medium hover:underline"
                      >
                        Leer más →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white dark:bg-[#048abf] rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl"
              >
                &times;
              </button>
              <span className="inline-block text-xs font-bold text-[#048abf] dark:text-[#feba2b] uppercase tracking-wide mb-3">
                BigDreamers Informa
              </span>
              <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
                {selectedPost.title}
              </h2>
              <img
                src={selectedPost.image_url ?? defaultImage}
                alt={selectedPost.title}
                className="w-full bg-zinc-300/10 h-72 object-contain mb-4 rounded"
              />

<p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {new Date(selectedPost.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                {selectedPost.description}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ThemeToggle />
      <Chatbot />
    </div>
  );
}