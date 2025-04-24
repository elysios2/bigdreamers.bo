import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/plan/corto-plazo" component={ShortTermPlan} />
      <Route path="/plan/mediano-plazo" component={MediumTermPlan} />
      <Route path="/plan/largo-plazo" component={LongTermPlan} />
      <Route path="/casos-de-exito" component={SuccessStories} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/blog" component={Blog} />
      <Route path="/investor-guide" component={InvestorGuide} />
      <Route path="/startups" component={Startups} />
      <Route component={NotFound} />
    </Switch>
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
