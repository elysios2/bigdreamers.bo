import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ChatModal from "./chat-modal";

export default function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatbotClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleChatbotClick} 
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-[#048abf] dark:bg-[#feba2b] flex items-center justify-center z-40 hover:bg-[#036da1] dark:hover:bg-[#e0a61f] transition-all hover:scale-105 shadow-lg neumorph-floating"
        aria-label="Chatear con nosotros"
      >
        <MessageSquare className="h-7 w-7 text-white" />
      </button>
      
      <ChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}