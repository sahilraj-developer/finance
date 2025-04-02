"use client"

import { AlertDescription } from "@/components/ui/alert"

import { AlertTitle } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download, FileText, Printer, Save, Send, Upload, X, AlertCircle, BarChart } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Sample data for demonstration
const expenditureTypes = [
  { value: "capital", label: "Capital Expenditure" },
  { value: "revenue", label: "Revenue Expenditure" },
  { value: "maintenance", label: "Maintenance Expenditure" },
  { value: "development", label: "Development Expenditure" },
]

const departments = [
  { value: "admin", label: "General Administration" },
  { value: "engineering", label: "Engineering & Public Works" },
  { value: "health", label: "Health & Sanitation" },
  { value: "revenue", label: "Revenue" },
  { value: "water", label: "Water Supply" },
  { value: "urban", label: "Urban Poverty Alleviation" },
  { value: "planning", label: "Town Planning" },
]

const budgetHeads = [
  {
    value: "21",
    label: "21 - Establishment Expenses",
    budget: 2500000,
    spent: 1200000,
    committed: 300000,
  },
  {
    value: "22",
    label: "22 - Administrative Expenses",
    budget: 1800000,
    spent: 900000,
    committed: 200000,
  },
  {
    value: "23",
    label: "23 - Operations & Maintenance",
    budget: 3200000,
    spent: 1500000,
    committed: 400000,
  },
  {
    value: "24",
    label: "24 - Interest & Finance Charges",
    budget: 1500000,
    spent: 600000,
    committed: 100000,
  },
  {
    value: "41",
    label: "41 - Fixed Assets",
    budget: 4000000,
    spent: 1800000,
    committed: 500000,
  },
]

const supportingDocuments = [
  { id: 1, name: "Invoice_12345.pdf", type: "Invoice", uploadDate: "2023-04-01", size: "1.2 MB" },
  { id: 2, name: "WorkOrder_789.pdf", type: "Work Order", uploadDate: "2023-03-25", size: "0.8 MB" },
  { id: 3, name: "Quotation_XYZ.pdf", type: "Quotation", uploadDate: "2023-03-20", size: "0.5 MB" },
]

const recentExpenditures = [
  {
    id: "E001",
    date: "2023-04-01",
    type: "Capital",
    department: "Engineering",
    budgetHead: "4217 - Capital Outlay on Urban Development",
    amount: 250000,
    status: "approved",
  },
  {
    id: "E002",
    date: "2023-04-01",
    type: "Revenue",
    department: "Administration",
    budgetHead: "2059 - Public Works",
    amount: 75000,
    status: "approved",
  },
  {
    id: "E003",
    date: "2023-04-02",
    type: "Maintenance",
    department: "Health",
    budgetHead: "2215 - Water Supply & Sanitation",
    amount: 120000,
    status: "pending",
  },
  {
    id: "E004",
    date: "2023-04-03",
    type: "Development",
    department: "Engineering",
    budgetHead: "2217 - Urban Development",
    amount: 350000,
    status: "approved",
  },
  {
    id: "E005",
    date: "2023-04-04",
    type: "Revenue",
    department: "Education",
    budgetHead: "3604 - Compensation to Local Bodies",
    amount: 180000,
    status: "rejected",
  },
]

