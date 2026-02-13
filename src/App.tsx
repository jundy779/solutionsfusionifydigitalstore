import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import LogosAdmin from "./pages/admin/LogosAdmin";
import AdminLogin from "./pages/admin/AdminLogin";

import FAQAdmin from "./pages/admin/FAQAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import WebDevelopment from "./pages/services/WebDevelopment";
import AutomationBots from "./pages/services/AutomationBots";
import DigitalSystems from "./pages/services/DigitalSystems";
import CloudSupport from "./pages/services/CloudSupport";
import ProjectServices from "./pages/services/ProjectServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/automation-bots" element={<AutomationBots />} />
            <Route path="/services/digital-systems" element={<DigitalSystems />} />
            <Route path="/services/cloud-support" element={<CloudSupport />} />
            <Route path="/services/project-services" element={<ProjectServices />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/logos"
              element={
                <ProtectedRoute requireAdmin>
                  <LogosAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faq"
              element={
                <ProtectedRoute requireAdmin>
                  <FAQAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/testimonials"
              element={
                <ProtectedRoute requireAdmin>
                  <TestimonialsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute requireAdmin>
                  <ProjectsAdmin />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
