import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProgramsPage from "./pages/ProgramsPage";
import PhasesPage from "./pages/PhasesPage";
import SeasonsPage from "./pages/SeasonsPage";
import DistrictsPage from "./pages/DistrictsPage";
import NorthDistrictsPage from "./pages/NorthDistrictsPage";
import SouthDistrictsPage from "./pages/SouthDistrictsPage";
import CentersPage from "./pages/CentersPage";
import TradesPage from "./pages/TradesPage";
import BatchesPage from "./pages/BatchesPage";
import Index from "./pages/Index";
import StudentsPage from "./pages/StudentsPage";
import TrainersPage from "./pages/TrainersPage";
import AttendancePage from "./pages/AttendancePage";
import PerformancePage from "./pages/PerformancePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/phases" element={<PhasesPage />} />
          <Route path="/seasons" element={<SeasonsPage />} />
          <Route path="/districts" element={<DistrictsPage />} />
          <Route path="/districts/north" element={<NorthDistrictsPage />} />
          <Route path="/districts/south" element={<SouthDistrictsPage />} />
          <Route path="/centers" element={<CentersPage />} />
          <Route path="/trades" element={<TradesPage />} />
          <Route path="/batches" element={<BatchesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
