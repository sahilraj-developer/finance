"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download, Filter, Plus, Printer, Search, AlertTriangle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link } from "react-router-dom"


// Sample data for demonstration
const bankAccounts = [
  { id: "sbi", name: "State Bank of India", accountNo: "3245678901", balance: 1250000 },
  { id: "bob", name: "Bank of Baroda", accountNo: "7865432109", balance: 780000 },
  { id: "pnb", name: "Punjab National Bank", accountNo: "5643219876", balance: 450000 },
]

const transactions = {
  sbi: [
    {
      id: 1,
      date: "2023-04-01",
      chequeNo: "123456",
      description: "Grant Deposit - Urban Development",
      amount: 500000,
      type: "deposit",
    },
    {
      id: 2,
      date: "2023-04-02",
      chequeNo: "654321",
      description: "Contractor Payment - Road Works",
      amount: 250000,
      type: "withdrawal",
    },
    {
      id: 3,
      date: "2023-04-03",
      chequeNo: "789012",
      description: "Tax Collection Transfer",
      amount: 125000,
      type: "deposit",
    },
    {
      id: 4,
      date: "2023-04-05",
      chequeNo: "345678",
      description: "Salary Disbursement",
      amount: 350000,
      type: "withdrawal",
    },
  ],
  bob: [
    {
      id: 1,
      date: "2023-04-01",
      chequeNo: "987654",
      description: "Infrastructure Grant",
      amount: 300000,
      type: "deposit",
    },
    {
      id: 2,
      date: "2023-04-04",
      chequeNo: "456789",
      description: "Vendor Payment - IT Services",
      amount: 120000,
      type: "withdrawal",
    },
  ],
  pnb: [
    {
      id: 1,
      date: "2023-04-02",
      chequeNo: "246810",
      description: "Special Project Fund",
      amount: 200000,
      type: "deposit",
    },
    {
      id: 2,
      date: "2023-04-06",
      chequeNo: "135790",
      description: "Equipment Purchase",
      amount: 150000,
      type: "withdrawal",
    },
  ],
}

export default function BankBook() {

  // get

  // /api/bank-transaction?bankId=${bankId}
  
  
  // post 

    // /api/bank-transaction?bankId=${bankId}
    // {
    //   "date": "2023-04-01",
    //   "voucherNo": "123456",
    //   "description": "Grant Deposit - Urban Development",
    //   "amount": 500000,
    //   "type": "Debit",
    //   "bankId": "sbi"
    // }
    

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedBank, setSelectedBank] = useState("sbi")

  // Get transactions for selected bank
  const bankTransactions = transactions[selectedBank as keyof typeof transactions] || []

  // Calculate totals
  const totalDeposits = bankTransactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawals = bankTransactions.filter((t) => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0)

  const selectedBankDetails = bankAccounts.find((b) => b.id === selectedBank)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Bank Book (GEN-2 Form)</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="grid gap-2">
          <Label htmlFor="bank-account">Bank Account</Label>
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select bank account" />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  {bank.name} - {bank.accountNo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Bank Account Details */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-bold">{selectedBankDetails?.name}</h2>
            <p className="text-sm text-muted-foreground">Account No: {selectedBankDetails?.accountNo}</p>
          </div>
          <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
            <div className="text-sm text-muted-foreground">Current Balance</div>
            <div className="text-2xl font-bold">₹{selectedBankDetails?.balance.toLocaleString("en-IN")}</div>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Alert */}
      <Alert
        variant="destructive"
        className="bg-amber-50 text-amber-900 border-amber-500 dark:bg-amber-950 dark:text-amber-200"
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Reconciliation Required (Rule 19.6)</AlertTitle>
        <AlertDescription>
          There are 3 unreconciled transactions between bank statement and book balance.
          <Button variant="link" className="p-0 h-auto text-amber-900 dark:text-amber-200 font-medium">
            View Discrepancies
          </Button>
        </AlertDescription>
      </Alert>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Cheque No.</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString("en-IN")}</TableCell>
                  <TableCell>{transaction.chequeNo}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={transaction.type === "deposit" ? "success" : "destructive"}>
                      {transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      transaction.type === "deposit"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}
                    {transaction.amount.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
          <div className="flex gap-6">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Total Deposits</div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                ₹{totalDeposits.toLocaleString("en-IN")}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Total Withdrawals</div>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                ₹{totalWithdrawals.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Net Change</div>
            <div
              className={`text-lg font-bold ${
                totalDeposits - totalWithdrawals >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {totalDeposits - totalWithdrawals >= 0 ? "+" : ""}₹
              {(totalDeposits - totalWithdrawals).toLocaleString("en-IN")}
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Floating Action Button */}
      <Link to="/bank-book/new-transaction" >
        <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" size="icon">
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Transaction</span>
        </Button>
      </Link>
    </div>
  )
}

