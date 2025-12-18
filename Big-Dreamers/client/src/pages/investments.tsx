import { useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import InvestmentPlans from "@/components/investment-plans";
import ContactForm from "@/components/contact-form";
import InterestSection from "@/components/interest-section";
import Footer from "@/components/footer";
import Modals from "@/components/modals";
import ThemeToggle from "@/components/theme-toggle";
import Chatbot from "@/components/chatbot";


import AOS from "aos";
import "aos/dist/aos.css";


export default function Investments() {
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
        <HeroSection />
        <InvestmentPlans />
        <InterestSection />
        <ContactForm />
      </main>
      
      <Footer />
      <Modals />
      <ThemeToggle />
      <Chatbot />
    </div>
  );
}
