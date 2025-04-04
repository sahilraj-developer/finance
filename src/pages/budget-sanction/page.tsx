"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Download, FileText, History, Printer, ThumbsDown, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample data for demonstration
const budgetSummary = {
  year: "2023-24",
  municipality: "Ranchi Municipal Corporation",
  preparedBy: "Rajesh Kumar",
  preparedOn: "15 March 2023",
  totalIncome: 19200000,
  totalExpenditure: 19200000,
  balance: 0,
  status: "pending",
}

const incomeCategories = [
  { name: "Tax Revenue", amount: 8000000 },
  { name: "Non-Tax Revenue", amount: 2700000 },
  { name: "Assigned Revenue & Compensation", amount: 1500000 },
  { name: "Rental Income", amount: 1200000 },
  { name: "Fees & User Charges", amount: 1800000 },
  { name: "Sale & Hire Charges", amount: 500000 },
  { name: "Revenue Grants & Contributions", amount: 3000000 },
  { name: "Other Income", amount: 500000 },
]

const expenditureCategories = [
  { name: "Establishment Expenses", amount: 8000000 },
  { name: "Administrative Expenses", amount: 1500000 },
  { name: "Operations & Maintenance", amount: 3500000 },
  { name: "Interest & Finance Charges", amount: 1000000 },
  { name: "Program Expenses", amount: 2500000 },
  { name: "Revenue Grants & Contributions", amount: 700000 },
  { name: "Capital Expenditure", amount: 2000000 },
]

const auditTrail = [
  {
    id: 1,
    action: "Budget Created",
    user: "Rajesh Kumar",
    role: "Finance Officer",
    date: "15 March 2023",
    comments: "Initial budget draft prepared",
  },
  {
    id: 2,
    action: "Budget Updated",
    user: "Rajesh Kumar",
    role: "Finance Officer",
    date: "18 March 2023",
    comments: "Updated based on ward committee inputs",
  },
  {
    id: 3,
    action: "Submitted for Review",
    user: "Rajesh Kumar",
    role: "Finance Officer",
    date: "20 March 2023",
    comments: "Final draft submitted to Standing Committee",
  },
]

// getall api

// post data

// {
//   "action": "string",      
//   "user": "string",        
//   "role": "string",        
//   "date": "string",        
//   "comments": "string"     
// }


export default function BudgetSanction() {
  const [comments, setComments] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Budget Sanction - {budgetSummary.municipality} - {budgetSummary.year}
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

      {/* Budget Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Financial Year</div>
                <div>{budgetSummary.year}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Prepared By</div>
                <div>{budgetSummary.preparedBy}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Prepared On</div>
                <div>{budgetSummary.preparedOn}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div>
                  <Badge variant="outline" className="uppercase">
                    {budgetSummary.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Total Income</div>
                <div className="font-bold">₹{budgetSummary.totalIncome.toLocaleString("en-IN")}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Total Expenditure</div>
                <div className="font-bold">₹{budgetSummary.totalExpenditure.toLocaleString("en-IN")}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Budget Balance</div>
                <div
                  className={`font-bold ${budgetSummary.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  ₹{budgetSummary.balance.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Budget Type</div>
                <div>
                  <Badge
                    className={
                      budgetSummary.balance >= 0
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }
                  >
                    {budgetSummary.balance > 0 ? "Surplus" : budgetSummary.balance < 0 ? "Deficit" : "Balanced"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Details Tabs */}
      <Tabs defaultValue="income" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income">Income Details</TabsTrigger>
          <TabsTrigger value="expenditure">Expenditure Details</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        {/* Income Details */}
        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Income Budget Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%]">Category</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-right">{category.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-right">
                        {((category.amount / budgetSummary.totalIncome) * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30">
                    <TableCell className="font-bold">Total Income</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹{budgetSummary.totalIncome.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right font-bold">100.00%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Income Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Income Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Pie chart showing income distribution by category
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenditure Details */}
        <TabsContent value="expenditure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Expenditure Budget Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%]">Category</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenditureCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-right">{category.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-right">
                        {((category.amount / budgetSummary.totalExpenditure) * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30">
                    <TableCell className="font-bold">Total Expenditure</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹{budgetSummary.totalExpenditure.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right font-bold">100.00%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Expenditure Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Expenditure Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Pie chart showing expenditure distribution by category
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Trail */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="mr-2 h-5 w-5" />
                Budget Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {auditTrail.map((entry) => (
                  <div key={entry.id} className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {entry.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{entry.action}</span>
                        <Badge variant="outline" className="text-xs">
                          {entry.date}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        By {entry.user} ({entry.role})
                      </div>
                      <div className="text-sm">{entry.comments}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approval Section */}
      <Card>
        <CardHeader>
          <CardTitle>Standing Committee Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Enter your comments or feedback on the budget proposal..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4" />
            <span>Digital signatures will be recorded for audit purposes</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline">Review Budget</Button>
          <div className="flex gap-2">
            <Button variant="destructive">
              <ThumbsDown className="mr-2 h-4 w-4" />
              Reject Budget
            </Button>
            <Button variant="default">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Approve Budget
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Comparison with Revised Budget */}
      <Card>
        <CardHeader>
          <CardTitle>Comparison with Revised Budget (2022-23)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Original Budget (₹)</TableHead>
                <TableHead className="text-right">Revised Budget (₹)</TableHead>
                <TableHead className="text-right">Current Proposal (₹)</TableHead>
                <TableHead className="text-right">% Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Total Income</TableCell>
                <TableCell className="text-right">18,000,000</TableCell>
                <TableCell className="text-right">18,500,000</TableCell>
                <TableCell className="text-right">{budgetSummary.totalIncome.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right text-green-600 dark:text-green-400">+3.78%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total Expenditure</TableCell>
                <TableCell className="text-right">17,800,000</TableCell>
                <TableCell className="text-right">18,300,000</TableCell>
                <TableCell className="text-right">{budgetSummary.totalExpenditure.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right text-green-600 dark:text-green-400">+4.92%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Budget Balance</TableCell>
                <TableCell className="text-right">200,000</TableCell>
                <TableCell className="text-right">200,000</TableCell>
                <TableCell className="text-right">{budgetSummary.balance.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right text-red-600 dark:text-red-400">-100.00%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

