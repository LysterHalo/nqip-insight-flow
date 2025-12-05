import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ValidationPanel from "./pages/ValidationPanel";
import IndicatorDetails from "./pages/IndicatorDetails";
import SubmissionConfirmation from "./pages/SubmissionConfirmation";
import SummaryDashboard from "./pages/SummaryDashboard";
import SubmissionsDashboard from "./pages/SubmissionsDashboard";
import SubmissionDetail from "./pages/SubmissionDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main entry point - Submissions Dashboard */}
          <Route path="/" element={<SubmissionsDashboard />} />
          <Route path="/submissions" element={<SubmissionsDashboard />} />
          <Route path="/submissions/:id" element={<SubmissionDetail />} />
          
          {/* Legacy routes */}
          <Route path="/overview" element={<Dashboard />} />
          <Route path="/validation" element={<ValidationPanel />} />
          <Route path="/indicator/:id" element={<IndicatorDetails />} />
          <Route path="/submission" element={<SubmissionConfirmation />} />
          <Route path="/dashboard" element={<SummaryDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
