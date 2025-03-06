
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { UserProvider } from "@/providers/user-provider";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Introduction from "./pages/Introduction";
import EmergencyHelp from "./pages/EmergencyHelp";
import AiAdvisor from "./pages/AiAdvisor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/introduction" element={<Introduction />} />
              <Route path="/assessment" element={<Assessment />} />
              
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/ai-advisor" element={<AiAdvisor />} />
                <Route path="/emergency" element={<EmergencyHelp />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
