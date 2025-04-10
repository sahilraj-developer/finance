"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RefundRemissionSummary {
  type: "Refund" | "Remission"
  month: string
  category: string
  count: number
  amount: number
}

export default function RefundsRemissionsSummary() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })
  const [activeTab, setActiveTab] = useState<string>("all")

  // Sample data - in a real app, this would be fetched based on the selected date range
  const summaries: RefundRemissionSummary[] = [
    // Refunds
    { type: "Refund", month: "January", category: "Property Tax", count: 12, amount: 6000 },
    { type: "Refund", month: "January", category: "Water Charges", count: 8, amount: 2400 },
    { type: "Refund", month: "February", category: "Property Tax", count: 10, amount: 5000 },
    { type: "Refund", month: "February", category: "Building Permit", count: 5, amount: 7500 },
    { type: "Refund", month: "March", category: "Property Tax", count: 15, amount: 7500 },
    { type: "Refund", month: "March", category: "Water Charges", count: 10, amount: 3000 },

    // Remissions
    { type: "Remission", month: "January", category: "Property Tax", count: 5, amount: 2500 },
    { type: "Remission", month: "January", category: "Business License", count: 3, amount: 1800 },
    { type: "Remission", month: "February", category: "Property Tax", count: 7, amount: 3500 },
    { type: "Remission", month: "February", category: "Water Charges", count: 4, amount: 1200 },
    { type: "Remission", month: "March", category: "Property Tax", count: 6, amount: 3000 },
    { type: "Remission", month: "March", category: "Business License", count: 2, amount: 1200 },
  ]

  // Filter summaries based on active tab
  const filteredSummaries =
    activeTab === "all"
      ? summaries
      : summaries.filter((summary) => {
          if (activeTab === "refunds") return summary.type === "Refund"
          if (activeTab === "remissions") return summary.type === "Remission"
          return true
        })

  // Calculate totals
  const totalRefunds = summaries
    .filter((summary) => summary.type === "Refund")
    .reduce((sum, summary) => sum + summary.amount, 0)

  const totalRemissions = summaries
    .filter((summary) => summary.type === "Remission")
    .reduce((sum, summary) => sum + summary.amount, 0)

  const grandTotal = totalRefunds + totalRemissions

  // Calculate monthly totals
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const monthlyTotals = months
    .map((month) => {
      const refunds = summaries.filter((summary) => summary.month === month && summary.type === "Refund")
      const remissions = summaries.filter((summary) => summary.month === month && summary.type === "Remission")

      const refundTotal = refunds.reduce((sum, summary) => sum + summary.amount, 0)
      const remissionTotal = remissions.reduce((sum, summary) => sum + summary.amount, 0)
      const total = refundTotal + remissionTotal

      return { month, refundTotal, remissionTotal, total }
    })
    .filter((item) => item.total > 0)

  // Calculate category totals
  const categories = Array.from(new Set(summaries.map((summary) => summary.category)))
  const categoryTotals = categories.map((category) => {
    const refunds = summaries.filter((summary) => summary.category === category && summary.type === "Refund")
    const remissions = summaries.filter((summary) => summary.category === category && summary.type === "Remission")

    const refundTotal = refunds.reduce((sum, summary) => sum + summary.amount, 0)
    const remissionTotal = remissions.reduce((sum, summary) => sum + summary.amount, 0)
    const total = refundTotal + remissionTotal

    return { category, refundTotal, remissionTotal, total }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Summary Statement of Refunds and Remissions</CardTitle>
            <CardDescription>
              Summary of all refunds and remissions processed during the selected period
            </CardDescription>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <DateRangePicker value={dateRange} onValueChange={setDateRange} />
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Refunds</div>
              <div className="text-2xl font-bold">
                {totalRefunds.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Remissions</div>
              <div className="text-2xl font-bold">
                {totalRemissions.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Grand Total</div>
              <div className="text-2xl font-bold">
                {grandTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
            <TabsTrigger value="remissions">Remissions</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Refunds</TableHead>
                  <TableHead className="text-right">Remissions</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyTotals.map((monthData) => (
                  <TableRow key={monthData.month}>
                    <TableCell>{monthData.month}</TableCell>
                    <TableCell className="text-right">
                      {monthData.refundTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                    <TableCell className="text-right">
                      {monthData.remissionTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {monthData.total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {totalRefunds.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {totalRemissions.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {grandTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Category Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Refunds</TableHead>
                  <TableHead className="text-right">Remissions</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryTotals.map((categoryData) => (
                  <TableRow key={categoryData.category}>
                    <TableCell>{categoryData.category}</TableCell>
                    <TableCell className="text-right">
                      {categoryData.refundTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                    <TableCell className="text-right">
                      {categoryData.remissionTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {categoryData.total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {totalRefunds.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {totalRemissions.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {grandTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSummaries.map((summary, index) => (
                    <TableRow key={`${summary.type}-${summary.month}-${summary.category}-${index}`}>
                      <TableCell>{summary.type}</TableCell>
                      <TableCell>{summary.month}</TableCell>
                      <TableCell>{summary.category}</TableCell>
                      <TableCell className="text-right">{summary.count}</TableCell>
                      <TableCell className="text-right">
                        {summary.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(summary.amount / summary.count).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
