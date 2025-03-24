
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReviewPage from "./pages/ReviewPage";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ContractPage from "./pages/ContractPage";
import HelpPage from "./pages/HelpPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CareersPage from "./pages/CareersPage";
import ContactUsPage from "./pages/ContactUsPage";
import FAQsPage from "./pages/FAQsPage";

// Create query client outside of the component
const queryClient = new QueryClient();

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-transition-enter">
      <ScrollToTop />
      {children}
    </div>
  );
};

// Admin route that checks if the user is both authenticated and an admin
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = AuthProvider.useContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/vendor-dashboard" />;
  }
  
  return <>{children}</>;
};

// Make App a proper React function component
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<PageTransition><Index /></PageTransition>} />
                <Route path="/review/:campaignId" element={<PageTransition><ReviewPage /></PageTransition>} />
                <Route path="/auth/login" element={<PageTransition><LoginPage /></PageTransition>} />
                <Route path="/auth/signup" element={<PageTransition><SignupPage /></PageTransition>} />
                <Route path="/auth/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
                <Route path="/contract" element={<PageTransition><ContractPage /></PageTransition>} />
                <Route path="/help" element={<PageTransition><HelpPage /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutUsPage /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
                <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactUsPage /></PageTransition>} />
                <Route path="/faqs" element={<PageTransition><FAQsPage /></PageTransition>} />
                
                {/* Vendor Dashboard Routes */}
                <Route path="/vendor-dashboard/*" element={
                  <PageTransition>
                    <PrivateRoute>
                      <VendorDashboard />
                    </PrivateRoute>
                  </PageTransition>
                } />
                
                {/* Admin Dashboard Routes */}
                <Route path="/admin-dashboard/*" element={
                  <PageTransition>
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  </PageTransition>
                } />
                
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
