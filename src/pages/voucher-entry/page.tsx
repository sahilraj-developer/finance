"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Check, ChevronsUpDown, FileText, Upload, Eye, Printer, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for budget heads
const budgetHeads = [
  { value: "2059", label: "2059 - Public Works" },
  { value: "2215", label: "2215 - Water Supply & Sanitation" },
  { value: "2217", label: "2217 - Urban Development" },
  { value: "3604", label: "3604 - Compensation to Local Bodies" },
  { value: "4217", label: "4217 - Capital Outlay on Urban Development" },
]

export default function VoucherEntry() {


  // post
  //   /api/payment-voucher-entry


  // {
  //   "paymentVoucher": {
  //     "voucherNo": "PV/2023-24/0001",
  //     "date": "2023-04-04",
  //     "paymentMode": "bank-transfer",
  //     "payeeName": "John Doe",
  //     "payeeBankAccount": "1234567890",
  //     "budgetHead": "Salaries",
  //     "description": "Payment for employee salaries",
  //     "amount": 50000.00,
  //     "attachments": [
  //       {
  //         "fileName": "invoice1.pdf",
  //         "fileUrl": "https://example.com/invoice1.pdf"
  //       },
  //       {
  //         "fileName": "invoice2.pdf",
  //         "fileUrl": "https://example.com/invoice2.pdf"
  //       }
  //     ],
  //     "tdsApplicable": "yes",
  //     "tdsPercentage": "2",
  //     "pan": "ABCDE1234F"
  //   },
  //   "workflowStatus": [
  //     {
  //       "status": "Created",
  //       "person": "Accountant",
  //       "statusDate": "2023-04-01",
  //       "statusColor": "bg-primary",
  //       "statusIcon": "check"
  //     },
  //     {
  //       "status": "Verified",
  //       "person": "Accounts Officer",
  //       "statusDate": "2023-04-02",
  //       "statusColor": "bg-muted",
  //       "statusIcon": "2"
  //     },
  //     {
  //       "status": "Approved",
  //       "person": "Executive Officer",
  //       "statusDate": "2023-04-03",
  //       "statusColor": "bg-muted",
  //       "statusIcon": "3"
  //     },
  //     {
  //       "status": "Paid",
  //       "person": "Cashier",
  //       "statusDate": "2023-04-04",
  //       "statusColor": "bg-muted",
  //       "statusIcon": "4"
  //     }
  //   ]
  // }
  

// post
  // receipt voucher 


  // {
  //   "receiptVoucher": {
  //     "receiptNo": "RV/2023-24/0001",
  //     "receiptDate": "2023-04-04",
  //     "receiptMode": "bank-transfer",
  //     "payerName": "Jane Doe",
  //     "payerContact": "9876543210",
  //     "purpose": "Property Tax",
  //     "description": "Payment for property tax of 2023-24",
  //     "amount": 10000.00
  //   },
  //   "workflowStatus": [
  //     {
  //       "status": "Created",
  //       "person": "Accountant",
  //       "statusDate": "2023-04-01",
  //       "statusColor": "bg-primary",
  //       "statusIcon": "check"
  //     },
  //     {
  //       "status": "Verified",
  //       "person": "Accounts Officer",
  //       "statusDate": "2023-04-02",
  //       "statusColor": "bg-muted",
  //       "statusIcon": "2"
  //     },
  //     {
  //       "status": "Approved",
  //       "person": "Executive Officer",
  //       "statusDate": "2023-04-03",
  //       "statusColor": "bg-muted",
  //       "statusIcon": "3"
  //     },
  //     {
  //       "status": "Paid",
  //       "person": "Cashier",
  //       "statusDate": "2023-04-04",
  //       "statusColor": "bg-muted",
  //       "statusIcon": "4"
  //     }
  //   ]
  // }
  


// journal voucher 


// {
//   "journalVoucher": {
//     "status": "Form Placeholder",
//     "message": "Journal Voucher form will be displayed here"
//   },
//   "workflowStatus": [
//     {
//       "status": "Created",
//       "person": "Accountant",
//       "statusDate": "2023-04-01",
//       "statusColor": "bg-primary",
//       "statusIcon": "check"
//     },
//     {
//       "status": "Verified",
//       "person": "Accounts Officer",
//       "statusDate": "2023-04-02",
//       "statusColor": "bg-muted",
//       "statusIcon": "2"
//     },
//     {
//       "status": "Approved",
//       "person": "Executive Officer",
//       "statusDate": "2023-04-03",
//       "statusColor": "bg-muted",
//       "statusIcon": "3"
//     },
//     {
//       "status": "Paid",
//       "person": "Cashier",
//       "statusDate": "2023-04-04",
//       "statusColor": "bg-muted",
//       "statusIcon": "4"
//     }
//   ]
// }




// contra voucher 


// {
//   "contraVoucher": {
//     "status": "Form Placeholder",
//     "message": "Contra Voucher form will be displayed here"
//   },
//   "workflowStatus": [
//     {
//       "status": "Created",
//       "person": "Accountant",
//       "statusDate": "2023-04-01",
//       "statusColor": "bg-primary",
//       "statusIcon": "check"
//     },
//     {
//       "status": "Verified",
//       "person": "Accounts Officer",
//       "statusDate": "2023-04-02",
//       "statusColor": "bg-muted",
//       "statusIcon": "2"
//     },
//     {
//       "status": "Approved",
//       "person": "Executive Officer",
//       "statusDate": "2023-04-03",
//       "statusColor": "bg-muted",
//       "statusIcon": "3"
//     },
//     {
//       "status": "Paid",
//       "person": "Cashier",
//       "statusDate": "2023-04-04",
//       "statusColor": "bg-muted",
//       "statusIcon": "4"
//     }
//   ]
// }





// get 
// /api/past-vouchers


// [
//   {
//     "voucherNo": "PV/2023-24/0001",
//     "date": "01/04/2023",
//     "type": "Payment",
//     "description": "Vendor Payment - ABC Suppliers",
//     "amount": 25000.00,
//     "status": "Approved"
//   }
// ]


  const [date, setDate] = useState<Date | undefined>(new Date())
  const [voucherType, setVoucherType] = useState("payment")
  const [open, setOpen] = useState(false)
  const [budgetHead, setBudgetHead] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Voucher Entry System</h1>
      </div>

      <Tabs value={voucherType} onValueChange={setVoucherType} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="payment">Payment (GEN-5)</TabsTrigger>
          <TabsTrigger value="receipt">Receipt (GEN-4)</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="contra">Contra</TabsTrigger>
          <TabsTrigger value="past">Past Vouchers</TabsTrigger>
        </TabsList>

        {/* Payment Voucher */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Payment Voucher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voucher-no">Voucher No.</Label>
                  <Input id="voucher-no" placeholder="PV/2023-24/0001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="rtgs">RTGS/NEFT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payee-name">Payee Name</Label>
                  <Input id="payee-name" placeholder="Enter payee name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payee-bank">Payee Bank Account</Label>
                  <Input id="payee-bank" placeholder="Enter bank account details" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget-head">Budget Head (Rule 4)</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                      {budgetHead
                        ? budgetHeads.find((head) => head.value === budgetHead)?.label
                        : "Select budget head..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search budget head..." />
                      <CommandList>
                        <CommandEmpty>No budget head found.</CommandEmpty>
                        <CommandGroup>
                          {budgetHeads.map((head) => (
                            <CommandItem
                              key={head.value}
                              value={head.value}
                              onSelect={(currentValue) => {
                                setBudgetHead(currentValue === budgetHead ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn("mr-2 h-4 w-4", budgetHead === head.value ? "opacity-100" : "opacity-0")}
                              />
                              {head.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter payment details" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>

              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Bills/Invoices
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Drag and drop files or click to browse</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tds-applicable">TDS Applicable</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tds-percentage">TDS Percentage</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN (for payments &gt;₹50,000)</Label>
                  <Input id="pan" placeholder="Enter PAN" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Cancel</Button>
              <div className="flex gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Submit for Approval</Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Created</p>
                    <p className="text-xs text-muted-foreground">Accountant</p>
                  </div>
                </div>
                <div className="h-0.5 w-12 bg-muted" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Verified</p>
                    <p className="text-xs text-muted-foreground">Accounts Officer</p>
                  </div>
                </div>
                <div className="h-0.5 w-12 bg-muted" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Approved</p>
                    <p className="text-xs text-muted-foreground">Executive Officer</p>
                  </div>
                </div>
                <div className="h-0.5 w-12 bg-muted" />
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Paid</p>
                    <p className="text-xs text-muted-foreground">Cashier</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receipt Voucher */}
        <TabsContent value="receipt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Receipt Voucher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-no">Receipt No.</Label>
                  <Input id="receipt-no" placeholder="RV/2023-24/0001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-date">Date</Label>
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
                  <Label htmlFor="receipt-mode">Receipt Mode</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select receipt mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payer-name">Payer Name</Label>
                  <Input id="payer-name" placeholder="Enter payer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payer-contact">Payer Contact</Label>
                  <Input id="payer-contact" placeholder="Enter contact details" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-purpose">Purpose</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax">Property Tax</SelectItem>
                    <SelectItem value="water">Water Charges</SelectItem>
                    <SelectItem value="license">License Fee</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-description">Description</Label>
                <Textarea id="receipt-description" placeholder="Enter receipt details" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-amount">Amount (₹)</Label>
                <Input id="receipt-amount" type="number" placeholder="0.00" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Cancel</Button>
              <div className="flex gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Generate Receipt</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Journal Voucher */}
        <TabsContent value="journal" className="space-y-4">
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Journal Voucher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Journal Voucher form will be displayed here
              </div>
            </CardContent>
          </Card> */}

<Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Journal Voucher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-no">Receipt No.</Label>
                  <Input id="receipt-no" placeholder="RV/2023-24/0001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-date">Date</Label>
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
                  <Label htmlFor="receipt-mode">Receipt Mode</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select receipt mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payer-name">Payer Name</Label>
                  <Input id="payer-name" placeholder="Enter payer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payer-contact">Payer Contact</Label>
                  <Input id="payer-contact" placeholder="Enter contact details" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-purpose">Purpose</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax">Property Tax</SelectItem>
                    <SelectItem value="water">Water Charges</SelectItem>
                    <SelectItem value="license">License Fee</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-description">Description</Label>
                <Textarea id="receipt-description" placeholder="Enter receipt details" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-amount">Amount (₹)</Label>
                <Input id="receipt-amount" type="number" placeholder="0.00" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Cancel</Button>
              <div className="flex gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Generate Receipt</Button>
              </div>
            </CardFooter>
          </Card>

        </TabsContent>

        {/* Contra Voucher */}
        <TabsContent value="contra" className="space-y-4">
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Contra Voucher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Contra Voucher form will be displayed here
              </div>
            </CardContent>
          </Card> */}


<Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Contra Voucher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-no">Receipt No.</Label>
                  <Input id="receipt-no" placeholder="RV/2023-24/0001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receipt-date">Date</Label>
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
                  <Label htmlFor="receipt-mode">Receipt Mode</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select receipt mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payer-name">Payer Name</Label>
                  <Input id="payer-name" placeholder="Enter payer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payer-contact">Payer Contact</Label>
                  <Input id="payer-contact" placeholder="Enter contact details" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-purpose">Purpose</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax">Property Tax</SelectItem>
                    <SelectItem value="water">Water Charges</SelectItem>
                    <SelectItem value="license">License Fee</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-description">Description</Label>
                <Textarea id="receipt-description" placeholder="Enter receipt details" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt-amount">Amount (₹)</Label>
                <Input id="receipt-amount" type="number" placeholder="0.00" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Cancel</Button>
              <div className="flex gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Generate Receipt</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Add a new TabsContent for past vouchers */}
        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Past Vouchers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search vouchers..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="contra">Contra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voucher No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">PV/2023-24/0001</TableCell>
                    <TableCell>01/04/2023</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Vendor Payment - ABC Suppliers</TableCell>
                    <TableCell className="text-right">25,000.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Approved</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">Print</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RV/2023-24/0001</TableCell>
                    <TableCell>01/04/2023</TableCell>
                    <TableCell>Receipt</TableCell>
                    <TableCell>Property Tax Collection - Ward 5</TableCell>
                    <TableCell className="text-right">15,000.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Approved</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">Print</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">JV/2023-24/0001</TableCell>
                    <TableCell>02/04/2023</TableCell>
                    <TableCell>Journal</TableCell>
                    <TableCell>Depreciation Entry - Q1</TableCell>
                    <TableCell className="text-right">50,000.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">Print</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

