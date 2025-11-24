import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ValidationPanel from "./pages/ValidationPanel";
import IndicatorDetails from "./pages/IndicatorDetails";
import SubmissionConfirmation from "./pages/SubmissionConfirmation";
import SummaryDashboard from "./pages/SummaryDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/validation" element={<ValidationPanel />} />
          <Route path="/indicator/:id" element={<IndicatorDetails />} />
          <Route path="/submission" element={<SubmissionConfirmation />} />
          <Route path="/dashboard" element={<SummaryDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
