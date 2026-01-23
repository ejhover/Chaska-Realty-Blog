import { useEffect } from "react";
import { Switch, Route, Router, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Admin from "@/pages/Admin";
import AddPost from "@/pages/AddPost";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (location.includes("#")) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location]);

  return null;
}

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/about" component={About} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/add" component={AddPost} />
      <Route path="/admin/edit/:id" component={AddPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const basePath = import.meta.env.DEV ? "" : import.meta.env.BASE_URL.replace(/\/$/, "") || "";
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router base={basePath}>
          <ScrollToTop />
          <Routes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
