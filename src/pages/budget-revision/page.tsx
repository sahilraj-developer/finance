"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Printer, Save, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample data for demonstration
const incomeItems = [
  {
    code: "110",
    name: "Property Tax",
    original: 4500000,
    revised: 4800000,
    justification: "Higher collection efficiency due to new online payment system",
  },
  {
    code: "120",
    name: "Water Tax",
    original: 2000000,
    revised: 2200000,
    justification: "Additional connections in Ward 5 & 7",
  },
  {
    code: "130",
    name: "License Fees",
    original: 1500000,
    revised: 1400000,
    justification: "Decrease due to fewer new business registrations",
  },
  {
    code: "140",
    name: "Rent from Municipal Properties",
    original: 1200000,
    revised: 1200000,
    justification: "No change",
  },
  {
    code: "150",
    name: "State Government Grants",
    original: 10000000,
    revised: 10500000,
    justification: "Additional grant for Smart City project",
  },
]

const expenditureItems = [
  {
    code: "210",
    name: "Salaries & Allowances",
    original: 8000000,
    revised: 8200000,
    justification: "New hires in Engineering department",
  },
  {
    code: "220",
    name: "Office Expenses",
    original: 1500000,
    revised: 1600000,
    justification: "Increased utility costs",
  },
  {
    code: "230",
    name: "Road Maintenance",
    original: 3500000,
    revised: 4000000,
    justification: "Emergency repairs after monsoon damage",
  },
  {
    code: "240",
    name: "Street Lighting",
    original: 1200000,
    revised: 1100000,
    justification: "Savings from LED conversion",
  },
  {
    code: "250",
    name: "Public Health Services",
    original: 5000000,
    revised: 5200000,
    justification: "Additional medical camps in underserved areas",
  },
]


// getall api

// post data


// {
//   "code": "string",           
//   "name": "string",           
//   "original": "number",       
//   "revised": "number",        
//   "justification": "string"   
// }


