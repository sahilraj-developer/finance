"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, CalendarIcon, Download, Filter, Plus, Printer, Search, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom"

import AxiosInterceptors from "@/components/common/AxiosInterceptors";
import ApiHeader from "@/components/api/ApiHeader";
import ProjectApiList from "@/components/api/ProjectApiList";



// Sample data for demonstration
const debitEntries = [
  {
    id: 1,
    date: "2023-04-01",
    voucherNo: "R001",
    description: "Tax Collection - Property",
    amount: 15000,
    type: "Tax",
  },
  { id: 2, date: "2023-04-01", voucherNo: "R002", description: "Water Charges", amount: 5000, type: "Fee" },
  { id: 3, date: "2023-04-01", voucherNo: "R003", description: "Building Permission Fee", amount: 25000, type: "Fee" },
  { id: 4, date: "2023-04-01", voucherNo: "R004", description: "Market License Fee", amount: 7500, type: "License" },
  {
    id: 5,
    date: "2023-04-01",
    voucherNo: "R005",
    description: "Rent from Municipal Properties",
    amount: 12000,
    type: "Rent",
  },
]

const creditEntries = [
  {
    id: 1,
    date: "2023-04-01",
    voucherNo: "P001",
    description: "Salary Payment - Admin Staff",
    amount: 22000,
    type: "Salary",
  },
  { id: 2, date: "2023-04-01", voucherNo: "P002", description: "Office Supplies", amount: 3500, type: "Supplies" },
  {
    id: 3,
    date: "2023-04-01",
    voucherNo: "P003",
    description: "Electricity Bill Payment",
    amount: 8500,
    type: "Utility",
  },
  {
    id: 4,
    date: "2023-04-01",
    voucherNo: "P004",
    description: "Vehicle Maintenance",
    amount: 4500,
    type: "Maintenance",
  },
]



// // ===========================================================================

const {
  api_getCashbookDetails,
  api_postCashbookDetails,
  api_updateCashbookDetails,
  api_deleteCashbookDetails,
  api_getRejectCashbookDetails,
  api_bankAccountGet,
} = ProjectApiList();

export default function CashBook() {




  const [loading,setLoading] = useState(true);

  const [cashbookPaymentData,setCashbookPaymentData] = useState([]);
  const [cashbookReceptData,setCashbookReceptData] = useState([]);
  
  

// const handleFilterClick = () => {
//   setLoading(true);
//   AxiosInterceptors.post(
//     `${api_getCashbookDetails}`,

//     ApiHeader()
//   )
//     .then(function (response: any) {
//       setLoading(false);
//       console.log("response",response)
//       // setCashbookPaymentData(response?.data?.data?.payments);
//       // setCashbookReceptData(response?.data?.data?.receipts);
//     })
//     .catch(function (error: any) {
//       setLoading(false);
//       // toast.error("Something went wrong");
//     });
// };



const getCashBookPaymentData = () => {
  setLoading(true);
  AxiosInterceptors.get(
    `${api_getCashbookDetails}`,
    ApiHeader()
  )
    .then(function (response) {
      setLoading(false);

      console.log("responseresponse",response?.data?.data?.payments)
      setCashbookPaymentData(response?.data?.data?.payments);
      setCashbookReceptData(response?.data?.data?.receipts);
    })
    .catch(function (error) {
      setLoading(false);
      // toast.error("Something went wrong");
    });
};


useEffect(() => {
  // activeTab != "draft" && getCashBookPaymentData();
  // getCashBookReceptData();
  // getCashBookReceptDraftData();

  getCashBookPaymentData();
}, []);





  // get
  // /api/cashbook


  // post
   // /api/dashboard-data/


  //  date: "2025-04-06",
  //     voucherNo: "R006",
  //     description: "New Tax Collection",
  //     amount: 10000,
  //     type: "Tax",


  const [date, setDate] = useState<Date | undefined>(new Date())

  // Calculate totals
  const totalDebit = debitEntries.reduce((sum, entry) => sum + entry.amount, 0)
  const totalCredit = creditEntries.reduce((sum, entry) => sum + entry.amount, 0)
  const closingBalance = totalDebit - totalCredit;

  const router = useNavigate();


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Daily Cash Book (GEN-1 Form)</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <div className="relative">
            <Button variant="outline" size="sm" id="export-options">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden"
              id="export-dropdown"
            >
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="export-options">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  Export as Excel
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  Export as PDF
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  Export as CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2 md:ml-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search transactions..." className="w-full pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button onClick={() => router("/cash-book/create")}>
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Debit Side (Receipts) */}
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-950">
            <CardTitle className="flex items-center text-green-700 dark:text-green-300">
              <ArrowDown className="mr-2 h-5 w-5" />
              Receipts (Debit)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Voucher No.</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashbookReceptData.map((entry:any) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString("en-IN")}</TableCell>
                    <TableCell>{entry.voucherNo}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{entry.category}</Badge>
                    </TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className="text-right font-medium">{entry.amount.toLocaleString("en-IN")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between border-t bg-muted/50 px-6 py-3">
            <div className="text-sm font-medium">Total Receipts</div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              ₹{totalDebit.toLocaleString("en-IN")}
            </div>
          </CardFooter>
        </Card>

        {/* Credit Side (Payments) */}
        <Card>
          <CardHeader className="bg-red-50 dark:bg-red-950">
            <CardTitle className="flex items-center text-red-700 dark:text-red-300">
              <ArrowUp className="mr-2 h-5 w-5" />
              Payments (Credit)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Voucher No.</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashbookPaymentData.map((entry:any) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString("en-IN")}</TableCell>
                    <TableCell>{entry.voucherNo}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{entry.category}</Badge>
                    </TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className="text-right font-medium">{entry.amount.toLocaleString("en-IN")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-between border-t bg-muted/50 px-6 py-3">
            <div className="text-sm font-medium">Total Payments</div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              ₹{totalCredit.toLocaleString("en-IN")}
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Closing Balance */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-sm font-medium text-muted-foreground">Opening Balance</div>
            <div className="text-xl font-bold">₹25,000.00</div>
          </div>

          <div className="flex flex-col items-center gap-1 my-4 md:my-0">
            <div className="text-sm font-medium text-muted-foreground">Closing Balance (Rule 18)</div>
            <div className="text-2xl font-bold">₹{(25000 + closingBalance).toLocaleString("en-IN")}</div>
            <Badge className="mt-1" variant="outline">
              Reconciled
            </Badge>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-sm font-medium text-muted-foreground">Net Change</div>
            <div
              className={`text-xl font-bold ${closingBalance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {closingBalance >= 0 ? "+" : ""}₹{closingBalance.toLocaleString("en-IN")}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-3">
          <div className="flex w-full justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">Cashier:</span> Rajesh Kumar
            </div>
            <div className="text-sm">
              <span className="font-medium">Accounts Officer:</span> Priya Sharma
            </div>
            <Button variant="outline" size="sm">
              Digital Sign
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Floating Action Button */}
      <Link to="/cash-book/new-entry">
        <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" size="icon">
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Transaction</span>
        </Button>
      </Link>
    </div>
  )
}

