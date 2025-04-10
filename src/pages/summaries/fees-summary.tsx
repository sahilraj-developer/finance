"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FeeSummary {
  feeType: "Notice Fee" | "Warrant Fee" | "Other Fee"
  month: string
  count: number
  amount: number
}

export default function FeesSummary() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })
  const [activeTab, setActiveTab] = useState<string>("all")

  // Sample data - in a real app, this would be fetched based on the selected date range
  const feeSummaries: FeeSummary[] = [
    // Notice Fees
    { feeType: "Notice Fee", month: "January", count: 120, amount: 6000 },
    { feeType: "Notice Fee", month: "February", count: 105, amount: 5250 },
    { feeType: "Notice Fee", month: "March", count: 130, amount: 6500 },
    { feeType: "Notice Fee", month: "April", count: 115, amount: 5750 },
    { feeType: "Notice Fee", month: "May", count: 125, amount: 6250 },
    { feeType: "Notice Fee", month: "June", count: 110, amount: 5500 },

    // Warrant Fees
    { feeType: "Warrant Fee", month: "January", count: 45, amount: 4500 },
    { feeType: "Warrant Fee", month: "February", count: 40, amount: 4000 },
    { feeType: "Warrant Fee", month: "March", count: 50, amount: 5000 },
    { feeType: "Warrant Fee", month: "April", count: 35, amount: 3500 },
    { feeType: "Warrant Fee", month: "May", count: 55, amount: 5500 },
    { feeType: "Warrant Fee", month: "June", count: 48, amount: 4800 },

    // Other Fees
    { feeType: "Other Fee", month: "January", count: 75, amount: 9375 },
    { feeType: "Other Fee", month: "February", count: 80, amount: 10000 },
    { feeType: "Other Fee", month: "March", count: 70, amount: 8750 },
    { feeType: "Other Fee", month: "April", count: 85, amount: 10625 },
    { feeType: "Other Fee", month: "May", count: 90, amount: 11250 },
    { feeType: "Other Fee", month: "June", count: 78, amount: 9750 },
  ]

  // Filter fees based on active tab
  const filteredFees =
    activeTab === "all"
      ? feeSummaries
      : feeSummaries.filter((fee) => {
          if (activeTab === "notice") return fee.feeType === "Notice Fee"
          if (activeTab === "warrant") return fee.feeType === "Warrant Fee"
          if (activeTab === "other") return fee.feeType === "Other Fee"
          return true
        })

  // Calculate totals
  const totalNoticeFees = feeSummaries
    .filter((fee) => fee.feeType === "Notice Fee")
    .reduce((sum, fee) => sum + fee.amount, 0)

  const totalWarrantFees = feeSummaries
    .filter((fee) => fee.feeType === "Warrant Fee")
    .reduce((sum, fee) => sum + fee.amount, 0)

  const totalOtherFees = feeSummaries
    .filter((fee) => fee.feeType === "Other Fee")
    .reduce((sum, fee) => sum + fee.amount, 0)

  const grandTotal = totalNoticeFees + totalWarrantFees + totalOtherFees

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
      const fees = feeSummaries.filter((fee) => fee.month === month)
      const total = fees.reduce((sum, fee) => sum + fee.amount, 0)
      const count = fees.reduce((sum, fee) => sum + fee.count, 0)
      return { month, total, count }
    })
    .filter((item) => item.count > 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Summary Statement of Notice Fee, Warrant Fee & Other Fees</CardTitle>
            <CardDescription>Summary of all fees collected during the selected period</CardDescription>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Notice Fees</div>
              <div className="text-2xl font-bold">
                {totalNoticeFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Warrant Fees</div>
              <div className="text-2xl font-bold">
                {totalWarrantFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Other Fees</div>
              <div className="text-2xl font-bold">
                {totalOtherFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Fees</div>
              <div className="text-2xl font-bold">
                {grandTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Fees</TabsTrigger>
            <TabsTrigger value="notice">Notice Fees</TabsTrigger>
            <TabsTrigger value="warrant">Warrant Fees</TabsTrigger>
            <TabsTrigger value="other">Other Fees</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Notice Fees</TableHead>
                  <TableHead className="text-right">Warrant Fees</TableHead>
                  <TableHead className="text-right">Other Fees</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyTotals.map((monthData) => {
                  const noticeAmount = feeSummaries
                    .filter((fee) => fee.month === monthData.month && fee.feeType === "Notice Fee")
                    .reduce((sum, fee) => sum + fee.amount, 0)

                  const warrantAmount = feeSummaries
                    .filter((fee) => fee.month === monthData.month && fee.feeType === "Warrant Fee")
                    .reduce((sum, fee) => sum + fee.amount, 0)

                  const otherAmount = feeSummaries
                    .filter((fee) => fee.month === monthData.month && fee.feeType === "Other Fee")
                    .reduce((sum, fee) => sum + fee.amount, 0)

                  return (
                    <TableRow key={monthData.month}>
                      <TableCell>{monthData.month}</TableCell>
                      <TableCell className="text-right">
                        {noticeAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {warrantAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {otherAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {monthData.total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {totalNoticeFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {totalWarrantFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {totalOtherFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
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
            <CardTitle className="text-lg">Fee Collection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFees.map((fee, index) => (
                    <TableRow key={`${fee.feeType}-${fee.month}-${index}`}>
                      <TableCell>{fee.feeType}</TableCell>
                      <TableCell>{fee.month}</TableCell>
                      <TableCell className="text-right">{fee.count}</TableCell>
                      <TableCell className="text-right">
                        {fee.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(fee.amount / fee.count).toLocaleString("en-US", { style: "currency", currency: "USD" })}
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
