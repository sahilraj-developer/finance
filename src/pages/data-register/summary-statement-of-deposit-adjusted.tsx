"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Printer } from "lucide-react"

interface DepositSummary {
  id: string
  accountHead: string
  openingBalance: number
  receipts: number
  totalDeposit: number
  adjustments: number
  closingBalance: number
}

export default function SummaryStatementOfDepositAdjusted() {
  const [period, setPeriod] = useState("current-month")
  const [summaries, setSummaries] = useState<DepositSummary[]>([
    {
      id: "1",
      accountHead: "Security Deposits",
      openingBalance: 1250000,
      receipts: 350000,
      totalDeposit: 1600000,
      adjustments: 200000,
      closingBalance: 1400000,
    },
    {
      id: "2",
      accountHead: "Earnest Money Deposits",
      openingBalance: 750000,
      receipts: 125000,
      totalDeposit: 875000,
      adjustments: 75000,
      closingBalance: 800000,
    },
    {
      id: "3",
      accountHead: "Caution Money",
      openingBalance: 500000,
      receipts: 50000,
      totalDeposit: 550000,
      adjustments: 25000,
      closingBalance: 525000,
    },
    {
      id: "4",
      accountHead: "Tender Fee Deposits",
      openingBalance: 300000,
      receipts: 75000,
      totalDeposit: 375000,
      adjustments: 50000,
      closingBalance: 325000,
    },
  ])

  const totals = summaries.reduce(
    (acc, curr) => {
      return {
        openingBalance: acc.openingBalance + curr.openingBalance,
        receipts: acc.receipts + curr.receipts,
        totalDeposit: acc.totalDeposit + curr.totalDeposit,
        adjustments: acc.adjustments + curr.adjustments,
        closingBalance: acc.closingBalance + curr.closingBalance,
      }
    },
    {
      openingBalance: 0,
      receipts: 0,
      totalDeposit: 0,
      adjustments: 0,
      closingBalance: 0,
    },
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary Statement of Deposit Adjusted</CardTitle>
        <CardDescription>Summary of deposits and adjustments for the selected period</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Period:</span>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="previous-month">Previous Month</SelectItem>
                <SelectItem value="current-quarter">Current Quarter</SelectItem>
                <SelectItem value="current-year">Current Financial Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Account Head</TableHead>
                <TableHead className="text-right">Opening Balance (₹)</TableHead>
                <TableHead className="text-right">Receipts (₹)</TableHead>
                <TableHead className="text-right">Total Deposit (₹)</TableHead>
                <TableHead className="text-right">Adjustments (₹)</TableHead>
                <TableHead className="text-right">Closing Balance (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaries.map((summary) => (
                <TableRow key={summary.id}>
                  <TableCell className="font-medium">{summary.accountHead}</TableCell>
                  <TableCell className="text-right">{summary.openingBalance.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right">{summary.receipts.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right">{summary.totalDeposit.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right">{summary.adjustments.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right">{summary.closingBalance.toLocaleString("en-IN")}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{totals.openingBalance.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right font-bold">{totals.receipts.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right font-bold">{totals.totalDeposit.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right font-bold">{totals.adjustments.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right font-bold">{totals.closingBalance.toLocaleString("en-IN")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            Note: This statement summarizes all deposits and adjustments for the selected period. The closing balance is
            carried forward to the next period as opening balance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
