import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User } from "lucide-react";
import { format } from "date-fns";

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
      text: "¡Hola! Soy el asistente virtual de BigDreamers. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (e.key === "Enter") handleSendMessage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#048abf] neumorph rounded-xl shadow-lg w-full max-w-md h-[500px] max-h-[90vh] overflow-hidden">
        <div className="bg-[#048abf] dark:bg-[#036d9f] text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <h3 className="font-bold">Asistente BigDreamers</h3>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 h-[calc(100%-132px)] overflow-y-auto bg-gray-50 dark:bg-[#036d9f]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${msg.sender === "user" ? "bg-[#048abf] text-white rounded-tr-none" : "bg-white dark:bg-[#048abf] text-gray-800 dark:text-white rounded-tl-none shadow"} max-w-[80%] p-3 rounded-lg`}
              >
                <div className="flex items-center mb-1">
                  {msg.sender === "bot" ? (
                    <Bot className="h-4 w-4 mr-1 text-[#feba2b]" />
                  ) : (
                    <User className="h-4 w-4 mr-1 text-white" />
                  )}
                  <span
                    className={`text-xs ${msg.sender === "user" ? "text-gray-100" : "text-gray-500 dark:text-gray-300"}`}
                  >
                    {format(msg.timestamp, "HH:mm")}
                  </span>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white dark:bg-[#048abf] p-3 rounded-lg rounded-tl-none shadow max-w-[80%]">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-1 text-[#feba2b]" />
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    {format(new Date(), "HH:mm")}
                  </span>
                </div>
                <div className="flex space-x-1 mt-1">
                  <div
                    className="h-2 w-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-2 w-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="h-2 w-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#048abf]">
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-3 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#048abf] dark:focus:ring-[#feba2b] dark:bg-[#036d9f] dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={`bg-[#feba2b] text-white p-3 rounded-r-lg transition-colors ${!inputValue.trim() || isTyping ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e0a61f]"}`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
