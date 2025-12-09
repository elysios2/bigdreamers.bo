import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ShortTermPlan from "@/pages/short-term-plan";
import MediumTermPlan from "@/pages/medium-term-plan";
import LongTermPlan from "@/pages/long-term-plan";
import SuccessStories from "@/pages/Success-Stories";
import AboutUs from "@/pages/about-us";
import Blog from "@/pages/blog";
import InvestorGuide from "@/pages/investor-guide";
import Startups from "@/pages/startups";
import Gracias from "@/pages/Gracias";
import InterestSimple from "@/pages/interest-simple";
import InterestCompound from "@/pages/interest-compound";
import InteresttMixed from "@/pages/interest-mixed";
import AdviceMentoring from "@/pages/advice-mentoring";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan/corto-plazo" element={<ShortTermPlan />} />
        <Route path="/plan/mediano-plazo" element={<MediumTermPlan />} />
        <Route path="/plan/largo-plazo" element={<LongTermPlan />} />
        <Route path="/interes/simple" element={<InterestSimple />} />
        <Route path="/interes/compuesto" element={<InterestCompound />} />
        <Route path="/interes/mixto" element={<InteresttMixed />} />
        <Route path="/casos-de-exito" element={<SuccessStories />} />
        <Route path="/asesoria-mentoria" element={<AdviceMentoring />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/investor-guide" element={<InvestorGuide />} />
        <Route path="/startups" element={<Startups />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
