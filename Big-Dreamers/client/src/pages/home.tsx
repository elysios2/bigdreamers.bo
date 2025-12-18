import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Modals from "@/components/modals";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";
import HeroV2 from "@/components/hero-v2";
import AdviceMentoring from "@/pages/advice-mentoring";


import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
    
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      
      <main className="pt-20">
        <HeroV2 />
        <AdviceMentoring />
      </main>
      
      <Footer />
      <Modals />
      <ThemeToggle />
      <Chatbot />
    </div>
  );
}
