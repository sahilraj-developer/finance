"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download, FileText, Printer, Save, Send, Upload, X, AlertCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for demonstration
const paymentTypes = [
  { value: "vendor", label: "Vendor Payment" },
  { value: "salary", label: "Salary Payment" },
  { value: "advance", label: "Advance Payment" },
  { value: "utility", label: "Utility Payment" },
  { value: "contract", label: "Contract Payment" },
]

const funds = [
  { value: "municipal", label: "Municipal Fund" },
  { value: "water", label: "Water Supply Fund" },
  { value: "sewerage", label: "Sewerage Fund" },
  { value: "development", label: "Development Fund" },
  { value: "slum", label: "Slum Development Fund" },
]

const bankAccounts = [
  { value: "sbi", label: "State Bank of India - 3245678901", balance: 1250000 },
  { value: "bob", label: "Bank of Baroda - 7865432109", balance: 780000 },
  { value: "pnb", label: "Punjab National Bank - 5643219876", balance: 450000 },
]

const budgetHeads = [
  { value: "21", label: "21 - Establishment Expenses", balance: 2500000 },
  { value: "22", label: "22 - Administrative Expenses", balance: 1800000 },
  { value: "23", label: "23 - Operations & Maintenance", balance: 3200000 },
  { value: "24", label: "24 - Interest & Finance Charges", balance: 1500000 },
  { value: "41", label: "41 - Fixed Assets", balance: 4000000 },
]

const supportingDocuments = [
  { id: 1, name: "Invoice_12345.pdf", type: "Invoice", uploadDate: "2023-04-01", size: "1.2 MB" },
  { id: 2, name: "WorkOrder_789.pdf", type: "Work Order", uploadDate: "2023-03-25", size: "0.8 MB" },
  { id: 3, name: "Quotation_XYZ.pdf", type: "Quotation", uploadDate: "2023-03-20", size: "0.5 MB" },
]

const auditTrail = [
  {
    id: 1,
    action: "Payment Created",
    user: "Rajesh Kumar",
    role: "Finance Officer",
    date: "2023-04-01 10:15 AM",
    details: "Payment draft created",
  },
  {
    id: 2,
    action: "Documents Attached",
    user: "Rajesh Kumar",
    role: "Finance Officer",
    date: "2023-04-01 10:20 AM",
    details: "Supporting documents uploaded",
  },
]

export default function PaymentProcessing() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedPaymentType, setSelectedPaymentType] = useState("")
  const [selectedFund, setSelectedFund] = useState("")
  const [selectedBankAccount, setSelectedBankAccount] = useState("")
  const [selectedBudgetHead, setSelectedBudgetHead] = useState("")
  const [amount, setAmount] = useState<string>("0")
  const [tdsRate, setTdsRate] = useState<string>("0")

  // Calculate TDS amount
  const tdsAmount = Number.parseFloat(amount) * (Number.parseFloat(tdsRate) / 100) || 0
  const netAmount = Number.parseFloat(amount) - tdsAmount || 0

  // Get selected budget head balance
  const selectedBudgetHeadDetails = budgetHeads.find((head) => head.value === selectedBudgetHead)
  const budgetBalance = selectedBudgetHeadDetails?.balance || 0

  // Check if payment exceeds budget
  const exceedsBudget = Number.parseFloat(amount) > budgetBalance

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Payment Processing - Ranchi Municipal Corporation (Form GEN-5)
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="payment-details" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payment-details">Payment Details</TabsTrigger>
          <TabsTrigger value="supporting-docs">Supporting Documents</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
        </TabsList>

        {/* Payment Details Tab */}
        <TabsContent value="payment-details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-type">Payment Type</Label>
                  <Select value={selectedPaymentType} onValueChange={setSelectedPaymentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fund">Fund</Label>
                  <Select value={selectedFund} onValueChange={setSelectedFund}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fund" />
                    </SelectTrigger>
                    <SelectContent>
                      {funds.map((fund) => (
                        <SelectItem key={fund.value} value={fund.value}>
                          {fund.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank-account">Bank Account</Label>
                  <Select value={selectedBankAccount} onValueChange={setSelectedBankAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank account" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankAccounts.map((account) => (
                        <SelectItem key={account.value} value={account.value}>
                          {account.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget-head">Budget Head</Label>
                  <Select value={selectedBudgetHead} onValueChange={setSelectedBudgetHead}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget head" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetHeads.map((head) => (
                        <SelectItem key={head.value} value={head.value}>
                          {head.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedBudgetHead && (
                    <div className="text-sm text-muted-foreground">
                      Available Balance: <span className="font-medium">₹{budgetBalance.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-date">Payment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
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

                <div className="space-y-2">
                  <Label htmlFor="voucher-no">Voucher Number</Label>
                  <Input id="voucher-no" placeholder="RMC/PV/2023-24/0001" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payee-name">Payee Name</Label>
                  <Input id="payee-name" placeholder="Enter payee name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference-no">Reference Number</Label>
                  <Input id="reference-no" placeholder="Invoice/Work Order Number" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tds-rate">TDS Rate (%)</Label>
                  <Input
                    id="tds-rate"
                    type="number"
                    placeholder="0.00"
                    value={tdsRate}
                    onChange={(e) => setTdsRate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cheque-no">Cheque Number/Transaction ID</Label>
                  <Input id="cheque-no" placeholder="Enter cheque number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea id="remarks" placeholder="Enter payment details or remarks" />
              </div>

              {/* Payment Summary */}
              <Card className="bg-muted/20">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-2">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Gross Amount:</span>
                      <span className="font-medium">
                        ₹
                        {Number.parseFloat(amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>TDS Amount ({tdsRate}%):</span>
                      <span className="font-medium">
                        ₹{tdsAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Net Payable Amount:</span>
                      <span>
                        ₹{netAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Warning */}
              {exceedsBudget && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Budget Limit Exceeded</AlertTitle>
                  <AlertDescription>
                    The payment amount exceeds the available budget balance for the selected budget head. Please adjust
                    the amount or select a different budget head.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Cancel</Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Payment Order
                </Button>
                <Button disabled={exceedsBudget}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Approval
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Supporting Documents Tab */}
        <TabsContent value="supporting-docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Supporting Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-dashed rounded-lg p-4 text-center">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Drag and drop files or click to browse. Supported formats: PDF, JPG, PNG (Max: 5MB)
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportingDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit-trail" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditTrail.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.action}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell>{entry.role}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Workflow Status */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm py-1 px-3">
              Draft
            </Badge>
            <div className="text-sm text-muted-foreground">
              Created by: Rajesh Kumar, Finance Officer | Last Updated: 1 April 2023
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Workflow Status: <Badge variant="outline">Pending Approval</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-muted-foreground mt-2">
        As per JMAM Rule 5.2: All payments must be approved by the authorized signatory before disbursement
      </div>
    </div>
  )
}

