"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"

interface DepositAdjustment {
  id: string
  adjustmentNumber: string
  date: string
  originalDepositNumber: string
  originalDepositDate: string
  originalAmount: number
  adjustedAmount: number
  adjustmentType: "Increase" | "Decrease"
  reason: string
  approvedBy: string
  bankReference: string
}

export default function DepositsAdjustedSummary() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })

  // Sample data - in a real app, this would be fetched based on the selected date range
  const adjustments: DepositAdjustment[] = [
    {
      id: "1",
      adjustmentNumber: "ADJ-2023-001",
      date: "2023-02-15",
      originalDepositNumber: "DEP-2023-025",
      originalDepositDate: "2023-02-10",
      originalAmount: 125000,
      adjustedAmount: 127500,
      adjustmentType: "Increase",
      reason: "Additional check discovered after deposit was recorded",
      approvedBy: "Finance Director",
      bankReference: "ADJ-REF-001",
    },
    {
      id: "2",
      adjustmentNumber: "ADJ-2023-002",
      date: "2023-03-05",
      originalDepositNumber: "DEP-2023-042",
      originalDepositDate: "2023-03-01",
      originalAmount: 85000,
      adjustedAmount: 83500,
      adjustmentType: "Decrease",
      reason: "Check returned for insufficient funds",
      approvedBy: "Finance Director",
      bankReference: "ADJ-REF-002",
    },
    {
      id: "3",
      adjustmentNumber: "ADJ-2023-003",
      date: "2023-04-12",
      originalDepositNumber: "DEP-2023-078",
      originalDepositDate: "2023-04-05",
      originalAmount: 210000,
      adjustedAmount: 212500,
      adjustmentType: "Increase",
      reason: "Bank correction - deposit was initially under-credited",
      approvedBy: "Treasury Manager",
      bankReference: "ADJ-REF-003",
    },
    {
      id: "4",
      adjustmentNumber: "ADJ-2023-004",
      date: "2023-05-20",
      originalDepositNumber: "DEP-2023-105",
      originalDepositDate: "2023-05-15",
      originalAmount: 175000,
      adjustedAmount: 172500,
      adjustmentType: "Decrease",
      reason: "Correction of duplicate payment entry",
      approvedBy: "Finance Director",
      bankReference: "ADJ-REF-004",
    },
    {
      id: "5",
      adjustmentNumber: "ADJ-2023-005",
      date: "2023-06-08",
      originalDepositNumber: "DEP-2023-132",
      originalDepositDate: "2023-06-01",
      originalAmount: 95000,
      adjustedAmount: 95000,
      adjustmentType: "Increase",
      reason: "Reclassification of deposit - no amount change",
      approvedBy: "Treasury Manager",
      bankReference: "ADJ-REF-005",
    },
  ]

  // Calculate summary statistics
  const totalAdjustments = adjustments.length
  const totalIncreases = adjustments.filter((adj) => adj.adjustmentType === "Increase").length
  const totalDecreases = adjustments.filter((adj) => adj.adjustmentType === "Decrease").length

  const netAdjustmentAmount = adjustments.reduce((sum, adj) => {
    const difference = adj.adjustedAmount - adj.originalAmount
    return sum + difference
  }, 0)

  const totalOriginalAmount = adjustments.reduce((sum, adj) => sum + adj.originalAmount, 0)
  const totalAdjustedAmount = adjustments.reduce((sum, adj) => sum + adj.adjustedAmount, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Summary Statement of Deposits Adjusted</CardTitle>
            <CardDescription>Summary of all deposit adjustments made during the selected period</CardDescription>
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
              <div className="text-sm font-medium text-muted-foreground">Total Adjustments</div>
              <div className="text-2xl font-bold">{totalAdjustments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Net Adjustment</div>
              <div className={`text-2xl font-bold ${netAdjustmentAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                {netAdjustmentAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Increases</div>
              <div className="text-2xl font-bold text-green-600">{totalIncreases}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Decreases</div>
              <div className="text-2xl font-bold text-red-600">{totalDecreases}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Adjustment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total Original Deposit Amount</TableCell>
                  <TableCell className="text-right">
                    {totalOriginalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Adjusted Deposit Amount</TableCell>
                  <TableCell className="text-right">
                    {totalAdjustedAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Net Adjustment</TableCell>
                  <TableCell
                    className={`text-right font-bold ${netAdjustmentAmount >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {netAdjustmentAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deposit Adjustment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adjustment No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Original Deposit</TableHead>
                    <TableHead className="text-right">Original Amount</TableHead>
                    <TableHead className="text-right">Adjusted Amount</TableHead>
                    <TableHead className="text-right">Difference</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Approved By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adjustments.map((adjustment) => {
                    const difference = adjustment.adjustedAmount - adjustment.originalAmount
                    return (
                      <TableRow key={adjustment.id}>
                        <TableCell>{adjustment.adjustmentNumber}</TableCell>
                        <TableCell>{adjustment.date}</TableCell>
                        <TableCell>
                          {adjustment.originalDepositNumber}
                          <div className="text-xs text-muted-foreground">{adjustment.originalDepositDate}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          {adjustment.originalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </TableCell>
                        <TableCell className="text-right">
                          {adjustment.adjustedAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </TableCell>
                        <TableCell className={`text-right ${difference >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {difference.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={adjustment.adjustmentType === "Increase" ? "default" : "destructive"}>
                            {adjustment.adjustmentType}
                          </Badge>
                        </TableCell>
                        <TableCell>{adjustment.reason}</TableCell>
                        <TableCell>{adjustment.approvedBy}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
