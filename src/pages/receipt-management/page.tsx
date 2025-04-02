"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download, FileText, Printer, Save, Search } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for demonstration
const paymentModes = [
  { value: "cash", label: "Cash" },
  { value: "cheque", label: "Cheque" },
  { value: "online", label: "Online Transfer" },
  { value: "upi", label: "UPI" },
  { value: "card", label: "Card Payment" },
]

const revenueHeads = [
  { value: "110-01", label: "110-01 - Property Tax" },
  { value: "110-02", label: "110-02 - Water Tax/User Charges" },
  { value: "110-03", label: "110-03 - Advertisement Tax" },
  { value: "110-04", label: "110-04 - License Fee" },
  { value: "110-05", label: "110-05 - Rent from Municipal Properties" },
  { value: "110-06", label: "110-06 - Building Permission Fee" },
  { value: "140-01", label: "140-01 - Assigned Revenues & Compensation" },
]

const receiptItems = [
  {
    id: "R001",
    date: "2023-04-01",
    from: "Ramesh Patel",
    amount: 15000,
    mode: "Cash",
    head: "Property Tax",
    status: "completed",
  },
  {
    id: "R002",
    date: "2023-04-01",
    from: "Suresh Kumar",
    amount: 5000,
    mode: "Cheque",
    head: "Water Tax",
    status: "completed",
  },
  {
    id: "R003",
    date: "2023-04-01",
    from: "Priya Sharma",
    amount: 25000,
    mode: "Online Transfer",
    head: "Building Permit Fee",
    status: "completed",
  },
  {
    id: "R004",
    date: "2023-04-01",
    from: "Ajay Singh",
    amount: 7500,
    mode: "UPI",
    head: "License Fee",
    status: "completed",
  },
  {
    id: "R005",
    date: "2023-04-01",
    from: "Neha Gupta",
    amount: 12000,
    mode: "Cheque",
    head: "Rent from Municipal Properties",
    status: "pending",
  },
]

const dishonoredCheques = [
  {
    id: "C001",
    receiptNo: "R002",
    date: "2023-04-05",
    from: "Suresh Kumar",
    amount: 5000,
    chequeNo: "123456",
    reason: "Insufficient Funds",
  },
  {
    id: "C002",
    receiptNo: "R005",
    date: "2023-04-08",
    from: "Neha Gupta",
    amount: 12000,
    chequeNo: "789012",
    reason: "Payment Stopped",
  },
]

export default function ReceiptManagement() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("")
  const [selectedRevenueHead, setSelectedRevenueHead] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Calculate daily collection
  const dailyCollection = receiptItems
    .filter((item) => item.status === "completed")
    .reduce((sum, item) => sum + item.amount, 0)

  // Filter receipts based on search term
  const filteredReceipts = receiptItems.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.head.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Receipt Management - Ranchi Municipal Corporation (Form GEN-4)
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="new-receipt" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new-receipt">New Receipt</TabsTrigger>
          <TabsTrigger value="receipt-list">Receipt List</TabsTrigger>
          <TabsTrigger value="dishonored-cheques">Dishonored Cheques</TabsTrigger>
        </TabsList>

        {/* New Receipt Tab */}
        <TabsContent value="new-receipt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Generate New Receipt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-no">Receipt Number</Label>
                  <Input id="receipt-no" value="RMC/RV/2023-24/0006" readOnly className="bg-muted" />
                  <p className="text-xs text-muted-foreground">Auto-generated receipt number</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receipt-date">Receipt Date</Label>
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
                  <Label htmlFor="payment-mode">Payment Mode</Label>
                  <Select value={selectedPaymentMode} onValueChange={setSelectedPaymentMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="received-from">Received From</Label>
                  <Input id="received-from" placeholder="Enter name of payer" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Received (₹)</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
              </div>

              {selectedPaymentMode === "cheque" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cheque-no">Cheque Number</Label>
                    <Input id="cheque-no" placeholder="Enter cheque number" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" placeholder="Enter bank name" />
                  </div>
                </div>
              )}

              {(selectedPaymentMode === "online" || selectedPaymentMode === "upi") && (
                <div className="space-y-2">
                  <Label htmlFor="transaction-id">Transaction ID</Label>
                  <Input id="transaction-id" placeholder="Enter transaction ID" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="revenue-head">Revenue Head</Label>
                <Select value={selectedRevenueHead} onValueChange={setSelectedRevenueHead}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue head" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueHeads.map((head) => (
                      <SelectItem key={head.value} value={head.value}>
                        {head.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea id="remarks" placeholder="Enter additional details or remarks" />
              </div>

              {/* Receipt Details Table */}
              <div className="space-y-2">
                <Label>Receipt Details</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input placeholder="Enter description" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" placeholder="0.00" className="text-right" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Add Item
                        </Button>
                      </TableCell>
                      <TableCell className="text-right"></TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/30">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">₹0.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                As per JMAM Rule 4.1: All receipts must be recorded in the system on the same day and a printed receipt
                must be provided to the payer
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Cancel</Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Receipt
                </Button>
                <Button>Generate Receipt</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Receipt List Tab */}
        <TabsContent value="receipt-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Receipt List
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search receipts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Card className="bg-muted/20 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Daily Collection</h3>
                    <p className="text-2xl font-bold">₹{dailyCollection.toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Total Receipts</h3>
                    <p className="text-2xl font-bold">{receiptItems.length}</p>
                  </div>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Received From</TableHead>
                    <TableHead>Revenue Head</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.id}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.from}</TableCell>
                      <TableCell>{receipt.head}</TableCell>
                      <TableCell>{receipt.mode}</TableCell>
                      <TableCell className="text-right">{receipt.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Badge variant={receipt.status === "completed" ? "outline" : "secondary"}>
                          {receipt.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
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

        {/* Dishonored Cheques Tab */}
        <TabsContent value="dishonored-cheques" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Dishonored Cheques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Receipt No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Received From</TableHead>
                    <TableHead>Cheque No.</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dishonoredCheques.map((cheque) => (
                    <TableRow key={cheque.id}>
                      <TableCell className="font-medium">{cheque.id}</TableCell>
                      <TableCell>{cheque.receiptNo}</TableCell>
                      <TableCell>{cheque.date}</TableCell>
                      <TableCell>{cheque.from}</TableCell>
                      <TableCell>{cheque.chequeNo}</TableCell>
                      <TableCell>{cheque.reason}</TableCell>
                      <TableCell className="text-right">{cheque.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Process Recovery
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