export default function BudgetRevision() {
  const [revisionReason, setRevisionReason] = useState("")

  // Calculate totals
  const totalOriginalIncome = incomeItems.reduce((sum, item) => sum + item.original, 0)
  const totalRevisedIncome = incomeItems.reduce((sum, item) => sum + item.revised, 0)
  const totalOriginalExpenditure = expenditureItems.reduce((sum, item) => sum + item.original, 0)
  const totalRevisedExpenditure = expenditureItems.reduce((sum, item) => sum + item.revised, 0)

  const originalBalance = totalOriginalIncome - totalOriginalExpenditure
  const revisedBalance = totalRevisedIncome - totalRevisedExpenditure

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Budget Revision - Ranchi Municipal Corporation - 2023-24</h1>
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

      {/* Revision Reason */}
      <Card>
        <CardHeader>
          <CardTitle>Reason for Budget Revision</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter the primary reason for budget revision..."
            value={revisionReason}
            onChange={(e) => setRevisionReason(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Budget Summary Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Original Budget</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Income:</span>
                  <span className="font-medium">₹{totalOriginalIncome.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Expenditure:</span>
                  <span className="font-medium">₹{totalOriginalExpenditure.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance:</span>
                  <span
                    className={`font-medium ${originalBalance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    ₹{originalBalance.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Revised Budget</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Income:</span>
                  <span className="font-medium">₹{totalRevisedIncome.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Expenditure:</span>
                  <span className="font-medium">₹{totalRevisedExpenditure.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance:</span>
                  <span
                    className={`font-medium ${revisedBalance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    ₹{revisedBalance.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Variance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Income Variance:</span>
                  <span
                    className={`font-medium ${totalRevisedIncome - totalOriginalIncome >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {totalRevisedIncome - totalOriginalIncome >= 0 ? "+" : ""}₹
                    {(totalRevisedIncome - totalOriginalIncome).toLocaleString("en-IN")}(
                    {(((totalRevisedIncome - totalOriginalIncome) / totalOriginalIncome) * 100).toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expenditure Variance:</span>
                  <span
                    className={`font-medium ${totalRevisedExpenditure - totalOriginalExpenditure <= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {totalRevisedExpenditure - totalOriginalExpenditure >= 0 ? "+" : ""}₹
                    {(totalRevisedExpenditure - totalOriginalExpenditure).toLocaleString("en-IN")}(
                    {(((totalRevisedExpenditure - totalOriginalExpenditure) / totalOriginalExpenditure) * 100).toFixed(
                      2,
                    )}
                    %)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance Variance:</span>
                  <span
                    className={`font-medium ${revisedBalance - originalBalance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {revisedBalance - originalBalance >= 0 ? "+" : ""}₹
                    {(revisedBalance - originalBalance).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="income" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="income">Income Revision</TabsTrigger>
          <TabsTrigger value="expenditure">Expenditure Revision</TabsTrigger>
        </TabsList>

        {/* Income Revision */}
        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Income Budget Revision
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Code</TableHead>
                    <TableHead className="w-[200px]">Account Name</TableHead>
                    <TableHead className="w-[150px]">Original (₹)</TableHead>
                    <TableHead className="w-[150px]">Revised (₹)</TableHead>
                    <TableHead className="w-[100px]">Variance (%)</TableHead>
                    <TableHead>Justification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeItems.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell>{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.original.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.revised} className="w-full" />
                      </TableCell>
                      <TableCell
                        className={`${
                          item.revised > item.original
                            ? "text-green-600 dark:text-green-400"
                            : item.revised < item.original
                              ? "text-red-600 dark:text-red-400"
                              : ""
                        }`}
                      >
                        {item.revised === item.original
                          ? "0.00%"
                          : `${item.revised > item.original ? "+" : ""}${(((item.revised - item.original) / item.original) * 100).toFixed(2)}%`}
                      </TableCell>
                      <TableCell>
                        <Textarea defaultValue={item.justification} className="min-h-[40px] h-[40px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={2} className="font-bold">
                      Total Income
                    </TableCell>
                    <TableCell className="font-bold">₹{totalOriginalIncome.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="font-bold">₹{totalRevisedIncome.toLocaleString("en-IN")}</TableCell>
                    <TableCell
                      className={`font-bold ${
                        totalRevisedIncome > totalOriginalIncome
                          ? "text-green-600 dark:text-green-400"
                          : totalRevisedIncome < totalOriginalIncome
                            ? "text-red-600 dark:text-red-400"
                            : ""
                      }`}
                    >
                      {totalRevisedIncome === totalOriginalIncome
                        ? "0.00%"
                        : `${totalRevisedIncome > totalOriginalIncome ? "+" : ""}${(((totalRevisedIncome - totalOriginalIncome) / totalOriginalIncome) * 100).toFixed(2)}%`}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenditure Revision */}
        <TabsContent value="expenditure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Expenditure Budget Revision
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Code</TableHead>
                    <TableHead className="w-[200px]">Account Name</TableHead>
                    <TableHead className="w-[150px]">Original (₹)</TableHead>
                    <TableHead className="w-[150px]">Revised (₹)</TableHead>
                    <TableHead className="w-[100px]">Variance (%)</TableHead>
                    <TableHead>Justification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenditureItems.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell>{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.original.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.revised} className="w-full" />
                      </TableCell>
                      <TableCell
                        className={`${
                          item.revised < item.original
                            ? "text-green-600 dark:text-green-400"
                            : item.revised > item.original
                              ? "text-red-600 dark:text-red-400"
                              : ""
                        }`}
                      >
                        {item.revised === item.original
                          ? "0.00%"
                          : `${item.revised > item.original ? "+" : ""}${(((item.revised - item.original) / item.original) * 100).toFixed(2)}%`}
                      </TableCell>
                      <TableCell>
                        <Textarea defaultValue={item.justification} className="min-h-[40px] h-[40px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={2} className="font-bold">
                      Total Expenditure
                    </TableCell>
                    <TableCell className="font-bold">₹{totalOriginalExpenditure.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="font-bold">₹{totalRevisedExpenditure.toLocaleString("en-IN")}</TableCell>
                    <TableCell
                      className={`font-bold ${
                        totalRevisedExpenditure < totalOriginalExpenditure
                          ? "text-green-600 dark:text-green-400"
                          : totalRevisedExpenditure > totalOriginalExpenditure
                            ? "text-red-600 dark:text-red-400"
                            : ""
                      }`}
                    >
                      {totalRevisedExpenditure === totalOriginalExpenditure
                        ? "0.00%"
                        : `${totalRevisedExpenditure > totalOriginalExpenditure ? "+" : ""}${(((totalRevisedExpenditure - totalOriginalExpenditure) / totalOriginalExpenditure) * 100).toFixed(2)}%`}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Validation Alert */}
      {revisedBalance < 0 && (
        <Alert variant="destructive">
          <AlertTitle>Budget Validation Failed</AlertTitle>
          <AlertDescription>
            The revised budget is showing a deficit. Please adjust income or expenditure to ensure a balanced or surplus
            budget.
          </AlertDescription>
        </Alert>
      )}

      {/* Compare with Original Button */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Compare with Original Budget
        </Button>
      </div>

      {/* Workflow Status */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm py-1 px-3">
              Draft Revision
            </Badge>
            <div className="text-sm text-muted-foreground">
              Prepared by: Rajesh Kumar, Finance Officer | Last Updated: 15 September 2023
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Submit for Approval
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

