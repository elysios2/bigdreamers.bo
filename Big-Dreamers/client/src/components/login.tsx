import { useState, useEffect } from "react";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirige al admin si ya hay sesión activa
useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      window.location.href = "/admin";
    }
  });
}, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Correo o contraseña incorrectos. Inténtalo de nuevo.");
      setLoading(false);
      return;
    }

    // Hard redirect so the new session is picked up cleanly
    window.location.href = "/admin";
  };

  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 bg-gray-50 dark:bg-[#036d9f] flex items-center justify-center py-16 px-4">
        <div
          className="bg-white dark:bg-[#048abf] rounded-2xl shadow-2xl w-full max-w-md p-8"
          style={{ animation: "fadeUp 0.5s ease both" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              <span className="text-[#048abf] dark:text-white">Big</span>
              <span className="text-[#feba2b]">Dreamers</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-200 text-sm mt-2">
              Panel de administración — solo equipo interno
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/40 text-red-600 dark:text-red-300 text-sm rounded-lg px-4 py-3 mb-6">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-[#036d9f] bg-gray-50 dark:bg-[#036d9f] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#048abf] hover:bg-[#036d9f] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn size={18} />
                  Iniciar sesión
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <Footer />
      <ThemeToggle />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}