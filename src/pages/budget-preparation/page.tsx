"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Info, Printer, Save, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data for demonstration
const funds = [
  { value: "municipal", label: "Municipal Fund" },
  { value: "bsup", label: "Basic Services to Urban Poor Fund" },
  { value: "water", label: "Water Supply Fund" },
  { value: "development", label: "Development Fund" },
]

const departments = [
  { value: "admin", label: "Administration" },
  { value: "engineering", label: "Engineering" },
  { value: "health", label: "Health & Sanitation" },
  { value: "revenue", label: "Revenue" },
  { value: "education", label: "Education" },
]

const majorHeads = [
  { value: "100", label: "100 - General Administration" },
  { value: "200", label: "200 - Public Works" },
  { value: "300", label: "300 - Public Health" },
  { value: "400", label: "400 - Water Supply" },
  { value: "500", label: "500 - Education" },
]

const incomeItems = [
  {
    code: "110",
    name: "Property Tax",
    estimated: 4500000,
    actual: 4200000,
    remarks: "Expected 7% increase based on new assessments",
  },
  {
    code: "120",
    name: "Water Tax",
    estimated: 2000000,
    actual: 1800000,
    remarks: "New connections in Ward 5 & 7",
  },
  {
    code: "130",
    name: "License Fees",
    estimated: 1500000,
    actual: 1450000,
    remarks: "Revised fee structure",
  },
  {
    code: "140",
    name: "Rent from Municipal Properties",
    estimated: 1200000,
    actual: 1100000,
    remarks: "New rental agreements",
  },
  {
    code: "150",
    name: "State Government Grants",
    estimated: 10000000,
    actual: 10000000,
    remarks: "As per state allocation",
  },
]

const expenditureItems = [
  {
    code: "210",
    name: "Salaries & Allowances",
    estimated: 8000000,
    actual: 7800000,
    remarks: "Including 5% DA increase",
  },
  {
    code: "220",
    name: "Office Expenses",
    estimated: 1500000,
    actual: 1400000,
    remarks: "New IT equipment",
  },
  {
    code: "230",
    name: "Road Maintenance",
    estimated: 3500000,
    actual: 3200000,
    remarks: "Priority for Ward 3 & 9",
  },
  {
    code: "240",
    name: "Street Lighting",
    estimated: 1200000,
    actual: 1100000,
    remarks: "LED replacement program",
  },
  {
    code: "250",
    name: "Public Health Services",
    estimated: 5000000,
    actual: 4800000,
    remarks: "New health center in Ward 12",
  },
]

// getall api

// post data

// {
//   "code": "string",         
//   "name": "string",        
//   "estimated": "number",   
//   "actual": "number",      
//   "remarks": "string"       
// }



