"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"

export default function FinancialStatements() {
  const [period, setPeriod] = useState("current")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Financial Statements Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export to JMAPG Format
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="grid gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Year (2023-24)</SelectItem>
              <SelectItem value="previous">Previous Year (2022-23)</SelectItem>
              <SelectItem value="comparative">Comparative View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="balance-sheet" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="income-expenditure">Income & Expenditure</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow Statement</TabsTrigger>
        </TabsList>

        {/* Balance Sheet */}
        <TabsContent value="balance-sheet" className="space-y-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Balance Sheet (Rule 1g)</CardTitle>
              <p className="text-sm text-muted-foreground">As on 31st March, 2024</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assets Side */}
                <Card>
                  <CardHeader className="bg-muted/40">
                    <CardTitle className="text-lg">Assets</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Particulars</TableHead>
                          <TableHead className="text-right">Amount (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Fixed Assets</TableCell>
                          <TableCell className="text-right">2,60,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Land & Buildings</TableCell>
                          <TableCell className="text-right">1,80,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Infrastructure Assets</TableCell>
                          <TableCell className="text-right">65,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Plant & Machinery</TableCell>
                          <TableCell className="text-right">15,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Current Assets</TableCell>
                          <TableCell className="text-right">1,40,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Cash & Bank Balances</TableCell>
                          <TableCell className="text-right">85,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Loans & Advances</TableCell>
                          <TableCell className="text-right">25,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Receivables</TableCell>
                          <TableCell className="text-right">30,00,000</TableCell>
                        </TableRow>
                        <TableRow className="bg-muted/30">
                          <TableCell className="font-bold">Total Assets</TableCell>
                          <TableCell className="text-right font-bold">4,00,00,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Liabilities Side */}
                <Card>
                  <CardHeader className="bg-muted/40">
                    <CardTitle className="text-lg">Liabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Particulars</TableHead>
                          <TableHead className="text-right">Amount (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Reserves & Surplus</TableCell>
                          <TableCell className="text-right">2,50,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Municipal Fund</TableCell>
                          <TableCell className="text-right">1,75,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Earmarked Funds</TableCell>
                          <TableCell className="text-right">75,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Secured Loans</TableCell>
                          <TableCell className="text-right">1,00,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Current Liabilities</TableCell>
                          <TableCell className="text-right">50,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Sundry Creditors</TableCell>
                          <TableCell className="text-right">30,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Deposits</TableCell>
                          <TableCell className="text-right">15,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Other Liabilities</TableCell>
                          <TableCell className="text-right">5,00,000</TableCell>
                        </TableRow>
                        <TableRow className="bg-muted/30">
                          <TableCell className="font-bold">Total Liabilities</TableCell>
                          <TableCell className="text-right font-bold">4,00,00,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Visual Representation */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Pie Chart showing asset distribution
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Income & Expenditure */}
        <TabsContent value="income-expenditure" className="space-y-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Income & Expenditure Statement (Rule aa)</CardTitle>
              <p className="text-sm text-muted-foreground">For the year ended 31st March, 2024</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Income Side */}
                <Card>
                  <CardHeader className="bg-green-50 dark:bg-green-950">
                    <CardTitle className="text-lg text-green-700 dark:text-green-300">Income</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Particulars</TableHead>
                          <TableHead className="text-right">Amount (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Tax Revenue</TableCell>
                          <TableCell className="text-right">75,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Property Tax</TableCell>
                          <TableCell className="text-right">45,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Water Tax</TableCell>
                          <TableCell className="text-right">20,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Other Taxes</TableCell>
                          <TableCell className="text-right">10,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Non-Tax Revenue</TableCell>
                          <TableCell className="text-right">35,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Rent from Properties</TableCell>
                          <TableCell className="text-right">15,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Fees & User Charges</TableCell>
                          <TableCell className="text-right">12,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Sale of Forms</TableCell>
                          <TableCell className="text-right">8,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Grants & Contributions</TableCell>
                          <TableCell className="text-right">50,00,000</TableCell>
                        </TableRow>
                        <TableRow className="bg-green-50 dark:bg-green-950">
                          <TableCell className="font-bold text-green-700 dark:text-green-300">Total Income</TableCell>
                          <TableCell className="text-right font-bold text-green-700 dark:text-green-300">
                            1,60,00,000
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Expenditure Side */}
                <Card>
                  <CardHeader className="bg-red-50 dark:bg-red-950">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">Expenditure</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Particulars</TableHead>
                          <TableHead className="text-right">Amount (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Establishment Expenses</TableCell>
                          <TableCell className="text-right">65,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Salaries & Allowances</TableCell>
                          <TableCell className="text-right">50,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Pension</TableCell>
                          <TableCell className="text-right">15,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Administrative Expenses</TableCell>
                          <TableCell className="text-right">25,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Rent, Rates & Taxes</TableCell>
                          <TableCell className="text-right">8,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Office Maintenance</TableCell>
                          <TableCell className="text-right">12,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-6">Communication Expenses</TableCell>
                          <TableCell className="text-right">5,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Operations & Maintenance</TableCell>
                          <TableCell className="text-right">40,00,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Interest & Finance Charges</TableCell>
                          <TableCell className="text-right">10,00,000</TableCell>
                        </TableRow>
                        <TableRow className="bg-red-50 dark:bg-red-950">
                          <TableCell className="font-bold text-red-700 dark:text-red-300">Total Expenditure</TableCell>
                          <TableCell className="text-right font-bold text-red-700 dark:text-red-300">
                            1,40,00,000
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Surplus/Deficit */}
              <div className="mt-4 p-4 border rounded-lg bg-muted/20">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">Surplus for the year</div>
                  <div className="font-bold text-lg text-green-600 dark:text-green-400">₹20,00,000</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Representation */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenditure Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Bar graph showing revenue vs expenditure trends
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Statement */}
        <TabsContent value="cash-flow" className="space-y-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Cash Flow Statement (Rule t)</CardTitle>
              <p className="text-sm text-muted-foreground">For the year ended 31st March, 2024</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Particulars</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-muted/20">
                    <TableCell className="font-bold">A. Cash Flow from Operating Activities</TableCell>
                    <TableCell className="text-right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Surplus for the year</TableCell>
                    <TableCell className="text-right">20,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Add: Depreciation</TableCell>
                    <TableCell className="text-right">15,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Add: Interest Expense</TableCell>
                    <TableCell className="text-right">10,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">(Increase)/Decrease in Receivables</TableCell>
                    <TableCell className="text-right">-5,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Increase/(Decrease) in Payables</TableCell>
                    <TableCell className="text-right">8,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">Net Cash from Operating Activities</TableCell>
                    <TableCell className="text-right font-medium">48,00,000</TableCell>
                  </TableRow>

                  <TableRow className="bg-muted/20">
                    <TableCell className="font-bold">B. Cash Flow from Investing Activities</TableCell>
                    <TableCell className="text-right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Purchase of Fixed Assets</TableCell>
                    <TableCell className="text-right">-35,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Sale of Fixed Assets</TableCell>
                    <TableCell className="text-right">5,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">Net Cash from Investing Activities</TableCell>
                    <TableCell className="text-right font-medium">-30,00,000</TableCell>
                  </TableRow>

                  <TableRow className="bg-muted/20">
                    <TableCell className="font-bold">C. Cash Flow from Financing Activities</TableCell>
                    <TableCell className="text-right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Proceeds from Loans</TableCell>
                    <TableCell className="text-right">20,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Repayment of Loans</TableCell>
                    <TableCell className="text-right">-15,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Interest Paid</TableCell>
                    <TableCell className="text-right">-10,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 font-medium">Net Cash from Financing Activities</TableCell>
                    <TableCell className="text-right font-medium">-5,00,000</TableCell>
                  </TableRow>

                  <TableRow className="bg-muted/30">
                    <TableCell className="font-bold">Net Increase/(Decrease) in Cash (A+B+C)</TableCell>
                    <TableCell className="text-right font-bold">13,00,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cash & Cash Equivalents at Beginning of Year</TableCell>
                    <TableCell className="text-right">72,00,000</TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/30">
                    <TableCell className="font-bold">Cash & Cash Equivalents at End of Year</TableCell>
                    <TableCell className="text-right font-bold">85,00,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Visual Representation */}
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Waterfall chart showing cash flow components
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

