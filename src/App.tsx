import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="flex flex-col gap-4">

      <Router>
        <ClientLayout>
          <Routes>

            {/* Protected Client Routes */}
            <Route path="/" element={ <Dashboard />  }  />
            {/* Redirect Root Path */}
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          </Routes>
        </ClientLayout>
      </Router>


    </div>
  );
}