export default function BudgetPreparation() {
  const [selectedFund, setSelectedFund] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedMajorHead, setSelectedMajorHead] = useState("")
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false)
  const [expenditureDialogOpen, setExpenditureDialogOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to ensure we're running on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculate totals
  const totalIncome = incomeItems.reduce((sum, item) => sum + item.estimated, 0)
  const totalExpenditure = expenditureItems.reduce((sum, item) => sum + item.estimated, 0)
  const budgetBalance = totalIncome - totalExpenditure

  if (!isClient) {
    return null // Return null on server-side to prevent hydration mismatch
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Budget Preparation - Ranchi Municipal Corporation - 2023-24
        </h1>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fund">Select Fund</Label>
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
          <Label htmlFor="department">Select Department</Label>
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
          <Label htmlFor="major-head">Major Head of Account</Label>
          <Select value={selectedMajorHead} onValueChange={setSelectedMajorHead}>
            <SelectTrigger>
              <SelectValue placeholder="Select major head" />
            </SelectTrigger>
            <SelectContent>
              {majorHeads.map((head) => (
                <SelectItem key={head.value} value={head.value}>
                  {head.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold">Previous Year Budget Summary (2022-23)</h2>
          <p className="text-sm text-muted-foreground">Reference for current budget preparation</p>
        </div>
        <div className="flex gap-6">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Total Income</div>
            <div className="text-lg font-bold">₹{(totalIncome - 1000000).toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Total Expenditure</div>
            <div className="text-lg font-bold">₹{(totalExpenditure - 800000).toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Balance</div>
            <div className="text-lg font-bold">
              ₹{(totalIncome - totalExpenditure - 200000).toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="income" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="income">Income Budget</TabsTrigger>
          <TabsTrigger value="expenditure">Expenditure Budget</TabsTrigger>
        </TabsList>

        {/* Income Budget */}
        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Income Budget Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Code</TableHead>
                    <TableHead className="w-[250px]">Account Name</TableHead>
                    <TableHead className="w-[180px]">
                      <div className="flex items-center">
                        Actual (Previous Year)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Actual amount from previous financial year</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead className="w-[180px]">
                      <div className="flex items-center">
                        Estimated Amount
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Estimated amount for current financial year</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeItems.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell>{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>₹{item.actual.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.estimated} className="w-full" />
                      </TableCell>
                      <TableCell>
                        <Textarea defaultValue={item.remarks} className="min-h-[40px] h-[40px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={2} className="font-bold">
                      Total Income
                    </TableCell>
                    <TableCell className="font-bold">
                      ₹{incomeItems.reduce((sum, item) => sum + item.actual, 0).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="font-bold">₹{totalIncome.toLocaleString("en-IN")}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" onClick={() => setIncomeDialogOpen(true)}>
                Add Income Item
              </Button>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Expenditure Budget */}
        <TabsContent value="expenditure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Expenditure Budget Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Code</TableHead>
                    <TableHead className="w-[250px]">Account Name</TableHead>
                    <TableHead className="w-[180px]">
                      <div className="flex items-center">
                        Actual (Previous Year)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Actual amount from previous financial year</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead className="w-[180px]">
                      <div className="flex items-center">
                        Estimated Amount
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Estimated amount for current financial year</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenditureItems.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell>{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>₹{item.actual.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.estimated} className="w-full" />
                      </TableCell>
                      <TableCell>
                        <Textarea defaultValue={item.remarks} className="min-h-[40px] h-[40px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={2} className="font-bold">
                      Total Expenditure
                    </TableCell>
                    <TableCell className="font-bold">
                      ₹{expenditureItems.reduce((sum, item) => sum + item.actual, 0).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="font-bold">₹{totalExpenditure.toLocaleString("en-IN")}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" onClick={() => setExpenditureDialogOpen(true)}>
                Add Expenditure Item
              </Button>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Budget Balance */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-sm font-medium text-muted-foreground">Total Income</div>
            <div className="text-xl font-bold">₹{totalIncome.toLocaleString("en-IN")}</div>
          </div>

          <div className="flex flex-col items-center gap-1 my-4 md:my-0">
            <div className="text-sm font-medium text-muted-foreground">Budget Balance</div>
            <div
              className={`text-2xl font-bold ${budgetBalance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              ₹{budgetBalance.toLocaleString("en-IN")}
            </div>
            <Badge
              className={`mt-1 ${budgetBalance >= 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
            >
              {budgetBalance >= 0 ? "Surplus" : "Deficit"}
            </Badge>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-sm font-medium text-muted-foreground">Total Expenditure</div>
            <div className="text-xl font-bold">₹{totalExpenditure.toLocaleString("en-IN")}</div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Alert */}
      {budgetBalance < 0 && (
        <Alert variant="destructive">
          <AlertTitle>Budget Validation Failed</AlertTitle>
          <AlertDescription>
            The budget is showing a deficit. Please adjust income or expenditure to ensure a balanced or surplus budget.
          </AlertDescription>
        </Alert>
      )}

      {/* Workflow Status */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm py-1 px-3">
              Draft
            </Badge>
            <div className="text-sm text-muted-foreground">
              Prepared by: Rajesh Kumar, Finance Officer | Last Updated: 15 March 2023
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Submit for Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Income Dialog */}
      <Dialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Income Budget Item</DialogTitle>
            <DialogDescription>Add a new income item to the budget.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="income-code" className="text-right">
                Code
              </Label>
              <div className="col-span-3">
                <Input id="income-code" placeholder="Enter account code" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="income-name" className="text-right">
                Account Name
              </Label>
              <div className="col-span-3">
                <Input id="income-name" placeholder="Enter account name" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="income-previous" className="text-right">
                Previous Year
              </Label>
              <div className="col-span-3">
                <Input id="income-previous" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="income-estimated" className="text-right">
                Estimated Amount
              </Label>
              <div className="col-span-3">
                <Input id="income-estimated" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="income-remarks" className="text-right">
                Remarks
              </Label>
              <div className="col-span-3">
                <Textarea id="income-remarks" placeholder="Enter remarks" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Income Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expenditure Dialog */}
      <Dialog open={expenditureDialogOpen} onOpenChange={setExpenditureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expenditure Budget Item</DialogTitle>
            <DialogDescription>Add a new expenditure item to the budget.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenditure-code" className="text-right">
                Code
              </Label>
              <div className="col-span-3">
                <Input id="expenditure-code" placeholder="Enter account code" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenditure-name" className="text-right">
                Account Name
              </Label>
              <div className="col-span-3">
                <Input id="expenditure-name" placeholder="Enter account name" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenditure-previous" className="text-right">
                Previous Year
              </Label>
              <div className="col-span-3">
                <Input id="expenditure-previous" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenditure-estimated" className="text-right">
                Estimated Amount
              </Label>
              <div className="col-span-3">
                <Input id="expenditure-estimated" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenditure-remarks" className="text-right">
                Remarks
              </Label>
              <div className="col-span-3">
                <Textarea id="expenditure-remarks" placeholder="Enter remarks" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Expenditure Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

