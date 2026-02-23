import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import Index from "./pages/Index";

// Lazy load all non-critical pages
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const LogosAdmin = lazy(() => import("./pages/admin/LogosAdmin"));
const FAQAdmin = lazy(() => import("./pages/admin/FAQAdmin"));
const TestimonialsAdmin = lazy(() => import("./pages/admin/TestimonialsAdmin"));
const ProjectsAdmin = lazy(() => import("./pages/admin/ProjectsAdmin"));
const ConsultationsAdmin = lazy(() => import("./pages/admin/ConsultationsAdmin"));
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const AutomationBots = lazy(() => import("./pages/services/AutomationBots"));
const DigitalSystems = lazy(() => import("./pages/services/DigitalSystems"));
const CloudSupport = lazy(() => import("./pages/services/CloudSupport"));
const ProjectServices = lazy(() => import("./pages/services/ProjectServices"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageSkeleton />}>
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
                <Route
                  path="/admin/consultations"
                  element={
                    <ProtectedRoute requireAdmin>
                      <ConsultationsAdmin />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
