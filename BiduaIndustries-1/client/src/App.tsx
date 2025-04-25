import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import NaplooPage from "@/pages/NaplooPage";
import BeautyCarePage from "@/pages/BeautyCarePage";
import CloudDrivePage from "@/pages/CloudDrivePage";
import OEMSolutionsPage from "@/pages/OEMSolutionsPage";
import ITConnectPage from "@/pages/ITConnectPage";
import InvestorPage from "@/pages/InvestorPage";
import AuthPage from "@/pages/AuthPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/naploo" component={NaplooPage} />
      <Route path="/beauty-care" component={BeautyCarePage} />
      <Route path="/cloud-drive" component={CloudDrivePage} />
      <Route path="/oem-solutions" component={OEMSolutionsPage} />
      <Route path="/it-connect" component={ITConnectPage} />
      <Route path="/investor" component={InvestorPage} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Admin Routes - Protected with admin role */}
      <ProtectedRoute path="/admin" component={AdminDashboard} adminOnly={true} />
      
      {/* 404 Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col">
            {!isAdminRoute && <Header />}
            <main className={isAdminRoute ? "" : "flex-grow"}>
              <Router />
            </main>
            {!isAdminRoute && <Footer />}
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