export default function ExpenditureManagement() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedExpenditureType, setSelectedExpenditureType] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedBudgetHead, setSelectedBudgetHead] = useState("")
  const [amount, setAmount] = useState<string>("0")

  // Get selected budget head details
  const selectedBudgetHeadDetails = budgetHeads.find((head) => head.value === selectedBudgetHead)

  // Calculate available budget
  const budgetTotal = selectedBudgetHeadDetails?.budget || 0
  const budgetSpent = selectedBudgetHeadDetails?.spent || 0
  const budgetCommitted = selectedBudgetHeadDetails?.committed || 0
  const budgetAvailable = budgetTotal - budgetSpent - budgetCommitted

  // Check if expenditure exceeds budget
  const exceedsBudget = Number.parseFloat(amount) > budgetAvailable

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Expenditure Management - Ranchi Municipal Corporation (Form GEN-6)
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="new-expenditure" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new-expenditure">New Expenditure</TabsTrigger>
          <TabsTrigger value="expenditure-list">Expenditure List</TabsTrigger>
          <TabsTrigger value="budget-tracking">Budget Tracking</TabsTrigger>
        </TabsList>

        {/* New Expenditure Tab */}
        <TabsContent value="new-expenditure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Record New Expenditure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expenditure-type">Expenditure Type</Label>
                  <Select value={selectedExpenditureType} onValueChange={setSelectedExpenditureType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expenditure type" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenditureTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                </div>
              </div>

              {selectedBudgetHead && (
                <Card className="bg-muted/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2">Budget Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Total Budget:</span>
                        <span className="font-medium">₹{budgetTotal.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Spent:</span>
                        <span className="font-medium">₹{budgetSpent.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Committed:</span>
                        <span className="font-medium">₹{budgetCommitted.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span>Available:</span>
                        <span>₹{budgetAvailable.toLocaleString("en-IN")}</span>
                      </div>
                      <Progress value={((budgetSpent + budgetCommitted) / budgetTotal) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>Utilized: {(((budgetSpent + budgetCommitted) / budgetTotal) * 100).toFixed(1)}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                As per JMAM Rule 6.3: All expenditures must be within the approved budget allocation for the respective
                head
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expenditure-date">Expenditure Date</Label>
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
                  <Input id="voucher-no" placeholder="Enter voucher number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payee-name">Payee Name</Label>
                  <Input id="payee-name" placeholder="Enter payee name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-order-no">Work Order/Supply Order Number</Label>
                  <Input id="work-order-no" placeholder="RMC/WO/2023-24/0001" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenditure-details">Details of Expenditure</Label>
                <Textarea id="expenditure-details" placeholder="Enter detailed description of the expenditure" />
              </div>

              {/* Supporting Documents */}
              <div className="space-y-2">
                <Label>Supporting Documents</Label>
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
              </div>

              {/* Budget Warning */}
              {exceedsBudget && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Budget Limit Exceeded</AlertTitle>
                  <AlertDescription>
                    The expenditure amount exceeds the available budget balance for the selected budget head. Please
                    adjust the amount or select a different budget head.
                  </AlertDescription>
                </Alert>
              )}
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
                  Print Payment Order
                </Button>
                <Button disabled={exceedsBudget}>
                  <Send className="mr-2 h-4 w-4" />
                  Record Expenditure
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Expenditure List Tab */}
        <TabsContent value="expenditure-list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Recent Expenditures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Budget Head</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentExpenditures.map((expenditure) => (
                    <TableRow key={expenditure.id}>
                      <TableCell className="font-medium">{expenditure.id}</TableCell>
                      <TableCell>{expenditure.date}</TableCell>
                      <TableCell>{expenditure.type}</TableCell>
                      <TableCell>{expenditure.department}</TableCell>
                      <TableCell>{expenditure.budgetHead}</TableCell>
                      <TableCell className="text-right">{expenditure.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            expenditure.status === "approved"
                              ? "outline"
                              : expenditure.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {expenditure.status.charAt(0).toUpperCase() + expenditure.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
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

        {/* Budget Tracking Tab */}
        <TabsContent value="budget-tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Budget vs Actual Expenditure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetHeads.map((head) => (
                  <div key={head.value} className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{head.label}</h3>
                      <div className="text-sm text-muted-foreground">
                        Utilized: {(((head.spent + head.committed) / head.budget) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-full">
                        <Progress value={((head.spent + head.committed) / head.budget) * 100} className="h-2" />
                      </div>
                      <div className="min-w-[120px] text-right text-sm">
                        ₹{head.spent.toLocaleString("en-IN")} / ₹{head.budget.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Spent: ₹{head.spent.toLocaleString("en-IN")}</span>
                      <span>Committed: ₹{head.committed.toLocaleString("en-IN")}</span>
                      <span>Available: ₹{(head.budget - head.spent - head.committed).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expenditure Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Line chart showing monthly expenditure trends
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

