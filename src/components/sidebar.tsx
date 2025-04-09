"use client";

import type React from "react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  RefreshCw,
  X,
  Calculator,
  FileSpreadsheet,
  FileCheck,
  Receipt,
  DollarSign,
  BookOpenCheck,
  ReceiptText,
  Building,
  Droplet,
  Store,
  Construction,
  PanelTop,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Finance Module",
    href: "#",
    icon: <DollarSign className="h-5 w-5" />,
    children: [
      {
        title: "Cash Book",
        href: "/cash-book",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        title: "Bank Book",
        href: "/bank-book",
        icon: <CreditCard className="h-5 w-5" />,
      },
      {
        title: "General Ledger",
        href: "/general-ledger",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Voucher Entry",
        href: "/voucher-entry",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Voucher Approval",
        href: "/voucher-approval",
        icon: <FileCheck className="h-5 w-5" />,
      },
      {
        title: "Payment Processing",
        href: "/payment-processing",
        icon: <DollarSign className="h-5 w-5" />,
      },
      {
        title: "Receipt Management",
        href: "/receipt-management",
        icon: <Receipt className="h-5 w-5" />,
      },
      {
        title: "Accounting Entries",
        href: "/accounting-entries",
        icon: <BookOpenCheck className="h-5 w-5" />,
      },
      {
        title: "Expenditure Management",
        href: "/expenditure-management",
        icon: <ReceiptText className="h-5 w-5" />,
      },
      {
        title: "Reconciliation",
        href: "/reconciliation",
        icon: <RefreshCw className="h-5 w-5" />,
      },
      {
        title: "Register",
        href: "/register",
        icon: <RefreshCw className="h-5 w-5" />,
      },
      {
        title: "Function wise ",
        href: "/function-wise-subsidary",
        icon: <ReceiptText className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Budget Module",
    href: "#",
    icon: <Calculator className="h-5 w-5" />,
    children: [
      {
        title: "Budget Preparation",
        href: "/budget-preparation",
        icon: <Calculator className="h-5 w-5" />,
      },
      {
        title: "Budget Sanction",
        href: "/budget-sanction",
        icon: <FileCheck className="h-5 w-5" />,
      },
      {
        title: "Budget Revision",
        href: "/budget-revision",
        icon: <FileSpreadsheet className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Revenue Sources",
    href: "#",
    icon: <BarChart3 className="h-5 w-5" />,
    children: [
      {
        title: "Revenue Dashboard",
        href: "/revenue-dashboard",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        title: "Property Tax",
        href: "/property-tax",
        icon: <Building className="h-5 w-5" />,
      },
      {
        title: "Water Tax",
        href: "/water-tax",
        icon: <Droplet className="h-5 w-5" />,
      },
      {
        title: "Trade License",
        href: "/trade-license",
        icon: <Store className="h-5 w-5" />,
      },
      {
        title: "Building Permit",
        href: "/building-permit",
        icon: <Construction className="h-5 w-5" />,
      },
      {
        title: "Advertisement Tax",
        href: "/advertisement-tax",
        icon: <PanelTop className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Financial Statements",
    href: "/financial-statements",
    icon: <Home className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname:any = useLocation();
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (href: string) => {
    return pathname == href;
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.title}>
        {item.children ? (
          <>
            <button
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                "hover:bg-muted"
              )}
              onClick={() => toggleGroup(item.title)}
            >
              {item.icon}
              {item.title}
              <ChevronIcon
                className="ml-auto h-4 w-4"
                open={openGroups[item.title]}
              />
            </button>
            {openGroups[item.title] && (
              <div className="ml-4 mt-1 space-y-1">
                {renderNavItems(item.children, level + 1)}
              </div>
            )}
          </>
        ) : (
          <Link
            to={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="ml-2 mt-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <FileText className="h-6 w-6" />
                <span>Jharkhand Finance</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <nav className="grid gap-1 p-2">{renderNavItems(navItems)}</nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden border-r bg-muted/40 lg:block lg:w-[240px]">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <FileText className="h-6 w-6" />
              <span>Jharkhand Finance</span>
            </Link>
          </div>
          <ScrollArea className="flex-1">
            <nav className="grid gap-1 p-2">{renderNavItems(navItems)}</nav>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

// Helper component for chevron icon
function ChevronIcon({
  className,
  open,
}: {
  className?: string;
  open?: boolean;
}) {
  return open ? (
    <ChevronDown className={className} />
  ) : (
    <ChevronRight className={className} />
  );
}
