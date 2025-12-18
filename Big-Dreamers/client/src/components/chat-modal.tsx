import { useState, useRef, useEffect } from "react";
import { Send, X, User } from "lucide-react";
import { format } from "date-fns";
import Morfeus from "@/assets/morfeus.webp";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Definición de Intents simplificada ---
type Intent = {
  patterns: RegExp[];
  responses: string[];
};

const intents: Intent[] = [
  {
    patterns: [/\bhola\b/, /buenos?\b/, /saludos/],
    responses: [
      "¡Hola! ¿En qué puedo ayudarte con tu inversión o proyecto hoy?",
      "¡Bienvenido a BigDreamers! Cuéntame, ¿qué te interesa explorar primero?",
      "¡Hey! ¿Listo para soñar en grande? 😉",
    ],
  },
  {
    patterns: [/inversi.n/, /invertir/, /capital/, /dinero/],
    responses: [
      "Ofrecemos planes desde 500€ con plazos de 6, 12 y 24 meses. ¿Cuál te interesa conocer?",
      "Puedes invertir a corto, medio o largo plazo. ¿Te cuento más sobre alguna opción?",
    ],
  },
  {
    patterns: [/startup/, /emprendedor/, /proyecto/],
    responses: [
      "Nuestro programa para startups te conecta con inversores y mentoría. ¿Quieres saber cómo postularte?",
      "Rellena el formulario en 'Para Startups' y te guiaré paso a paso.",
    ],
  },
  {
    patterns: [/plazo/, /duraci[oó]n/, /tiempo/],
    responses: [
      "Ofrecemos 3 plazos: 6, 12 y 24 meses. ¿Cuál te interesa?",
      "¿Prefieres detalles de plazos cortos, medianos o largos?",
    ],
  },
  {
    patterns: [/rendimiento/, /rentabilidad/, /gananc/],
    responses: [
      "Los rendimientos van de 1.5% a 2.5% según plazo. Las startups tienen condiciones especiales.",
      "¿Quieres saber el rendimiento exacto de un plan específico?",
    ],
  },
  {
    patterns: [/contacto/, /tel[fó]no/, /email/, /correo/],
    responses: [
      "Escríbenos a info@bigdreamers.com o llama al +34 912 345 678 (9:00-18:00).",
      "Formulario web, email y teléfono disponibles. ¿Necesitas algo más?",
    ],
  },
  {
    patterns: [/gracias/, /muchas gracias/],
    responses: [
      "¡De nada! Estoy aquí para ayudarte. ¿Algo más en lo que pueda asistirte?",
      "Un placer ayudar. ¡Pregunta lo que quieras! 😄",
    ],
  },
  {
    patterns: [/chiste/, /broma/],
    responses: [
      "¿Por qué los programadores confunden Halloween y Navidad? Porque OCT 31 == DEC 25. 🎃🎄",
      "¿Qué hace un pez? ¡Nada! 🐠",
      "¿Cómo saludan los químicos? '¡Ácido un placer!' 🤓",
    ],
  },
  {
    patterns: [/.*/], // fallback
    responses: [
      "Lo siento, no entendí. ¿Puedes preguntarme sobre inversiones, startups o contacto?",
      "No estoy seguro de a qué te refieres. Prueba con 'inversión' o 'startup'.",
    ],
  },
];

// Obtiene respuesta en base a mensajes
const getResponse = (message: string): string => {
  const text = message.toLowerCase();
  for (const intent of intents) {
    if (intent.patterns.some((rx) => rx.test(text))) {
      const resList = intent.responses;
      return resList[Math.floor(Math.random() * resList.length)];
    }
  }
  // Nunca llega aquí porque fallback cubre todo
  return "";
};

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy Morfeus. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(
      () => {
        const botMsg: Message = {
          id: messages.length + 2,
          text: getResponse(userMsg.text),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      },
      800 + Math.random() * 400,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <section
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="flex h-[500px] max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-[#048abf]">
        {/* HEADER */}
        <header className="flex items-center justify-between bg-[#048abf] px-4 py-3 text-white dark:bg-[#036d9f]">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-slate-200">
              <img src={Morfeus} alt="Morfeus" className="h-10 w-10 rounded-full object-contain" />
            </div>
            <h2 className="text-sm font-bold">Asistente BigDreamers</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar chat"
            className="rounded-md p-1 transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </header>


        {/* MESSAGES */}
        <main className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 dark:bg-[#036d9f]">
          {messages.map((msg) =>
            msg.sender === "bot" ? (
              <article key={msg.id} className="flex items-start gap-3">
                {/* Bot avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200">
                  <img src={Morfeus} alt="Morfeus" className="h-10 w-10 rounded-full object-contain" />
                </div>

                {/* Bot bubble */}
                <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-white p-3 shadow dark:bg-[#048abf]">
                  <header className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700 dark:text-white">
                      Morfeus
                    </span>
                    <time className="text-xs text-gray-400 dark:text-gray-300">
                      {format(msg.timestamp, "HH:mm")}
                    </time>
                  </header>
                  <p className="text-sm leading-relaxed text-gray-800 dark:text-white">
                    {msg.text}
                  </p>
                </div>
              </article>
            ) : (
              <article key={msg.id} className="flex items-start justify-end gap-3">
                {/* User bubble */}
                <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-[#1c908e] p-3 text-white">
                  <header className="mb-1 flex justify-end">
                    <time className="text-xs text-blue-100">
                      {format(msg.timestamp, "HH:mm")}
                    </time>
                  </header>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>


                {/* User avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#048abf]">
                  <User className="h-5 w-5 text-white" />
                </div>
              </article>
            )
          )}


          {/* Typing indicator */}
          {isTyping && (
            <article className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200">
                <img src={Morfeus} alt="Morfeus" className="h-10 w-10 rounded-full object-contain" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-white p-3 shadow dark:bg-[#048abf]">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              </div>
            </article>
          )}


          <div ref={messagesEndRef} />
        </main>


        {/* INPUT */}
        <footer className="border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-[#048abf]">
          <div className="flex">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              style={{ resize: "none", fieldSizing:"content" }}
              className="flex-1 rounded-l-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:border-gray-600 dark:bg-[#036d9f] dark:text-white dark:focus:ring-[#feba2b]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="rounded-r-lg bg-[#feba2b] px-4 text-white transition hover:bg-[#e0a61f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
