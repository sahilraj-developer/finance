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
import AccountingEntries from "./pages/accounting-entries/page";
import BankBook from "./pages/bank-book/page";
import BudgetPreparation from "./pages/budget-preparation/page";
import BudgetRevision from "./pages/budget-revision/page";
import BudgetSanction from "./pages/budget-sanction/page";
import CashBook from "./pages/cash-book/page";
import CashBookCreate from "./pages/cash-book/new-entry";
import ExpenditureManagement from "./pages/expenditure-management/page";
import FinancialStatements from "./pages/financial-statements/page";
import GeneralLedger from "./pages/general-ledger/page";
import PaymentProcessing from "./pages/payment-processing/page";
import PropertyTaxPage from "./pages/property-tax/page";
import PropertyTaxPayment from "./pages/property-tax/payment/page";
import ReceiptManagement from "./pages/receipt-management/page";
import Reconciliation from "./pages/reconciliation/page";
import TradeLicensePage from "./pages/trade-license/page";
import TradeLicensePayment from "./pages/trade-license/payment/page";
import VoucherApproval from "./pages/voucher-approval/page";
import VoucherEntry from "./pages/voucher-entry/page";
import WaterTaxPage from "./pages/water-tax/page";
import RevenueDashboard from "./pages/revenue-dashboard/page";

export default function App() {
  return (
    <div className="flex flex-col gap-4">

      <Router>
        <ClientLayout>
          <Routes>

            {/* Protected Client Routes */}
            <Route path="/" element={ <Dashboard />  }  />

            <Route path="/accounting-entries" element={ <AccountingEntries />  }  />
            <Route path="/bank-book" element={ <BankBook />  }  />
            <Route path="/budget-preparation" element={ <BudgetPreparation />  }  />
            <Route path="/budget-revision" element={ <BudgetRevision />  }  />
            <Route path="/budget-sanction" element={ <BudgetSanction />  }  />
            <Route path="/cash-book" element={ <CashBook />  }  />
            <Route path="/cash-book/create" element={ <CashBookCreate />  }  />
            <Route path="/expenditure-management" element={ <ExpenditureManagement />  }  />
            <Route path="/financial-statements" element={ <FinancialStatements />  }  />
            <Route path="/general-ledger" element={ <GeneralLedger />  }  />
            <Route path="/payment-processing" element={ <PaymentProcessing />  }  />
            <Route path="/property-tax" element={ <PropertyTaxPage />  }  />
            <Route path="/property-tax/payment" element={ <PropertyTaxPayment />  }  />
            <Route path="/receipt-management" element={ <ReceiptManagement />  }  />
            {/* <Route path="/reconciliation" element={ <Reconciliation />  }  /> */}
            <Route path="/reconciliation" element={ <Reconciliation />  }  />
            <Route path="/revenue-dashboard" element={ <RevenueDashboard />  }  />
            <Route path="/trade-license" element={ <TradeLicensePage />  }  />
            <Route path="/trade-license/payment" element={ <TradeLicensePayment />  }  />
            <Route path="/voucher-approval" element={ <VoucherApproval />  }  />
            <Route path="/voucher-entry" element={ <VoucherEntry />  }  />
            <Route path="/water-tax" element={ <WaterTaxPage />  }  />
           

            
            {/* Redirect Root Path */}
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          </Routes>
        </ClientLayout>
      </Router>


    </div>
  );
}
