import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle
              size={72}
              strokeWidth={3}
              style={{ color: "#048abf" }}
            />
            <h1 className="text-2xl font-bold text-gray-900">
              404 <span className="text-[#feba2b]">¡Oops! </span>Este sueño aún
              no ha sido encontrado...
            </h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            🔍 Hemos buscado en las startups, en los pitch decks y hasta debajo
            de la cafetera...Pero esta página no existe{" "}
            <span className="text-[#048abf]">¡TODAVIA!</span>
          </p>

          <p className="mt-4 text-sm text-gray-600">
            <span className="text-[#048abf]">Pero no te preocupes:</span>
            <br />
            Aquí en Big Dreamers creemos que todo gran error es solo el inicio
            de una gran idea.
            <br />
            ¿Por qué no vuelves al inicio y sigues soñando en grande?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
